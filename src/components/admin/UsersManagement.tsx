import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format } from 'date-fns';
import { extractCityFromAddress } from '../../lib/extractCity';

const getSupabaseClient = () => supabaseAdmin || supabase;

interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  subscription_status?: string;
  created_at?: string;
  updated_at?: string;
  score?: number;
  totalSpots?: number;
  totalReservations?: number;
  unparkCount?: number;
  reservationStock?: number;
  primaryCity?: string;
}

type EditMode = 'score' | 'profile' | 'stock' | null;

export default function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [filterSubscription, setFilterSubscription] = useState<string>('Όλα');
  const [filterCity, setFilterCity] = useState<string>('Όλες');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [editScore, setEditScore] = useState<number>(0);
  const [editFullName, setEditFullName] = useState('');
  const [editSubscription, setEditSubscription] = useState('');
  const [editStock, setEditStock] = useState(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();

      const [profilesRes, scoresRes, spotsRes, unparkCountsRes, unparkResRes, stockRes] = await Promise.all([
        client.from('profiles').select('*').order('created_at', { ascending: false }),
        client.from('user_scores').select('*'),
        client.from('parking_spots').select('user_id, address'),
        client.from('user_unpark_counts').select('profile_id, unpark_count'),
        client.from('unparkreservation').select('user_id, unpark_count'),
        client.from('user_reservation_stock').select('user_id, stock'),
      ]);

      const profiles = profilesRes.data || [];
      const scores = scoresRes.data || [];
      const spots = spotsRes.data || [];
      const unparkCounts = unparkCountsRes.data || [];
      const unparkRes = unparkResRes.data || [];
      const stockRows = stockRes.data || [];

      const cityByUser: Record<string, string[]> = {};
      spots.forEach((s: { user_id?: string; address?: string }) => {
        if (s.user_id) {
          const city = extractCityFromAddress(s.address);
          if (!cityByUser[s.user_id]) cityByUser[s.user_id] = [];
          cityByUser[s.user_id].push(city);
        }
      });

      const isPostalCode = (s: string) => /^\d{3}\s?\d{2}$/.test(s.replace(/\s/g, '')) || /^\d{5}$/.test(s.replace(/\s/g, ''));
      const getPrimaryCity = (userId: string) => {
        const cities = (cityByUser[userId] || []).filter((c) => c && c !== 'Άγνωστο' && !isPostalCode(c));
        if (cities.length === 0) return 'Άγνωστο';
        const counts: Record<string, number> = {};
        cities.forEach((c) => { counts[c] = (counts[c] || 0) + 1; });
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'Άγνωστο';
      };

      // Spots = πλήθος parking_spots ανά χρήστη
      const usersWithStats: UserProfile[] = profiles.map((profile: Record<string, unknown> & { id: string }) => {
        const uid = profile.id;
        const score = scores.find((s: { user_id: string }) => s.user_id === uid);
        const spotCount = spots.filter((s: { user_id: string }) => s.user_id === uid).length;
        const unparkU = unparkCounts.find((u: { profile_id: string }) => u.profile_id === uid);
        const unparkR = unparkRes.find((u: { user_id: string }) => u.user_id === uid);
        const unparkCount = Math.max(unparkU?.unpark_count || 0, unparkR?.unpark_count || 0);
        const stockRow = stockRows.find((s: { user_id: string }) => s.user_id === uid);
        const reservationStock = stockRow?.stock ?? 0;

        return {
          id: uid,
          email: profile.email as string | undefined,
          full_name: profile.full_name as string | undefined,
          subscription_status: profile.subscription_status as string | undefined,
          created_at: profile.created_at as string | undefined,
          updated_at: profile.updated_at as string | undefined,
          score: score?.score ?? 0,
          totalSpots: spotCount,
          totalReservations: 0,
          unparkCount,
          reservationStock,
          primaryCity: getPrimaryCity(uid),
        };
      });

      setUsers(usersWithStats);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Άγνωστο σφάλμα';
      alert(`Σφάλμα κατά τη φόρτωση:\n\n${msg}`);
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (user: UserProfile, mode: EditMode) => {
    setEditingUser(user);
    setEditMode(mode);
    setEditScore(user.score ?? 0);
    setEditFullName(user.full_name ?? '');
    setEditSubscription(user.subscription_status ?? 'free');
    setEditStock(user.reservationStock ?? 0);
  };

  const closeEdit = () => {
    setEditingUser(null);
    setEditMode(null);
  };

  const handleSaveScore = async () => {
    if (!editingUser) return;
    try {
      setLoading(true);
      const client = getSupabaseClient();
      const { data: existing } = await client.from('user_scores').select('*').eq('user_id', editingUser.id).single();
      if (existing) {
        await client.from('user_scores').update({ score: editScore }).eq('user_id', editingUser.id);
      } else {
        await client.from('user_scores').insert({ user_id: editingUser.id, score: editScore });
      }
      alert(`Score ενημερώθηκε σε ${editScore}!`);
      closeEdit();
      loadUsers();
    } catch (e: unknown) {
      alert(`Σφάλμα: ${e instanceof Error ? e.message : 'Άγνωστο'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!editingUser) return;
    try {
      setLoading(true);
      await getSupabaseClient()
        .from('profiles')
        .update({
          full_name: editFullName || null,
          subscription_status: editSubscription,
          updated_at: new Date().toISOString(),
        })
        .eq('id', editingUser.id);
      alert('Προφίλ ενημερώθηκε!');
      closeEdit();
      loadUsers();
    } catch (e: unknown) {
      alert(`Σφάλμα: ${e instanceof Error ? e.message : 'Άγνωστο'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveStock = async () => {
    if (!editingUser) return;
    try {
      setLoading(true);
      const client = getSupabaseClient();
      const { data: existing } = await client.from('user_reservation_stock').select('*').eq('user_id', editingUser.id).single();
      if (existing) {
        await client.from('user_reservation_stock').update({ stock: editStock, updated_at: new Date().toISOString() }).eq('user_id', editingUser.id);
      } else {
        await client.from('user_reservation_stock').insert({ user_id: editingUser.id, stock: editStock });
      }
      alert(`Stock ενημερώθηκε σε ${editStock}!`);
      closeEdit();
      loadUsers();
    } catch (e: unknown) {
      alert(`Σφάλμα: ${e instanceof Error ? e.message : 'Άγνωστο'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail?: string) => {
    if (!window.confirm(`Διαγραφή χρήστη ${userEmail || userId};\nΌλα τα δεδομένα θα διαγραφούν!`)) return;
    try {
      setLoading(true);
      const client = getSupabaseClient();
      await client.from('parking_spots').delete().eq('user_id', userId);
      await client.from('user_scores').delete().eq('user_id', userId);
      await client.from('user_unpark_counts').delete().eq('profile_id', userId);
      await client.from('unparkreservation').delete().eq('user_id', userId);
      await client.from('user_reservation_stock').delete().eq('user_id', userId);
      await client.from('profiles').delete().eq('id', userId);
      alert('Ο χρήστης διαγράφηκε!');
      loadUsers();
    } catch (e: unknown) {
      alert(`Σφάλμα: ${e instanceof Error ? e.message : 'Άγνωστο'}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Αντιγράφηκε!');
  };

  const cities = [...new Set(users.map((u) => u.primaryCity).filter(Boolean))].sort();

  const filteredUsers = users
    .filter((u) => {
      if (searchEmail && u.email && !u.email.toLowerCase().includes(searchEmail.toLowerCase())) return false;
      if (filterSubscription !== 'Όλα' && u.subscription_status !== filterSubscription) return false;
      if (filterCity !== 'Όλες' && u.primaryCity !== filterCity) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return (b.score ?? 0) - (a.score ?? 0);
        case 'totalSpots':
          return (b.totalSpots ?? 0) - (a.totalSpots ?? 0);
        case 'unparkCount':
          return (b.unparkCount ?? 0) - (a.unparkCount ?? 0);
        case 'created_at':
        default:
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
      }
    });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchEmail, filterSubscription, filterCity, sortBy]);

  const totalUsers = users.length;
  const premiumUsers = users.filter((u) => u.subscription_status === 'premium' || u.subscription_status === 'Premium').length;
  const newUsersToday = users.filter((u) => new Date(u.created_at || 0).toDateString() === new Date().toDateString()).length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Διαχείριση Χρηστών</h2>
      <p className="text-gray-600 mb-6">Προβολή και επεξεργασία όλων των χρηστών</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600">Συνολικοί Χρήστες</div>
          <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600">Premium</div>
          <div className="text-2xl font-bold text-blue-600">{premiumUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600">Νέοι Σήμερα</div>
          <div className="text-2xl font-bold text-green-600">{newUsersToday}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="text-sm text-gray-600">Μέσος Score</div>
          <div className="text-2xl font-bold text-purple-600">
            {users.length > 0 ? Math.round(users.reduce((s, u) => s + (u.score ?? 0), 0) / users.length) : 0}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αναζήτηση Email</label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Αναζήτηση..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
            <select
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Όλα">Όλα</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Πόλη</label>
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Όλες">Όλες</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ταξινόμηση</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="created_at">Ημερομηνία</option>
              <option value="score">Score</option>
              <option value="totalSpots">Spots</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadUsers}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Φόρτωση...' : 'Ανανέωση'}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Φόρτωση χρηστών...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Δεν βρέθηκαν χρήστες</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Όνομα</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Πόλη</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Spots</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Εγγραφή</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ενέργειες</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-mono">{user.id.substring(0, 8)}...</span>
                      <button onClick={() => copyToClipboard(user.id)} className="ml-1 text-blue-600" title="Αντιγραφή">📋</button>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      {user.email ? <a href={`mailto:${user.email}`} className="text-blue-600">{user.email}</a> : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.full_name || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.primaryCity || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        user.subscription_status === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                        user.subscription_status === 'platinum' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.subscription_status || 'free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{user.score ?? 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.totalSpots ?? 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">{user.reservationStock ?? 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at ? format(new Date(user.created_at), 'dd/MM/yyyy') : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        <button onClick={() => openEdit(user, 'score')} disabled={loading} className="px-2 py-1 bg-blue-600 text-white rounded text-xs hover:bg-blue-700 disabled:opacity-50">Score</button>
                        <button onClick={() => openEdit(user, 'profile')} disabled={loading} className="px-2 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-700 disabled:opacity-50">Προφίλ</button>
                        <button onClick={() => openEdit(user, 'stock')} disabled={loading} className="px-2 py-1 bg-green-600 text-white rounded text-xs hover:bg-green-700 disabled:opacity-50">Stock</button>
                        <button onClick={() => handleDeleteUser(user.id, user.email)} disabled={loading} className="px-2 py-1 bg-red-600 text-white rounded text-xs hover:bg-red-700 disabled:opacity-50">Διαγραφή</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filteredUsers.length > itemsPerPage && (
          <div className="bg-gray-50 px-4 py-3 flex justify-between items-center border-t">
            <span className="text-sm text-gray-700">
              {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredUsers.length)} από {filteredUsers.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Προηγούμενο
              </button>
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Επόμενο
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modals */}
      {editingUser && editMode && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">
              {editMode === 'score' && 'Επεξεργασία Score'}
              {editMode === 'profile' && 'Επεξεργασία Προφίλ'}
              {editMode === 'stock' && 'Επεξεργασία Stock'}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{editingUser.email}</p>

            {editMode === 'score' && (
              <>
                <label className="block text-sm font-medium mb-2">Score</label>
                <input
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={closeEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Ακύρωση</button>
                  <button onClick={handleSaveScore} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Αποθήκευση</button>
                </div>
              </>
            )}

            {editMode === 'profile' && (
              <>
                <label className="block text-sm font-medium mb-2">Όνομα</label>
                <input
                  type="text"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <label className="block text-sm font-medium mb-2">Subscription</label>
                <select
                  value={editSubscription}
                  onChange={(e) => setEditSubscription(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                >
                  <option value="free">Free</option>
                  <option value="premium">Premium</option>
                  <option value="platinum">Platinum</option>
                </select>
                <div className="flex gap-2 justify-end">
                  <button onClick={closeEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Ακύρωση</button>
                  <button onClick={handleSaveProfile} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Αποθήκευση</button>
                </div>
              </>
            )}

            {editMode === 'stock' && (
              <>
                <label className="block text-sm font-medium mb-2">Reservation Stock</label>
                <input
                  type="number"
                  value={editStock}
                  onChange={(e) => setEditStock(parseInt(e.target.value) || 0)}
                  min={0}
                  className="w-full px-3 py-2 border rounded-lg mb-4"
                />
                <div className="flex gap-2 justify-end">
                  <button onClick={closeEdit} className="px-4 py-2 bg-gray-200 rounded-lg">Ακύρωση</button>
                  <button onClick={handleSaveStock} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-lg">Αποθήκευση</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
