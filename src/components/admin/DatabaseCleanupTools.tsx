import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

export default function DatabaseCleanupTools() {
  const [loading, setLoading] = useState(false);
  const [deleteBeforeDate, setDeleteBeforeDate] = useState('');
  const [deleteHistoryBeforeDate, setDeleteHistoryBeforeDate] = useState('');

  const handleDeleteInactiveSpots = async () => {
    const confirmed = window.confirm(
      'Είστε σίγουρος ότι θέλετε να διαγράψετε όλες τις ανενεργές θέσεις;\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!'
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[DatabaseCleanupTools] Starting to delete inactive spots...');

      console.log('[DatabaseCleanupTools] Executing delete inactive spots query...');
      const client = getSupabaseClient();
      console.log('[DatabaseCleanupTools] Using client:', supabaseAdmin ? 'admin (service_role - bypasses RLS)' : 'anon (may be blocked by RLS)');
      
      const deleteResult = await client
        .from('parking_spots')
        .delete()
        .eq('is_active', false)
        .select();
      
      const { data, error } = deleteResult;
      
      console.log('[DatabaseCleanupTools] Delete inactive result:', {
        hasData: !!data,
        dataLength: data?.length,
        hasError: !!error,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      console.log('[DatabaseCleanupTools] Delete inactive result:', {
        deletedCount: data?.length || 0,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[DatabaseCleanupTools] Delete inactive error:', error);
        throw error;
      }

      const deletedCount = data?.length || 0;
      console.log('[DatabaseCleanupTools] Successfully deleted', deletedCount, 'inactive spots');
      
      if (deletedCount === 0 && !error) {
        console.warn('[DatabaseCleanupTools] ⚠️ No spots deleted. This may indicate RLS policies blocking deletion.');
        alert(`⚠️ Προσοχή: Δεν διαγράφηκε καμία ανενεργή θέση.\n\nΑυτό μπορεί να σημαίνει:\n1. Δεν υπάρχουν ανενεργές θέσεις\n2. RLS policies εμποδίζουν τη διαγραφή\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
      } else {
        alert(`Διαγράφηκαν ${deletedCount} ανενεργές θέσεις επιτυχώς!`);
      }
    } catch (error: any) {
      console.error('[DatabaseCleanupTools] Error deleting inactive spots:', error);
      console.error('[DatabaseCleanupTools] Error details:', {
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

  const handleDeleteOldSpots = async () => {
    if (!deleteBeforeDate) {
      alert('Παρακαλώ επιλέξτε ημερομηνία');
      return;
    }

    const confirmed = window.confirm(
      `Είστε σίγουρος ότι θέλετε να διαγράψετε όλες τις θέσεις που δημιουργήθηκαν πριν από ${deleteBeforeDate}?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[DatabaseCleanupTools] Starting to delete old spots before:', deleteBeforeDate);
      
      // Convert date to ISO string (date picker gives YYYY-MM-DD format)
      const deleteDate = new Date(deleteBeforeDate + 'T00:00:00.000Z').toISOString();
      console.log('[DatabaseCleanupTools] Converted date to ISO:', deleteDate);
      console.log('[DatabaseCleanupTools] Current date/time:', new Date().toISOString());

      // First, check how many spots match the criteria
      console.log('[DatabaseCleanupTools] Checking how many spots match criteria before deletion...');
      const client = getSupabaseClient();
      const { count: matchingCount, error: countError } = await client
        .from('parking_spots')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', deleteDate);
      
      const matchingCountValue = matchingCount || 0;
      console.log('[DatabaseCleanupTools] Spots matching criteria (< ' + deleteDate + '):', matchingCountValue);
      console.log('[DatabaseCleanupTools] Count details:', {
        count: matchingCountValue,
        countError: countError ? {
          message: countError.message,
          code: countError.code,
          details: countError.details,
          hint: countError.hint
        } : null
      });

      if (matchingCountValue === 0) {
        console.log('[DatabaseCleanupTools] No spots found matching criteria. Showing alert to user.');
        alert(`Δεν βρέθηκαν θέσεις που δημιουργήθηκαν πριν από ${deleteBeforeDate}.\n\nΑν αναμένατε να βρεθούν θέσεις, ελέγξτε:\n1. Αν η ημερομηνία είναι σωστή\n2. Αν υπάρχουν spots με created_at πριν από αυτή την ημερομηνία\n\nΤρέχουσα ημερομηνία: ${new Date().toLocaleDateString('el-GR')}\nΗμερομηνία διαγραφής: ${deleteDate}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
        setLoading(false);
        return;
      }

      console.log('[DatabaseCleanupTools] Found', matchingCountValue, 'spots to delete. Proceeding with deletion...');

      console.log('[DatabaseCleanupTools] Executing delete old spots query...');
      console.log('[DatabaseCleanupTools] Using client:', supabaseAdmin ? 'admin (service_role - bypasses RLS)' : 'anon (may be blocked by RLS)');
      
      // Reuse the same client variable that was declared earlier
      const deleteResult = await client
        .from('parking_spots')
        .delete()
        .lt('created_at', deleteDate)
        .select();
      
      const { data, error } = deleteResult;
      
      console.log('[DatabaseCleanupTools] Delete old spots query result:', {
        hasData: !!data,
        dataLength: data?.length,
        hasError: !!error,
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      const deletedCount = data?.length || 0;
      console.log('[DatabaseCleanupTools] Delete old spots result:', {
        deletedCount: deletedCount,
        expectedCount: matchingCountValue,
        match: deletedCount === matchingCountValue ? '✅ Match' : '⚠️ Mismatch',
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[DatabaseCleanupTools] Delete old spots error:', error);
        throw error;
      }

      console.log('[DatabaseCleanupTools] Successfully deleted', deletedCount, 'out of', matchingCountValue, 'expected old spots');
      
      if (deletedCount === 0 && matchingCountValue > 0) {
        alert(`⚠️ Προσοχή: Βρέθηκαν ${matchingCountValue} παλιές θέσεις, αλλά δεν διαγράφηκε καμία.\n\nΑυτό συνήθως σημαίνει ότι τα RLS (Row Level Security) policies εμποδίζουν τη διαγραφή.\n\nΓια admin operations, μπορεί να χρειάζεσαι service_role key αντί για anon key.\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
      } else {
        alert(`Διαγράφηκαν ${deletedCount} από ${matchingCountValue} παλιές θέσεις επιτυχώς!`);
      }
      setDeleteBeforeDate('');
    } catch (error: any) {
      console.error('[DatabaseCleanupTools] Error deleting old spots:', error);
      console.error('[DatabaseCleanupTools] Error details:', {
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

  const handleDeleteHistory = async () => {
    if (!deleteHistoryBeforeDate) {
      alert('Παρακαλώ επιλέξτε ημερομηνία');
      return;
    }

    const confirmed = window.confirm(
      `Είστε σίγουρος ότι θέλετε να διαγράψετε όλο το ιστορικό που δημιουργήθηκε πριν από ${deleteHistoryBeforeDate}?\n\nΑυτή η ενέργεια δεν μπορεί να αναιρεθεί!`
    );

    if (!confirmed) {
      return;
    }

    try {
      setLoading(true);
      console.log('[DatabaseCleanupTools] Starting to delete history before:', deleteHistoryBeforeDate);
      
      // Convert date to ISO string (date picker gives YYYY-MM-DD format)
      const deleteDate = new Date(deleteHistoryBeforeDate + 'T00:00:00.000Z').toISOString();
      console.log('[DatabaseCleanupTools] Converted date to ISO:', deleteDate);
      console.log('[DatabaseCleanupTools] Current date/time:', new Date().toISOString());

      // First, check how many records match the criteria
      console.log('[DatabaseCleanupTools] Checking how many history records match criteria before deletion...');
      const client = getSupabaseClient();
      const { count: matchingCount, error: countError } = await client
        .from('parking_history')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', deleteDate);
      
      const matchingCountValue = matchingCount || 0;
      console.log('[DatabaseCleanupTools] History records matching criteria (< ' + deleteDate + '):', matchingCountValue);
      console.log('[DatabaseCleanupTools] Count details:', {
        count: matchingCountValue,
        countError: countError ? {
          message: countError.message,
          code: countError.code,
          details: countError.details,
          hint: countError.hint
        } : null
      });

      if (matchingCountValue === 0) {
        console.log('[DatabaseCleanupTools] No history records found matching criteria. Showing alert to user.');
        alert(`Δεν βρέθηκαν εγγραφές στο ιστορικό που δημιουργήθηκαν πριν από ${deleteHistoryBeforeDate}.\n\nΑν αναμένατε να βρεθούν εγγραφές, ελέγξτε:\n1. Αν η ημερομηνία είναι σωστή\n2. Αν υπάρχουν εγγραφές με created_at πριν από αυτή την ημερομηνία\n\nΤρέχουσα ημερομηνία: ${new Date().toLocaleDateString('el-GR')}\nΗμερομηνία διαγραφής: ${deleteDate}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
        setLoading(false);
        return;
      }

      console.log('[DatabaseCleanupTools] Found', matchingCountValue, 'history records to delete. Proceeding with deletion...');
      console.log('[DatabaseCleanupTools] Using client:', supabaseAdmin ? 'admin (service_role - bypasses RLS)' : 'anon (may be blocked by RLS)');
      
      const { data, error } = await client
        .from('parking_history')
        .delete()
        .lt('created_at', deleteDate)
        .select();

      const deletedCount = data?.length || 0;
      console.log('[DatabaseCleanupTools] Delete history result:', {
        deletedCount: deletedCount,
        expectedCount: matchingCountValue,
        match: deletedCount === matchingCountValue ? '✅ Match' : '⚠️ Mismatch',
        error: error ? {
          message: error.message,
          code: error.code,
          details: error.details,
          hint: error.hint
        } : null
      });

      if (error) {
        console.error('[DatabaseCleanupTools] Delete history error:', error);
        throw error;
      }

      console.log('[DatabaseCleanupTools] Successfully deleted', deletedCount, 'out of', matchingCountValue, 'expected history records');
      alert(`Διαγράφηκαν ${deletedCount} από ${matchingCountValue} εγγραφές από το ιστορικό επιτυχώς!`);
      setDeleteHistoryBeforeDate('');
    } catch (error: any) {
      console.error('[DatabaseCleanupTools] Error deleting history:', error);
      console.error('[DatabaseCleanupTools] Error details:', {
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

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Εργαλεία Καθαρισμού Βάσης</h2>
        <p className="text-gray-600 mt-1">Εργαλεία για καθαρισμό και συντήρηση της βάσης δεδομένων</p>
      </div>

      <div className="space-y-6">
        {/* Delete Inactive Spots */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Διαγραφή Ανενεργών Θέσεων
              </h3>
              <p className="text-gray-600 text-sm">
                Διαγράφει όλες τις θέσεις που έχουν is_active = false
              </p>
            </div>
          </div>
          <button
            onClick={handleDeleteInactiveSpots}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Επεξεργασία...' : 'Διαγραφή Ανενεργών Θέσεων'}
          </button>
        </div>

        {/* Delete Old Spots */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Διαγραφή Παλιών Θέσεων
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Διαγράφει όλες τις θέσεις που δημιουργήθηκαν πριν από την επιλεγμένη ημερομηνία
              </p>
              <input
                type="date"
                value={deleteBeforeDate}
                onChange={(e) => setDeleteBeforeDate(e.target.value)}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleDeleteOldSpots}
            disabled={loading || !deleteBeforeDate}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Επεξεργασία...' : 'Διαγραφή Παλιών Θέσεων'}
          </button>
        </div>

        {/* Delete History */}
        <div className="border border-gray-200 rounded-lg p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Διαγραφή Ιστορικού
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Διαγράφει όλα τα αρχεία από το parking_history που δημιουργήθηκαν πριν από την επιλεγμένη ημερομηνία
              </p>
              <input
                type="date"
                value={deleteHistoryBeforeDate}
                onChange={(e) => setDeleteHistoryBeforeDate(e.target.value)}
                className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={handleDeleteHistory}
            disabled={loading || !deleteHistoryBeforeDate}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Επεξεργασία...' : 'Διαγραφή Ιστορικού'}
          </button>
        </div>

        {/* Warning */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h4 className="text-sm font-semibold text-yellow-800 mb-1">Προσοχή</h4>
              <p className="text-sm text-yellow-700">
                Όλες οι ενέργειες διαγραφής είναι μόνιμες και δεν μπορούν να αναιρεθούν. 
                Βεβαιωθείτε ότι έχετε επιλέξει σωστά τα δεδομένα προς διαγραφή.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

