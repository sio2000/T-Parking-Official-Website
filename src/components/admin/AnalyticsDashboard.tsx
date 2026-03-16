import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format, subDays, startOfDay } from 'date-fns';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { extractCityFromAddress } from '../../lib/extractCity';
import { getCityFromCoords } from '../../lib/geocode';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface AnalyticsData {
  spotsCreated: any[];
  activeVsInactive: any[];
  spotsBySize: any[];
  userGrowth: any[];
  topUsers: any[];
  spotsByHour: any[];
  spotsByCity: any[];
  unparkByUser: any[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState<string>('week');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    spotsCreated: [],
    activeVsInactive: [],
    spotsBySize: [],
    userGrowth: [],
    topUsers: [],
    spotsByHour: [],
    spotsByCity: [],
    unparkByUser: [],
  });
  const [metrics, setMetrics] = useState({
    totalSpotsCreated: 0,
    activeSpotsNow: 0,
    newUsers: 0,
    reservationsMade: 0,
    averageScore: 0,
    mostActiveUser: '',
  });
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [timePeriod]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadAnalytics();
      }, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, timePeriod]);

  const getDateRange = () => {
    const now = new Date();
    switch (timePeriod) {
      case 'today':
        return { start: startOfDay(now), end: now };
      case 'week':
        return { start: subDays(now, 7), end: now };
      case 'month':
        return { start: subDays(now, 30), end: now };
      case '3months':
        return { start: subDays(now, 90), end: now };
      case 'year':
        return { start: subDays(now, 365), end: now };
      default:
        return { start: subDays(now, 7), end: now };
    }
  };

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      console.log('[AnalyticsDashboard] Loading analytics for period:', timePeriod);
      
      const client = getSupabaseClient();
      const { start, end } = getDateRange();
      
      // Fetch spots created over time from parking_spots (active spots)
      const { data: spots, error: spotsError } = await client
        .from('parking_spots')
        .select('created_at, is_active, size')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      if (spotsError) {
        console.warn('[AnalyticsDashboard] Error fetching parking_spots:', spotsError);
      }
      
      // Fetch parking_history (no size column in schema)
      const { data: historySpots, error: historyError } = await client
        .from('parking_history')
        .select('created_at')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      if (historyError) {
        console.warn('[AnalyticsDashboard] Error fetching parking_history (non-fatal):', historyError);
      }
      
      const normalizedHistorySpots = (historySpots || []).map((h: any) => ({
        created_at: h.created_at,
        is_active: false,
        size: 'unknown'
      }));
      
      // Combine all spots (active + deleted)
      const allSpotsCombined = [
        ...(spots || []),
        ...normalizedHistorySpots
      ];
      
      console.log('[AnalyticsDashboard] Combined spots:', {
        fromParkingSpots: (spots || []).length,
        fromHistory: (historySpots || []).length,
        total: allSpotsCombined.length
      });
      
      // Use combined spots for all calculations
      const spotsForAnalytics = allSpotsCombined;
      
      // Process spots created over time (using combined spots)
      const spotsByDate: Record<string, number> = {};
      spotsForAnalytics.forEach((spot: any) => {
        const date = format(new Date(spot.created_at), 'yyyy-MM-dd');
        spotsByDate[date] = (spotsByDate[date] || 0) + 1;
      });
      const spotsCreated = Object.entries(spotsByDate).map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM'),
        count,
      }));
      
      // Ενεργές = τελευταία 6 λεπτά (όπως στον χάρτη)
      const sixMinutesAgo = new Date(Date.now() - 6 * 60 * 1000).toISOString();
      const { count: activeSpotsCount } = await client
        .from('parking_spots')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sixMinutesAgo);
      const activeCount = activeSpotsCount ?? 0;
      const { count: totalSpotsCount } = await client.from('parking_spots').select('*', { count: 'exact', head: true });
      const inactiveCount = (totalSpotsCount ?? 0) - activeCount + (historySpots || []).length;
      
      const activeVsInactive = [
        { name: 'Ενεργές', value: activeCount },
        { name: 'Ανενεργές', value: inactiveCount },
      ];
      
      // Spots by size - ΜΟΝΟ από parking_spots (όχι unknown από history)
      const sizeCounts: Record<string, number> = {};
      (spots || []).forEach((spot: any) => {
        const size = spot.size || 'medium';
        if (size && size !== 'unknown') {
          sizeCounts[size] = (sizeCounts[size] || 0) + 1;
        }
      });
      const spotsBySize = Object.entries(sizeCounts).map(([name, value]) => ({
        name: name === 'small' ? 'Μικρή' : name === 'medium' ? 'Μεσαία' : name === 'large' ? 'Μεγάλη' : name,
        value,
      }));
      
      // User growth
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('created_at')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      const usersByDate: Record<string, number> = {};
      let cumulative = 0;
      (profiles || []).forEach((profile: any) => {
        const date = format(new Date(profile.created_at), 'yyyy-MM-dd');
        cumulative++;
        usersByDate[date] = cumulative;
      });
      const userGrowth = Object.entries(usersByDate).map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM'),
        count,
      }));
      
      // Top users by score (with emails)
      const { data: scores } = await client
        .from('user_scores')
        .select('user_id, score')
        .order('score', { ascending: false })
        .limit(10);
      
      const scoreUserIds = (scores || []).map((s: any) => s.user_id).filter(Boolean);
      const { data: scoreProfiles } = await client
        .from('profiles')
        .select('id, email, full_name')
        .in('id', scoreUserIds.length ? scoreUserIds : ['00000000-0000-0000-0000-000000000000']);
      const profileMap = new Map((scoreProfiles || []).map((p: any) => [
        p.id,
        (p.full_name && String(p.full_name).trim()) || p.email || `Χρήστης ${p.id.substring(0, 8)}`,
      ]));
      const topUsers = (scores || []).map((score: any) => ({
        name: profileMap.get(score.user_id) || `Χρήστης ${score.user_id.substring(0, 8)}`,
        score: score.score || 0,
      }));

      // Spots by city - address πρώτα, αν Άγνωστο τότε reverse geocode από lat/lng
      const { data: spotsForCity } = await client.from('parking_spots').select('address, latitude, longitude');
      const { data: historyForCity } = await client.from('parking_history').select('address, latitude, longitude');
      const cityCounts: Record<string, number> = {};
      const isPostalCode = (s: string) => /^\d{3}\s?\d{2}$/.test(s.replace(/\s/g, '')) || /^\d{5}$/.test(s.replace(/\s/g, ''));
      const addToCity = (city: string) => {
        if (city && city !== 'Άγνωστο' && !isPostalCode(city)) {
          cityCounts[city] = (cityCounts[city] || 0) + 1;
        }
      };
      const allForCity = [...(spotsForCity || []), ...(historyForCity || [])];
      const needGeocode: { lat: number; lng: number }[] = [];
      allForCity.forEach((r: any) => {
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
      const spotsByCity = Object.entries(cityCounts)
        .filter(([k]) => !isPostalCode(k))
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([name, value]) => ({ name, value }));

      // Unpark by user (top 10) - use max of both tables to avoid double count
      const { data: unparkData } = await client.from('user_unpark_counts').select('profile_id, unpark_count');
      const { data: unparkResData } = await client.from('unparkreservation').select('user_id, unpark_count');
      const unparkByUserId: Record<string, number> = {};
      (unparkData || []).forEach((r: any) => {
        const id = r.profile_id;
        unparkByUserId[id] = Math.max(unparkByUserId[id] || 0, r.unpark_count || 0);
      });
      (unparkResData || []).forEach((r: any) => {
        const id = r.user_id;
        unparkByUserId[id] = Math.max(unparkByUserId[id] || 0, r.unpark_count || 0);
      });
      const unparkUserIds = Object.keys(unparkByUserId);
      const { data: unparkProfiles } = await client
        .from('profiles')
        .select('id, email, full_name')
        .in('id', unparkUserIds.length ? unparkUserIds : ['00000000-0000-0000-0000-000000000000']);
      const unparkProfileMap = new Map((unparkProfiles || []).map((p: any) => [
        p.id,
        (p.full_name && String(p.full_name).trim()) || p.email || `Χρήστης ${p.id.substring(0, 8)}`,
      ]));
      const unparkByUser = Object.entries(unparkByUserId)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([userId, count]) => ({ name: unparkProfileMap.get(userId) || `Χρήστης ${userId.substring(0, 8)}`, count }));
      
      // Spots by hour (using combined spots)
      const hourCounts: Record<number, number> = {};
      spotsForAnalytics.forEach((spot: any) => {
        const hour = new Date(spot.created_at).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });
      const spotsByHour = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        count: hourCounts[i] || 0,
      }));
      
      setAnalyticsData({
        spotsCreated,
        activeVsInactive,
        spotsBySize,
        userGrowth,
        topUsers,
        spotsByHour,
        spotsByCity,
        unparkByUser,
      });
      
      // Calculate metrics (using combined spots - already loaded above)
      // Note: allSpotsCombined is already filtered by date range, so we use it directly
      
      const { data: allUsers } = await client
        .from('profiles')
        .select('created_at')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      const { data: allScores } = await client
        .from('user_scores')
        .select('score');

      const { count: reservedCount } = await client
        .from('reserved_spots')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      setMetrics({
        totalSpotsCreated: spotsForAnalytics.length,
        activeSpotsNow: activeCount,
        newUsers: (allUsers || []).length,
        reservationsMade: reservedCount ?? 0,
        averageScore: (allScores || []).length > 0
          ? Math.round((allScores || []).reduce((sum: number, s: any) => sum + (s.score || 0), 0) / (allScores || []).length)
          : 0,
        mostActiveUser: topUsers.length > 0 ? topUsers[0].name : '-',
      });
      
      console.log('[AnalyticsDashboard] Analytics loaded successfully');
    } catch (error: any) {
      console.error('[AnalyticsDashboard] Error loading analytics:', error);
      alert(`Σφάλμα κατά τη φόρτωση των αναλυτικών:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    const csv = `Metric,Value
Total Spots Created,${metrics.totalSpotsCreated}
Active Spots Now,${metrics.activeSpotsNow}
New Users,${metrics.newUsers}
Average Score,${metrics.averageScore}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Αναλυτικά & Reports</h2>
          <p className="text-gray-600">Στατιστικά και αναλύσεις για την εφαρμογή</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Auto-refresh (30s)</span>
          </label>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Φόρτωση...' : 'Ανανέωση'}
          </button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Χρονική Περίοδος</label>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="today">Σήμερα</option>
          <option value="week">Εβδομάδα</option>
          <option value="month">Μήνας</option>
          <option value="3months">3 Μήνες</option>
          <option value="year">Έτος</option>
        </select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Spots Δημιουργημένα</div>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalSpotsCreated}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Ενεργές Θέσεις (τώρα)</div>
          <div className="text-2xl font-bold text-blue-600">{metrics.activeSpotsNow}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Νέοι Χρήστες</div>
          <div className="text-2xl font-bold text-green-600">{metrics.newUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Κρατήσεις</div>
          <div className="text-2xl font-bold text-purple-600">{metrics.reservationsMade}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Μέσος Score</div>
          <div className="text-2xl font-bold text-yellow-600">{metrics.averageScore}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Πιο Ενεργός</div>
          <div className="text-lg font-bold text-indigo-600">{metrics.mostActiveUser}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Spots Created Over Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots Δημιουργημένα ανά Ημερομηνία</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.spotsCreated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Spots" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Active vs Inactive */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ενεργές vs Ανενεργές Spots</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.activeVsInactive}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => {
                    const name = props.name || '';
                    const percent = props.percent || 0;
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.activeVsInactive.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spots by Size */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots ανά Μέγεθος</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.spotsBySize}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10b981" name="Πλήθος" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Αύξηση Χρηστών</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" name="Χρήστες" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Users by Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Χρήστες ανά Score</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topUsers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#f59e0b" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spots by Hour */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots ανά Ώρα Ημέρας</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.spotsByHour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" name="Spots" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spots by City */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots ανά Πόλη</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.spotsByCity} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="value" fill="#06b6d4" name="Πλήθος" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Unpark by User */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Unpark ανά Χρήστη</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.unparkByUser} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={100} />
                <Tooltip />
                <Bar dataKey="count" fill="#f59e0b" name="Unpark" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

