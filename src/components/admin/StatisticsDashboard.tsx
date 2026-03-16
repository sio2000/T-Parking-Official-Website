import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { extractCityFromAddress } from '../../lib/extractCity';
import { getCityFromCoords } from '../../lib/geocode';

const getSupabaseClient = () => supabaseAdmin || supabase;

interface Statistics {
  totalSpots: number;
  activeSpots: number;
  inactiveSpots: number;
  totalUsers: number;
  totalReservations: number;
  deletedAccounts: number;
  totalUnparks: number;
  usersWithUnparks: number;
  spotsByCity: Record<string, number>;
  topScores: { email: string; score: number }[];
  reservedSpotsCount: number;
  totalReservationStock: number;
}

export default function StatisticsDashboard() {
  const [stats, setStats] = useState<Statistics>({
    totalSpots: 0,
    activeSpots: 0,
    inactiveSpots: 0,
    totalUsers: 0,
    totalReservations: 0,
    deletedAccounts: 0,
    totalUnparks: 0,
    usersWithUnparks: 0,
    spotsByCity: {},
    topScores: [],
    reservedSpotsCount: 0,
    totalReservationStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      setError(null);
      const client = getSupabaseClient();

      // Parallel fetches
      const [
        totalSpotsRes,
        allSpotsRes,
        profilesRes,
        userReservationStockRes,
        reservedSpotsRes,
        userUnparkCountsRes,
        unparkReservationRes,
        userScoresRes,
        parkingSpotsForCityRes,
        parkingHistoryForCityRes,
      ] = await Promise.all([
        client.from('parking_spots').select('*', { count: 'exact', head: true }),
        client.from('parking_spots').select('id, user_id'),
        client.from('profiles').select('*', { count: 'exact', head: true }),
        client.from('user_reservation_stock').select('stock'),
        client.from('reserved_spots').select('*', { count: 'exact', head: true }),
        client.from('user_unpark_counts').select('profile_id, unpark_count'),
        client.from('unparkreservation').select('user_id, unpark_count, free_reservations'),
        client.from('user_scores').select('user_id, score').order('score', { ascending: false }).limit(10),
      client.from('parking_spots').select('address, latitude, longitude'),
      client.from('parking_history').select('address, latitude, longitude'),
      ]);

      // Deleted accounts (table may not exist yet)
      let deletedAccounts = 0;
      try {
        const { count } = await client.from('deleted_accounts_log').select('*', { count: 'exact', head: true });
        deletedAccounts = count ?? 0;
      } catch {
        /* table may not exist */
      }

      // Ενεργές = θέσεις τελευταίων 6 λεπτών (όπως στον χάρτη - μετά από 6 λεπτά λήγουν)
      const sixMinutesAgo = new Date(Date.now() - 6 * 60 * 1000).toISOString();
      const { count: activeSpotsCount } = await client
        .from('parking_spots')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sixMinutesAgo);
      const activeCount = activeSpotsCount ?? 0;
      const inactiveCount = (totalSpotsRes.count ?? 0) - activeCount + (parkingHistoryForCityRes.data?.length ?? 0);

      // Unpark = Spots (ίδιο νούμερο) - συνολικό πλήθος parking_spots
      const totalUnparks = totalSpotsRes.count ?? 0;
      const usersWithUnparks = new Set((allSpotsRes.data || []).map((s: { user_id?: string }) => s.user_id).filter(Boolean)).size;

      // City breakdown - address πρώτα, αν Άγνωστο τότε reverse geocode από lat/lng
      const cityCounts: Record<string, number> = {};
      const isPostalCode = (s: string) => /^\d{3}\s?\d{2}$/.test(s.replace(/\s/g, '')) || /^\d{5}$/.test(s.replace(/\s/g, ''));
      const addToCity = (city: string) => {
        if (city && city !== 'Άγνωστο' && !isPostalCode(city)) {
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        } else if (city === 'Άγνωστο') {
          cityCounts['Άγνωστο'] = (cityCounts['Άγνωστο'] || 0) + 1;
        }
      };
      const allForCity = [...(parkingSpotsForCityRes.data || []), ...(parkingHistoryForCityRes.data || [])];
      const needGeocode: { lat: number; lng: number }[] = [];
      allForCity.forEach((r: { address?: string; latitude?: number; longitude?: number }) => {
        const city = extractCityFromAddress(r.address);
        if (city === 'Άγνωστο' && r.latitude != null && r.longitude != null) {
          needGeocode.push({ lat: r.latitude, lng: r.longitude });
        } else {
          addToCity(city);
        }
      });
      const coordCounts = new Map<string, { lat: number; lng: number; count: number }>();
      needGeocode.forEach((c) => {
        const key = `${c.lat.toFixed(4)},${c.lng.toFixed(4)}`;
        const cur = coordCounts.get(key);
        if (cur) cur.count++; else coordCounts.set(key, { ...c, count: 1 });
      });
      const uniqueCoords = Array.from(coordCounts.values()).slice(0, 50);
      await Promise.all(uniqueCoords.map(async (c) => {
        const city = await getCityFromCoords(c.lat, c.lng);
        for (let i = 0; i < c.count; i++) addToCity(city);
      }));

      // Top scores με full_name ή email
      const scores = userScoresRes.data || [];
      const profileIds = [...new Set(scores.map((s: { user_id: string }) => s.user_id))];
      const { data: profilesForScores } = await client
        .from('profiles')
        .select('id, email, full_name')
        .in('id', profileIds.length ? profileIds : ['00000000-0000-0000-0000-000000000000']);
      const displayMap = new Map((profilesForScores || []).map((p: { id: string; email?: string; full_name?: string }) => [
        p.id,
        (p.full_name && String(p.full_name).trim()) || p.email || `Χρήστης ${p.id.substring(0, 8)}`,
      ]));
      const topScores = scores.map((s: { user_id: string; score: number }) => ({
        email: displayMap.get(s.user_id) || `Χρήστης ${s.user_id.substring(0, 8)}`,
        score: s.score,
      }));

      // Reservation stock
      const stockRows = userReservationStockRes.data || [];
      const totalReservationStock = stockRows.reduce((s: number, r: { stock?: number }) => s + (r.stock || 0), 0);

      setStats({
        totalSpots: totalSpotsRes.count ?? 0,
        activeSpots: activeCount,
        inactiveSpots: inactiveCount,
        totalUsers: profilesRes.count ?? 0,
        totalReservations: userReservationStockRes.data?.length ?? 0,
        deletedAccounts,
        totalUnparks,
        usersWithUnparks,
        spotsByCity: cityCounts,
        topScores,
        reservedSpotsCount: reservedSpotsRes.count ?? 0,
        totalReservationStock,
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Άγνωστο σφάλμα';
      setError(msg);
      console.error('[StatisticsDashboard] Error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && Object.values(stats).every((v) => (typeof v === 'number' ? v === 0 : !Array.isArray(v) || v.length === 0))) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Φόρτωση στατιστικών...</div>
      </div>
    );
  }

  const statCards = [
    { title: 'Συνολικές Θέσεις', value: stats.totalSpots, icon: '🅿️', bg: 'bg-blue-50', text: 'text-blue-600' },
    { title: 'Ενεργές Θέσεις', value: stats.activeSpots, icon: '✅', bg: 'bg-green-50', text: 'text-green-600', desc: 'Τελευταία 6 λεπτά (στον χάρτη)' },
    { title: 'Μη Ενεργές', value: stats.inactiveSpots, icon: '❌', bg: 'bg-red-50', text: 'text-red-600' },
    { title: 'Συνολικοί Χρήστες', value: stats.totalUsers, icon: '👥', bg: 'bg-purple-50', text: 'text-purple-600' },
    { title: 'Διαγραμμένοι Λογαριασμοί', value: stats.deletedAccounts, icon: '🗑️', bg: 'bg-gray-100', text: 'text-gray-700' },
    { title: 'Ξεπαράραν (Unpark)', value: stats.totalUnparks, icon: '🚗', bg: 'bg-amber-50', text: 'text-amber-700' },
    { title: 'Χρήστες με Unpark', value: stats.usersWithUnparks, icon: '👤', bg: 'bg-cyan-50', text: 'text-cyan-600' },
    { title: 'Κρατήσεις Stock', value: stats.totalReservationStock, icon: '📦', bg: 'bg-orange-50', text: 'text-orange-600' },
    { title: 'Ενεργές Reserved', value: stats.reservedSpotsCount, icon: '📅', bg: 'bg-indigo-50', text: 'text-indigo-600' },
  ];

  const isPostalCodeKey = (k: string) => /^\d{3}\s?\d{2}$/.test(k.replace(/\s/g, '')) || /^\d{5}$/.test(k.replace(/\s/g, ''));
  const cityEntries = Object.entries(stats.spotsByCity)
    .filter(([k]) => !isPostalCodeKey(k))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  return (
    <div>
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Πλήρες Dashboard</h2>
          <p className="text-gray-600 mt-1">Όλα τα στατιστικά με αληθινά δεδομένα</p>
        </div>
        <button
          onClick={loadStatistics}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Φόρτωση...
            </>
          ) : (
            'Ανανέωση'
          )}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className={`${card.bg} rounded-xl p-5 shadow-sm border border-gray-200`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-3xl ${card.text}`}>{card.icon}</span>
            </div>
            <div className={`text-2xl font-bold ${card.text}`}>{Number(card.value).toLocaleString('el-GR')}</div>
            <div className="text-gray-700 font-medium text-sm">{card.title}</div>
            {card.desc && <div className="text-xs text-gray-500 mt-1">{card.desc}</div>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Θέσεις ανά Πόλη/Περιοχή</h3>
          {cityEntries.length === 0 ? (
            <p className="text-gray-500">Δεν υπάρχουν δεδομένα</p>
          ) : (
            <div className="space-y-2">
              {cityEntries.map(([city, count]) => (
                <div key={city} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="font-medium text-gray-800">{city}</span>
                  <span className="text-blue-600 font-bold">{count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Score</h3>
          {stats.topScores.length === 0 ? (
            <p className="text-gray-500">Δεν υπάρχουν δεδομένα</p>
          ) : (
            <div className="space-y-2">
              {stats.topScores.map((u, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-sm text-gray-700 truncate max-w-[200px]" title={u.email}>
                    {u.email}
                  </span>
                  <span className="font-bold text-amber-600">{u.score}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
