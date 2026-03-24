import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

type FlaggedSuspiciousUser = {
  id: string;
  user_id: string;
  flagged_at: string;
  total_warnings: number;
  user_email: string | null;
};

export default function DatabaseCleanupTools() {
  const [loading, setLoading] = useState(false);
  const [deleteBeforeDate, setDeleteBeforeDate] = useState('');
  const [deleteHistoryBeforeDate, setDeleteHistoryBeforeDate] = useState('');

  const [flaggedUsers, setFlaggedUsers] = useState<FlaggedSuspiciousUser[]>([]);
  const [flaggedLoading, setFlaggedLoading] = useState(true);
  const [flaggedError, setFlaggedError] = useState<string | null>(null);
  const [removingId, setRemovingId] = useState<string | null>(null);

  const fetchFlaggedUsers = useCallback(async () => {
    try {
      setFlaggedLoading(true);
      setFlaggedError(null);
      const client = getSupabaseClient();
      const { data, error } = await client
        .from('flagged_suspicious_users')
        .select('id, user_id, flagged_at, total_warnings, user_email')
        .order('flagged_at', { ascending: false });

      if (error) throw error;
      setFlaggedUsers((data as FlaggedSuspiciousUser[]) || []);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Άγνωστο σφάλμα';
      setFlaggedError(msg);
      setFlaggedUsers([]);
    } finally {
      setFlaggedLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFlaggedUsers();
  }, [fetchFlaggedUsers]);

  const handleRemoveFromFlaggedList = async (row: FlaggedSuspiciousUser) => {
    const label = row.user_email || row.user_id;
    const confirmed = window.confirm(
      `Αφαίρεση από τη λίστα επιτήρησης;\n\n${label}\n\n(Δεν διαγράφεται ο λογαριασμός· μόνο η εγγραφή flagged_suspicious_users. Ban από Supabase Auth αν χρειάζεται.)`
    );
    if (!confirmed) return;

    try {
      setRemovingId(row.id);
      const client = getSupabaseClient();
      const { error } = await client.from('flagged_suspicious_users').delete().eq('id', row.id);
      if (error) throw error;
      await fetchFlaggedUsers();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Σφάλμα';
      alert(`Αποτυχία: ${msg}`);
    } finally {
      setRemovingId(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      /* ignore */
    }
  };

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
        {/* Χρήστες προς έλεγχο / ban (ύποπτη δραστηριότητα) */}
        <div className="rounded-xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/80 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-amber-200/80 bg-white/60 backdrop-blur-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl" aria-hidden>
                  ⚠️
                </span>
                <h3 className="text-lg font-semibold text-gray-900">
                  Ύποπτη δραστηριότητα — έλεγχος / ban
                </h3>
                {!flaggedLoading && (
                  <span className="inline-flex items-center rounded-full bg-amber-600/15 text-amber-900 text-xs font-semibold px-2.5 py-0.5">
                    {flaggedUsers.length}{' '}
                    {flaggedUsers.length === 1 ? 'χρήστης' : 'χρήστες'}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1 max-w-3xl">
                Χρήστες στον πίνακα <code className="text-xs bg-amber-100/80 px-1 rounded">flagged_suspicious_users</code> (3+
                προειδοποιήσεις από <code className="text-xs bg-amber-100/80 px-1 rounded">suspicious_unpark_warnings</code>).
                Για οριστικό ban χρησιμοποίησε το Supabase Auth ή τις ροές σας· εδώ βλέπεις τη λίστα review.
              </p>
            </div>
            <button
              type="button"
              onClick={() => fetchFlaggedUsers()}
              disabled={flaggedLoading}
              className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-amber-300 text-amber-900 text-sm font-medium hover:bg-amber-50 disabled:opacity-50 transition-colors"
            >
              <svg
                className={`w-4 h-4 ${flaggedLoading ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Ανανέωση
            </button>
          </div>

          <div className="p-5">
            {!supabaseAdmin && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">
                Χωρίς <code className="text-xs">VITE_SUPABASE_SERVICE_ROLE_KEY</code> το admin μπορεί να μην βλέπει αυτόν τον
                πίνακα λόγω RLS. Βάλε service role στο <code className="text-xs">.env</code> και ξανάνοιξε το dev server.
              </div>
            )}

            {flaggedError && (
              <div className="mb-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3">
                <strong className="font-semibold">Σφάλμα φόρτωσης:</strong> {flaggedError}
              </div>
            )}

            {flaggedLoading ? (
              <div className="flex items-center justify-center py-16 text-gray-500 text-sm">
                Φόρτωση λίστας…
              </div>
            ) : flaggedUsers.length === 0 ? (
              <div className="text-center py-14 px-4 rounded-lg border border-dashed border-amber-300/60 bg-white/50">
                <p className="text-gray-700 font-medium">Δεν υπάρχουν χρήστες στη λίστα αυτή τη στιγμή</p>
                <p className="text-sm text-gray-500 mt-2">
                  Όταν κάποιος φτάσει 3+ καταγεγραμμένες προειδοποιήσεις, εμφανίζεται αυτόματα εδώ.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-amber-200/80 bg-white shadow-inner">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-amber-100/50 text-left text-xs font-semibold uppercase tracking-wide text-amber-950/80">
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Προειδοποιήσεις</th>
                      <th className="px-4 py-3">Σημειώθηκε</th>
                      <th className="px-4 py-3">User ID</th>
                      <th className="px-4 py-3 w-40 text-right">Ενέργειες</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {flaggedUsers.map((row) => (
                      <tr key={row.id} className="hover:bg-amber-50/40 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">
                          {row.user_email || (
                            <span className="text-gray-400 italic">— χωρίς email —</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center rounded-md bg-red-100 text-red-800 font-semibold px-2 py-0.5 tabular-nums">
                            {row.total_warnings}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                          {new Date(row.flagged_at).toLocaleString('el-GR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 max-w-[14rem]">
                            <code className="text-xs text-gray-600 truncate block" title={row.user_id}>
                              {row.user_id}
                            </code>
                            <button
                              type="button"
                              onClick={() => copyToClipboard(row.user_id)}
                              className="shrink-0 text-amber-700 hover:text-amber-900 text-xs font-medium underline"
                            >
                              Αντιγραφή
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveFromFlaggedList(row)}
                            disabled={removingId === row.id || loading}
                            className="text-xs font-medium text-gray-600 hover:text-red-700 disabled:opacity-50"
                          >
                            {removingId === row.id ? '…' : 'Αφαίρεση από λίστα'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

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

