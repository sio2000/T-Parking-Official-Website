import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

export default function DebugInfo() {
  const [debugInfo, setDebugInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    try {
      setLoading(true);
      console.log('[DebugInfo] Checking Supabase connection...');
      
      const info: any = {
        supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'Not configured',
        timestamp: new Date().toISOString(),
      };

      // Test each table
      const tables = ['parking_spots', 'profiles', 'reserved_spots', 'parking_history'];
      
      for (const table of tables) {
        try {
          console.log(`[DebugInfo] Testing table: ${table}`);
          const client = getSupabaseClient();
          const { data, error, count } = await client
            .from(table)
            .select('*', { count: 'exact', head: true })
            .limit(1);
          
          info[table] = {
            accessible: !error,
            count: count || 0,
            error: error ? {
              message: error.message,
              code: error.code,
              details: error.details,
              hint: error.hint
            } : null
          };
          
          console.log(`[DebugInfo] Table ${table}:`, info[table]);
        } catch (err: any) {
          info[table] = {
            accessible: false,
            error: {
              message: err.message,
              stack: err.stack
            }
          };
          console.error(`[DebugInfo] Error testing table ${table}:`, err);
        }
      }

      // Try to count unique users from parking_spots if profiles is empty
      if (info.profiles && (info.profiles.count === 0 || info.profiles.error)) {
        try {
          console.log('[DebugInfo] Profiles is empty, counting unique users from parking_spots...');
          const client = getSupabaseClient();
          const { data: allSpots } = await client
            .from('parking_spots')
            .select('user_id');
          
          if (allSpots && allSpots.length > 0) {
            const uniqueUserIds = new Set(allSpots.map((spot: any) => spot.user_id).filter((id: any) => id));
            info.profiles = {
              ...info.profiles,
              count: uniqueUserIds.size,
              note: 'Counted from unique user_ids in parking_spots (profiles table is empty)'
            };
            console.log('[DebugInfo] Unique users from parking_spots:', uniqueUserIds.size);
          }
        } catch (err: any) {
          console.error('[DebugInfo] Error counting unique users:', err);
        }
      }

      setDebugInfo(info);
      console.log('[DebugInfo] Connection check complete:', info);
    } catch (error: any) {
      console.error('[DebugInfo] Error checking connection:', error);
      setDebugInfo({
        error: error.message,
        stack: error.stack
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
        <p className="text-yellow-800">Ελέγχοντας σύνδεση...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold text-gray-900">Debug Information</h3>
        <button
          onClick={checkConnection}
          className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Ανανέωση
        </button>
      </div>
      <div className="text-xs font-mono bg-white p-3 rounded border border-gray-300 overflow-auto max-h-96">
        <pre>{JSON.stringify(debugInfo, null, 2)}</pre>
      </div>
    </div>
  );
}

