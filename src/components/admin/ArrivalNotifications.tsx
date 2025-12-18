import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

export default function ArrivalNotifications() {
  const [notificationCount, setNotificationCount] = useState<number>(0);
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
      
      // Use destination_reached table (confirmed from database structure)
      let count = 0;
      
      try {
        // Query destination_reached table to count unique users
        const { data: destinationReached, error: destError } = await client
          .from('destination_reached')
          .select('user_id');
        
        if (destError) {
          console.error('[ArrivalNotifications] Error fetching destination_reached:', destError);
          throw destError;
        }
        
        if (destinationReached && destinationReached.length > 0) {
          // Count unique users
          const uniqueUsers = new Set(destinationReached.map((item: any) => item.user_id).filter(Boolean));
          count = uniqueUsers.size;
          console.log('[ArrivalNotifications] Found in destination_reached table:', count, 'unique users out of', destinationReached.length, 'total records');
        }
      } catch (e: any) {
        console.error('[ArrivalNotifications] Error with destination_reached table:', e);
        setError(`Σφάλμα κατά τη φόρτωση: ${e.message || 'Άγνωστο σφάλμα'}`);
        setLoading(false);
        return;
      }

      setNotificationCount(count);
      
      if (count === 0) {
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
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              {notificationCount.toLocaleString('el-GR')}
            </h3>
            <p className="text-xl text-gray-700 font-medium mb-1">Χρήστες</p>
            <p className="text-gray-600 text-sm">
              Έλαβαν την ειδοποίηση "Συγχαρητήρια, φτάσατε!" όταν έφτασαν στον προορισμό τους
            </p>
          </div>
          
          <div className="mt-6 pt-6 border-t border-green-200">
            <button
              onClick={loadNotificationCount}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              🔄 Ανανέωση
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

