import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format, isAfter } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface ReservedSpot {
  id: string;
  spot_id: string;
  user_id: string;
  expires_at: string;
  created_at: string;
}

export default function ReservedSpotsManagement() {
  const [reservations, setReservations] = useState<ReservedSpot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReservations();
  }, []);

  const loadReservations = async () => {
    try {
      setLoading(true);
      console.log('[ReservedSpotsManagement] Starting to load reservations...');

      const client = getSupabaseClient();
      const { data, error } = await client
        .from('reserved_spots')
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

  const handleDeleteExpired = async () => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε όλες τις ληγμένες κρατήσεις?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      const now = new Date().toISOString();
      console.log('[ReservedSpotsManagement] Starting to delete expired reservations before:', now);

      const client = getSupabaseClient();
      const { data, error } = await client
        .from('reserved_spots')
        .delete()
        .lt('expires_at', now)
        .select();

      console.log('[ReservedSpotsManagement] Delete expired result:', {
        deletedCount: data?.length || 0,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[ReservedSpotsManagement] Delete expired error:', error);
        throw error;
      }

      const deletedCount = data?.length || 0;
      console.log('[ReservedSpotsManagement] Successfully deleted', deletedCount, 'expired reservations');
      alert(`Διαγράφηκαν ${deletedCount} ληγμένες κρατήσεις επιτυχώς!`);
      loadReservations();
    } catch (error: any) {
      console.error('[ReservedSpotsManagement] Error deleting expired reservations:', error);
      console.error('[ReservedSpotsManagement] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη διαγραφή:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή τη κράτηση?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      const client = getSupabaseClient();
      const { error } = await client.from('reserved_spots').delete().eq('id', id);
      
      if (error) throw error;
      
      // Remove from local state immediately for better UX
      setReservations((prev) => prev.filter((r) => r.id !== id));
      
      alert('Η κράτηση διαγράφηκε επιτυχώς!');
    } catch (error: any) {
      console.error('Error deleting reservation:', error);
      alert(`Σφάλμα κατά τη διαγραφή: ${error.message || 'Άγνωστο σφάλμα'}`);
      // Reload on error to ensure consistency
      loadReservations();
    } finally {
      setLoading(false);
    }
  };

  const isExpired = (expiresAt: string) => {
    return !isAfter(new Date(expiresAt), new Date());
  };

  const expiredCount = reservations.filter((r) => isExpired(r.expires_at)).length;

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Διαχείριση Κρατήσεων</h2>
          <p className="text-gray-600 mt-1">Προβολή και διαχείριση όλων των κρατήσεων θέσεων</p>
        </div>
        {expiredCount > 0 && (
          <button
            onClick={handleDeleteExpired}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {loading ? 'Επεξεργασία...' : `Διαγραφή Ληγμένων (${expiredCount})`}
          </button>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-600">Φόρτωση...</div>
      ) : reservations.length === 0 ? (
        <div className="text-center py-12 text-gray-600">Δεν υπάρχουν κρατήσεις</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Spot ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Κατάσταση
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Λήγει
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Δημιουργήθηκε
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ενέργειες
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reservations.map((reservation) => {
                const expired = isExpired(reservation.expires_at);
                return (
                  <tr key={reservation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {reservation.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {reservation.spot_id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {reservation.user_id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          expired
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {expired ? 'Ληγμένη' : 'Ενεργή'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(reservation.expires_at), 'dd/MM/yyyy HH:mm')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(reservation.created_at), 'dd/MM/yyyy HH:mm')}
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
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={loadReservations}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Φόρτωση...
            </>
          ) : (
            'Ανανέωση'
          )}
        </button>
      </div>
    </div>
  );
}

