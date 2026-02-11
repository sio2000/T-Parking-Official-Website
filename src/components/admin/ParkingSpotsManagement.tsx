import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface ParkingSpot {
  id: string;
  user_id: string;
  latitude: number;
  longitude: number;
  user_email: string;
  is_active: boolean;
  size: 'small' | 'medium' | 'large';
  is_accessible: boolean;
  created_at: string;
  friends_priority: string[];
}

export default function ParkingSpotsManagement() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filters, setFilters] = useState({
    is_active: null as boolean | null,
    size: '' as string,
    user_email: '',
    created_before: '',
  });
  const [selectedSpots, setSelectedSpots] = useState<Set<string>>(new Set());
  const itemsPerPage = 100;

  useEffect(() => {
    loadSpots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // Reset to page 1 when filters change (loadSpots will be called by the currentPage useEffect)
  useEffect(() => {
    setCurrentPage(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.is_active, filters.size, filters.user_email]);

  const loadSpots = async () => {
    try {
      setLoading(true);
      console.log('[ParkingSpotsManagement] Starting to load spots...', { filters, currentPage });

      const client = getSupabaseClient();
      let query = client.from('parking_spots').select('*', { count: 'exact' });
      console.log('[ParkingSpotsManagement] Base query created');

      if (filters.is_active !== null) {
        query = query.eq('is_active', filters.is_active);
        console.log('[ParkingSpotsManagement] Applied is_active filter:', filters.is_active);
      }
      if (filters.size) {
        query = query.eq('size', filters.size);
        console.log('[ParkingSpotsManagement] Applied size filter:', filters.size);
      }
      if (filters.user_email) {
        query = query.ilike('user_email', `%${filters.user_email}%`);
        console.log('[ParkingSpotsManagement] Applied user_email filter:', filters.user_email);
      }

      console.log('[ParkingSpotsManagement] Executing query with pagination...', {
        from: (currentPage - 1) * itemsPerPage,
        to: currentPage * itemsPerPage - 1
      });

      const { data, error, count } = await query
        .order('created_at', { ascending: false })
        .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

      console.log('[ParkingSpotsManagement] Query result:', {
        dataLength: data?.length || 0,
        count,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[ParkingSpotsManagement] Query error:', error);
        throw error;
      }

      console.log('[ParkingSpotsManagement] Setting spots:', data?.length || 0, 'spots');
      setSpots(data || []);
      setTotalCount(count || 0);
      console.log('[ParkingSpotsManagement] Spots loaded successfully!');
    } catch (error: any) {
      console.error('[ParkingSpotsManagement] Error loading parking spots:', error);
      console.error('[ParkingSpotsManagement] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη φόρτωση των θέσεων:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή τη θέση στάθμευσης?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[ParkingSpotsManagement] Attempting to delete spot:', id);
      
      const client = getSupabaseClient();
      const { data, error } = await client
        .from('parking_spots')
        .delete()
        .eq('id', id)
        .select();
      
      console.log('[ParkingSpotsManagement] Delete result:', {
        deletedCount: data?.length || 0,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });
      
      if (error) {
        console.error('[ParkingSpotsManagement] Delete error:', error);
        throw error;
      }
      
      const deletedCount = data?.length || 0;
      console.log('[ParkingSpotsManagement] Successfully deleted', deletedCount, 'spot(s)');
      
      // Remove from local state immediately for better UX
      setSpots((prev) => prev.filter((spot) => spot.id !== id));
      setTotalCount((prev) => prev - 1);
      
      alert(`Η θέση διαγράφηκε επιτυχώς! (Διαγράφηκαν ${deletedCount} εγγραφές)`);
    } catch (error: any) {
      console.error('[ParkingSpotsManagement] Error deleting parking spot:', error);
      console.error('[ParkingSpotsManagement] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη διαγραφή της θέσης:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
      // Reload on error to ensure consistency
      loadSpots();
    } finally {
      setLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (!filters.created_before) {
      alert('Παρακαλώ επιλέξτε ημερομηνία');
      return;
    }

    const confirmed = window.confirm(
      `Είστε σίγουρος ότι θέλετε να διαγράψετε όλες τις θέσεις που δημιουργήθηκαν πριν από ${filters.created_before}?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[ParkingSpotsManagement] Starting bulk delete before date:', filters.created_before);
      
      // Convert date to ISO string (date picker gives YYYY-MM-DD format)
      // Important: Use UTC midnight to ensure correct comparison
      const deleteDate = new Date(filters.created_before + 'T00:00:00.000Z').toISOString();
      console.log('[ParkingSpotsManagement] Converted date to ISO:', deleteDate);
      console.log('[ParkingSpotsManagement] Current date/time:', new Date().toISOString());

      // First, let's check how many spots match the criteria (for debugging)
      console.log('[ParkingSpotsManagement] Checking how many spots match criteria before deletion...');
      const client = getSupabaseClient();
      const { count: matchingCount, error: countError } = await client
        .from('parking_spots')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', deleteDate);
      
      const matchingCountValue = matchingCount || 0;
      console.log('[ParkingSpotsManagement] Spots matching criteria (< ' + deleteDate + '):', matchingCountValue);
      console.log('[ParkingSpotsManagement] Count details:', {
        count: matchingCountValue,
        countError: countError ? {
          message: countError.message,
          code: countError.code,
          details: countError.details,
          hint: countError.hint
        } : null
      });

      if (matchingCountValue === 0) {
        alert(`Δεν βρέθηκαν θέσεις που δημιουργήθηκαν πριν από ${filters.created_before}.\n\nΑν αναμένατε να βρεθούν θέσεις, ελέγξτε:\n1. Αν η ημερομηνία είναι σωστή\n2. Αν υπάρχουν spots με created_at πριν από αυτή την ημερομηνία\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
        setLoading(false);
        return;
      }

      console.log('[ParkingSpotsManagement] Executing bulk delete query...');
      console.log('[ParkingSpotsManagement] Delete query filter: created_at <', deleteDate);
      console.log('[ParkingSpotsManagement] Using client:', supabaseAdmin ? 'admin (service_role - bypasses RLS)' : 'anon (may be blocked by RLS)');
      
      const deleteResult = await client
        .from('parking_spots')
        .delete()
        .lt('created_at', deleteDate)
        .select();
      
      const { data, error } = deleteResult;

      console.log('[ParkingSpotsManagement] Raw delete result:', {
        hasData: !!data,
        dataLength: data?.length,
        dataType: Array.isArray(data) ? 'array' : typeof data,
        dataPreview: data ? (Array.isArray(data) ? `Array[${data.length}]` : JSON.stringify(data).substring(0, 100)) : 'null',
        hasError: !!error,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint,
          statusCode: (error as any).statusCode
        } : null
      });

      const deletedCount = data?.length || 0;
      console.log('[ParkingSpotsManagement] Bulk delete result summary:', {
        deletedCount: deletedCount,
        expectedCount: matchingCountValue,
        match: deletedCount === matchingCountValue ? '✅ Match' : '⚠️ Mismatch - Possible RLS policy issue!',
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[ParkingSpotsManagement] Bulk delete error:', error);
        console.error('[ParkingSpotsManagement] Error may be due to RLS (Row Level Security) policies blocking deletion.');
        console.error('[ParkingSpotsManagement] Solution: Use service_role key for admin operations or adjust RLS policies.');
        throw error;
      }

      // If no error but also no deletions, warn about possible RLS issue
      if (!error && deletedCount === 0 && matchingCountValue > 0) {
        console.warn('[ParkingSpotsManagement] ⚠️ WARNING: Expected to delete', matchingCountValue, 'spots but deleted 0.');
        console.warn('[ParkingSpotsManagement] This likely indicates RLS (Row Level Security) policies are blocking deletion.');
        console.warn('[ParkingSpotsManagement] The anon key may not have DELETE permissions. Consider using service_role key for admin operations.');
      }

      console.log('[ParkingSpotsManagement] Successfully deleted', deletedCount, 'out of', matchingCountValue, 'expected spots');
      
      if (deletedCount === 0 && matchingCountValue > 0) {
        alert(`⚠️ Προσοχή: Βρέθηκαν ${matchingCountValue} θέσεις για διαγραφή, αλλά δεν διαγράφηκε καμία.\n\nΑυτό συνήθως σημαίνει ότι τα RLS (Row Level Security) policies εμποδίζουν τη διαγραφή.\n\nΓια admin operations, μπορεί να χρειάζεσαι service_role key αντί για anon key.\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
      } else {
        alert(`Διαγράφηκαν ${deletedCount} από ${matchingCountValue} θέσεις επιτυχώς!`);
      }
      
      // Clear the date filter and reload
      setFilters({ ...filters, created_before: '' });
      loadSpots();
    } catch (error: any) {
      console.error('[ParkingSpotsManagement] Error bulk deleting parking spots:', error);
      console.error('[ParkingSpotsManagement] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη μαζική διαγραφή:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Θέσεων Στάθμευσης</h2>
        <p className="text-gray-600 mt-1">Προβολή και διαχείριση όλων των θέσεων στάθμευσης</p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Κατάσταση
            </label>
            <select
              value={filters.is_active === null ? '' : filters.is_active.toString()}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  is_active: e.target.value === '' ? null : e.target.value === 'true',
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Όλα</option>
              <option value="true">Ενεργές</option>
              <option value="false">Ανενεργές</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Μέγεθος
            </label>
            <select
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Όλα</option>
              <option value="small">Μικρό</option>
              <option value="medium">Μεσαίο</option>
              <option value="large">Μεγάλο</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Χρήστη
            </label>
            <input
              type="text"
              value={filters.user_email}
              onChange={(e) => setFilters({ ...filters, user_email: e.target.value })}
              placeholder="Αναζήτηση..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Διαγραφή πριν από
            </label>
            <input
              type="date"
              value={filters.created_before}
              onChange={(e) => setFilters({ ...filters, created_before: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={loadSpots}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Φόρτωση...' : 'Εφαρμογή Φίλτρων'}
          </button>
          <button
            onClick={() => {
              setFilters({
                is_active: null,
                size: '',
                user_email: '',
                created_before: '',
              });
              setCurrentPage(1);
            }}
            disabled={loading}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Καθαρισμός
          </button>
          {filters.created_before && (
            <button
              onClick={handleBulkDelete}
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Επεξεργασία...' : 'Μαζική Διαγραφή'}
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-12 text-gray-600">Φόρτωση...</div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Συντεταγμένες
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Μέγεθος
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Κατάσταση
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ημερομηνία
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ενέργειες
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {spots.map((spot) => (
                  <tr key={spot.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {spot.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {spot.user_email || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {spot.latitude.toFixed(6)}, {spot.longitude.toFixed(6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          spot.size === 'small'
                            ? 'bg-red-100 text-red-800'
                            : spot.size === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {spot.size === 'small' ? 'Μικρό' : spot.size === 'medium' ? 'Μεσαίο' : 'Μεγάλο'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          spot.is_active
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {spot.is_active ? 'Ενεργή' : 'Ανενεργή'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(spot.created_at), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => handleDelete(spot.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-900 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Διαγραφή
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                Εμφάνιση {(currentPage - 1) * itemsPerPage + 1} -{' '}
                {Math.min(currentPage * itemsPerPage, totalCount)} από {totalCount}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Προηγούμενο
                </button>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Επόμενο
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

