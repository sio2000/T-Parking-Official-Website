import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
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
}

export default function UsersManagement() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState('');
  const [filterSubscription, setFilterSubscription] = useState<string>('Όλα');
  const [sortBy, setSortBy] = useState<string>('created_at');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(50);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [editScore, setEditScore] = useState<number>(0);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      console.log('[UsersManagement] Loading users...');
      
      const client = getSupabaseClient();
      
      // Fetch profiles
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (profilesError) throw profilesError;
      
      // Fetch scores
      const { data: scores, error: scoresError } = await client
        .from('user_scores')
        .select('*');
      
      // Fetch spot counts
      const { data: spots, error: spotsError } = await client
        .from('parking_spots')
        .select('user_id');
      
      // Fetch reservation counts
      const { data: reservations, error: reservationsError } = await client
        .from('reserved_spots')
        .select('spot_id');
      
      // Combine data
      const usersWithStats: UserProfile[] = (profiles || []).map((profile: any) => {
        const score = scores?.find((s: any) => s.user_id === profile.id);
        const spotCount = spots?.filter((s: any) => s.user_id === profile.id).length || 0;
        // Note: reservations are linked via spot_id, so we'd need to join with parking_spots for accurate count
        const reservationCount = 0; // Simplified for now
        
        return {
          ...profile,
          score: score?.score || 0,
          totalSpots: spotCount,
          totalReservations: reservationCount,
        };
      });
      
      setUsers(usersWithStats);
      console.log('[UsersManagement] Loaded', usersWithStats.length, 'users');
    } catch (error: any) {
      console.error('[UsersManagement] Error loading users:', error);
      alert(`Σφάλμα κατά τη φόρτωση των χρηστών:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleEditScore = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    setEditingUser(user);
    setEditScore(user.score || 0);
  };

  const handleSaveScore = async () => {
    if (!editingUser) return;

    try {
      setLoading(true);
      console.log('[UsersManagement] Updating score for user:', editingUser.id, 'to', editScore);
      
      const client = getSupabaseClient();
      
      // Check if user_scores record exists
      const { data: existingScore, error: checkError } = await client
        .from('user_scores')
        .select('*')
        .eq('user_id', editingUser.id)
        .single();
      
      if (checkError && checkError.code !== 'PGRST116') {
        // PGRST116 = no rows returned, which is fine
        throw checkError;
      }
      
      if (existingScore) {
        // Update existing score
        const { error: updateError } = await client
          .from('user_scores')
          .update({ score: editScore })
          .eq('user_id', editingUser.id);
        
        if (updateError) throw updateError;
      } else {
        // Insert new score record
        const { error: insertError } = await client
          .from('user_scores')
          .insert({ user_id: editingUser.id, score: editScore });
        
        if (insertError) throw insertError;
      }
      
      alert(`Το score του χρήστη ενημερώθηκε επιτυχώς σε ${editScore}!`);
      setEditingUser(null);
      setEditScore(0);
      loadUsers();
    } catch (error: any) {
      console.error('[UsersManagement] Error updating score:', error);
      alert(`Σφάλμα κατά την ενημέρωση του score:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string, userEmail?: string) => {
    const confirmed = window.confirm(
      `Είστε σίγουρος ότι θέλετε να διαγράψετε τον χρήστη ${userEmail || userId}?\n\nΑυτή η ενέργεια θα διαγράψει όλα τα δεδομένα του χρήστη!\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!`
    );

    if (!confirmed) return;

    try {
      setLoading(true);
      console.log('[UsersManagement] Deleting user:', userId);
      
      const client = getSupabaseClient();
      
      // Delete user's parking spots first
      const { error: spotsError } = await client
        .from('parking_spots')
        .delete()
        .eq('user_id', userId);
      
      if (spotsError) console.warn('[UsersManagement] Error deleting spots:', spotsError);
      
      // Delete user's reservations
      // Note: This would require joining with parking_spots, simplified for now
      
      // Delete user's scores
      const { error: scoresError } = await client
        .from('user_scores')
        .delete()
        .eq('user_id', userId);
      
      if (scoresError) console.warn('[UsersManagement] Error deleting scores:', scoresError);
      
      // Delete profile
      const { error: profileError } = await client
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (profileError) throw profileError;
      
      alert('Ο χρήστης διαγράφηκε επιτυχώς!');
      loadUsers();
    } catch (error: any) {
      console.error('[UsersManagement] Error deleting user:', error);
      alert(`Σφάλμα κατά τη διαγραφή του χρήστη:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Αντιγράφηκε!');
  };

  // Filter and sort users
  const filteredUsers = users
    .filter((user) => {
      if (searchEmail && user.email && !user.email.toLowerCase().includes(searchEmail.toLowerCase())) {
        return false;
      }
      if (filterSubscription !== 'Όλα' && user.subscription_status !== filterSubscription) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return (b.score || 0) - (a.score || 0);
        case 'totalSpots':
          return (b.totalSpots || 0) - (a.totalSpots || 0);
        case 'created_at':
          return new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime();
        default:
          return 0;
      }
    });

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchEmail, filterSubscription, sortBy]);

  // Calculate statistics
  const totalUsers = users.length;
  const premiumUsers = users.filter((u) => u.subscription_status === 'premium' || u.subscription_status === 'Premium').length;
  const today = new Date();
  const newUsersToday = users.filter((u) => {
    const created = new Date(u.created_at || 0);
    return created.toDateString() === today.toDateString();
  }).length;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Διαχείριση Χρηστών</h2>
      <p className="text-gray-600 mb-6">Προβολή και διαχείριση όλων των χρηστών της εφαρμογής</p>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Συνολικοί Χρήστες</div>
          <div className="text-2xl font-bold text-gray-900">{totalUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Premium Χρήστες</div>
          <div className="text-2xl font-bold text-blue-600">{premiumUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Νέοι Σήμερα</div>
          <div className="text-2xl font-bold text-green-600">{newUsersToday}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Μέσος Score</div>
          <div className="text-2xl font-bold text-purple-600">
            {users.length > 0
              ? Math.round(users.reduce((sum, u) => sum + (u.score || 0), 0) / users.length)
              : 0}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αναζήτηση Email</label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              placeholder="Αναζήτηση..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subscription</label>
            <select
              value={filterSubscription}
              onChange={(e) => setFilterSubscription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Όλα">Όλα</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="platinum">Platinum</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ταξινόμηση</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="created_at">Ημερομηνία</option>
              <option value="score">Score</option>
              <option value="totalSpots">Πλήθος Spots</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={loadUsers}
              disabled={loading}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Φόρτωση...' : 'Ανανέωση'}
            </button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Φόρτωση χρηστών...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Δεν βρέθηκαν χρήστες</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Όνομα</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Spots</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Εγγραφή</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ενέργειες</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 font-mono">{user.id.substring(0, 8)}...</span>
                        <button
                          onClick={() => copyToClipboard(user.id)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Αντιγραφή ID"
                        >
                          📋
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {user.email ? (
                        <a href={`mailto:${user.email}`} className="text-sm text-blue-600 hover:text-blue-800">
                          {user.email}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {user.full_name || '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          user.subscription_status === 'premium' || user.subscription_status === 'Premium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : user.subscription_status === 'platinum' || user.subscription_status === 'Platinum'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {user.subscription_status || 'Free'}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.score || 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{user.totalSpots || 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {user.created_at ? format(new Date(user.created_at), 'dd/MM/yyyy') : '-'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditScore(user.id)}
                          disabled={loading}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Επεξεργασία Score
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id, user.email)}
                          disabled={loading}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Διαγραφή
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {filteredUsers.length > itemsPerPage && (
          <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Προηγούμενο
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Επόμενο
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Εμφάνιση <span className="font-medium">{startIndex + 1}</span> έως{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> από{' '}
                  <span className="font-medium">{filteredUsers.length}</span> χρήστες
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Προηγούμενο
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === page
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (page === currentPage - 3 || page === currentPage + 3) {
                      return (
                        <span key={page} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Επόμενο
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Score Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Επεξεργασία Score</h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Χρήστης:</strong> {editingUser.email || editingUser.id.substring(0, 8)}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <strong>Τρέχον Score:</strong> {editingUser.score || 0}
                </p>
                <label className="block text-sm font-medium text-gray-700 mb-2">Νέο Score</label>
                <input
                  type="number"
                  value={editScore}
                  onChange={(e) => setEditScore(parseInt(e.target.value) || 0)}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => {
                    setEditingUser(null);
                    setEditScore(0);
                  }}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Ακύρωση
                </button>
                <button
                  onClick={handleSaveScore}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Αποθήκευση...' : 'Αποθήκευση'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

