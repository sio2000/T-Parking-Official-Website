import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface UserReservationStock {
  id: number;
  user_id: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export default function ReservedSpotsManagement() {
  const [reservations, setReservations] = useState<UserReservationStock[]>([]);
  const [totalReservations, setTotalReservations] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState<number>(0);
  const [totalStock, setTotalStock] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [userNamesMap, setUserNamesMap] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      console.log('[ReservedSpotsManagement] Starting to load reservations from user_reservation_stock...');

      const client = getSupabaseClient();
      
      // Load user names from profiles table
      console.log('[ReservedSpotsManagement] Loading user names from profiles...');
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('id, full_name');
      
      if (profilesError) {
        console.warn('[ReservedSpotsManagement] Error loading profiles:', profilesError);
      } else {
        const namesMap = new Map<string, string>();
        (profiles || []).forEach((profile: any) => {
          if (profile.id && profile.full_name) {
            namesMap.set(profile.id, profile.full_name);
          }
        });
        setUserNamesMap(namesMap);
        console.log('[ReservedSpotsManagement] Loaded', namesMap.size, 'user names');
      }
      
      // Get total count
      const { count: totalCount, error: countError } = await client
        .from('user_reservation_stock')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        console.error('[ReservedSpotsManagement] Count error:', countError);
      } else {
        setTotalReservations(totalCount || 0);
        console.log('[ReservedSpotsManagement] Total reservations count:', totalCount);
      }
      
      // Get all records
      const { data, error } = await client
        .from('user_reservation_stock')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('[ReservedSpotsManagement] Query result:', {
        dataLength: data?.length || 0,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[ReservedSpotsManagement] Query error:', error);
        throw error;
      }

      // Calculate unique users and total stock
      if (data && data.length > 0) {
        const uniqueUserSet = new Set(data.map((item: any) => item.user_id).filter(Boolean));
        setUniqueUsers(uniqueUserSet.size);
        
        const stockSum = data.reduce((sum: number, item: any) => sum + (item.stock || 0), 0);
        setTotalStock(stockSum);
        
        console.log('[ReservedSpotsManagement] Stats:', {
          totalRecords: data.length,
          uniqueUsers: uniqueUserSet.size,
          totalStock: stockSum
        });
      }

      console.log('[ReservedSpotsManagement] Setting reservations:', data?.length || 0, 'reservations');
      setReservations(data || []);
      console.log('[ReservedSpotsManagement] Reservations loaded successfully!');
    } catch (error: any) {
      console.error('[ReservedSpotsManagement] Error loading reservations:', error);
      console.error('[ReservedSpotsManagement] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη φόρτωση των κρατήσεων:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteZeroStock = async () => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε όλες τις κρατήσεις με stock = 0?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[ReservedSpotsManagement] Starting to delete zero stock reservations...');

      const client = getSupabaseClient();
      const { data, error } = await client
        .from('user_reservation_stock')
        .delete()
        .eq('stock', 0)
        .select();

      console.log('[ReservedSpotsManagement] Delete zero stock result:', {
        deletedCount: data?.length || 0,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[ReservedSpotsManagement] Delete zero stock error:', error);
        throw error;
      }

      const deletedCount = data?.length || 0;
      console.log('[ReservedSpotsManagement] Successfully deleted', deletedCount, 'zero stock reservations');
      alert(`Διαγράφηκαν ${deletedCount} κρατήσεις με stock = 0 επιτυχώς!`);
      loadReservations();
    } catch (error: any) {
      console.error('[ReservedSpotsManagement] Error deleting zero stock reservations:', error);
      alert(`Σφάλμα κατά τη διαγραφή:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή τη κράτηση?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      const client = getSupabaseClient();
      const { error } = await client.from('user_reservation_stock').delete().eq('id', id);
      
      if (error) throw error;
      
      // Remove from local state immediately for better UX
      setReservations((prev) => prev.filter((r) => r.id !== id));
      
      alert('Η κράτηση διαγράφηκε επιτυχώς!');
      loadReservations(); // Reload to update stats
    } catch (error: any) {
      console.error('Error deleting reservation:', error);
      alert(`Σφάλμα κατά τη διαγραφή: ${error.message || 'Άγνωστο σφάλμα'}`);
      loadReservations();
    } finally {
      setLoading(false);
    }
  };

  const zeroStockCount = reservations.filter((r) => r.stock === 0).length;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Κρατήσεων</h2>
        <p className="text-gray-600 mt-1">Προβολή και διαχείριση όλων των κρατήσεων θέσεων (user_reservation_stock)</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Φόρτωση...</span>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Κύρια κάρτα - Συνολικές Κρατήσεις */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {totalReservations.toLocaleString('el-GR')}
                </h3>
                <p className="text-gray-700 font-medium">Συνολικές Κρατήσεις</p>
              </div>
            </div>

            {/* Μοναδικοί Χρήστες */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {uniqueUsers.toLocaleString('el-GR')}
                </h3>
                <p className="text-gray-700 font-medium">Μοναδικοί Χρήστες</p>
              </div>
            </div>

            {/* Συνολικό Stock */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6 shadow-lg">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-1">
                  {totalStock.toLocaleString('el-GR')}
                </h3>
                <p className="text-gray-700 font-medium">Συνολικό Stock</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {zeroStockCount > 0 && (
                <button
                  onClick={handleDeleteZeroStock}
                  disabled={loading}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  Διαγραφή με Stock = 0 ({zeroStockCount})
                </button>
              )}
            </div>
            <button
              onClick={loadReservations}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ανανέωση
            </button>
          </div>

          {/* Table */}
          {reservations.length === 0 ? (
            <div className="text-center py-12 text-gray-600 bg-gray-50 rounded-lg">
              Δεν υπάρχουν κρατήσεις
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ονοματεπώνυμο
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Δημιουργήθηκε
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ενημερώθηκε
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ενέργειες
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservations.map((reservation) => (
                    <tr key={reservation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {reservation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.user_id 
                          ? (userNamesMap.get(reservation.user_id) || `${reservation.user_id.slice(0, 8)}...`)
                          : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            reservation.stock === 0
                              ? 'bg-red-100 text-red-800'
                              : reservation.stock > 0
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {reservation.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.created_at ? format(new Date(reservation.created_at), 'dd/MM/yyyy HH:mm') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reservation.updated_at ? format(new Date(reservation.updated_at), 'dd/MM/yyyy HH:mm') : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDelete(reservation.id)}
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
          )}
        </div>
      )}
    </div>
  );
}

