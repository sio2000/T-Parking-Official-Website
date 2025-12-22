import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

export default function ArrivalNotifications() {
  const [totalNotifications, setTotalNotifications] = useState<number>(0);
  const [uniqueUsers, setUniqueUsers] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotificationCount();
  }, []);

  const loadNotificationCount = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[ArrivalNotifications] Loading notification count...');
      
      const client = getSupabaseClient();
      
      // First, get the total count using count query (more efficient)
      const { count: totalCount, error: countError } = await client
        .from('destination_reached')
        .select('*', { count: 'exact', head: true });
      
      if (countError) {
        console.error('[ArrivalNotifications] Error fetching count:', countError);
        throw countError;
      }
      
      console.log('[ArrivalNotifications] Total count from destination_reached:', totalCount);
      setTotalNotifications(totalCount || 0);
      
      // Then get unique users
      const { data: destinationReached, error: destError } = await client
        .from('destination_reached')
        .select('user_id');
      
      if (destError) {
        console.error('[ArrivalNotifications] Error fetching destination_reached:', destError);
        throw destError;
      }
      
      if (destinationReached && destinationReached.length > 0) {
        // Count unique users
        const uniqueUserSet = new Set(destinationReached.map((item: any) => item.user_id).filter(Boolean));
        setUniqueUsers(uniqueUserSet.size);
        console.log('[ArrivalNotifications] Unique users:', uniqueUserSet.size, 'out of', destinationReached.length, 'total records');
      } else {
        setUniqueUsers(0);
        console.log('[ArrivalNotifications] No destination_reached records found');
      }
    } catch (err: any) {
      console.error('[ArrivalNotifications] Error loading notification count:', err);
      setError(`Σφάλμα κατά τη φόρτωση: ${err.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Ειδοποιήσεις Άφιξης</h2>
        <p className="text-gray-600 mt-1">Αριθμός χρηστών που έλαβαν την ειδοποίηση "Συγχαρητήρια, φτάσατε!"</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Φόρτωση...</span>
        </div>
      ) : error ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="text-yellow-800">{error}</span>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Κύρια κάρτα - Συνολικές Ειδοποιήσεις */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 shadow-lg">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 mb-2">
                {totalNotifications.toLocaleString('el-GR')}
              </h3>
              <p className="text-xl text-gray-700 font-medium mb-1">Συνολικές Ειδοποιήσεις Άφιξης</p>
              <p className="text-gray-600 text-sm">
                Φορές που εμφανίστηκε η ειδοποίηση "Συγχαρητήρια, φτάσατε!"
              </p>
            </div>
          </div>

          {/* Δεύτερη κάρτα - Μοναδικοί Χρήστες */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mr-4">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {uniqueUsers.toLocaleString('el-GR')}
                  </h3>
                  <p className="text-gray-600">Μοναδικοί Χρήστες</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">
                  Μέσος όρος ανά χρήστη
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {uniqueUsers > 0 ? (totalNotifications / uniqueUsers).toFixed(1) : '0'} αφίξεις
                </p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            <button
              onClick={loadNotificationCount}
              className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Ανανέωση
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

