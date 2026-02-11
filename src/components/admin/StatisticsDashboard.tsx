import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface Statistics {
  totalSpots: number;
  activeSpots: number;
  inactiveSpots: number;
  totalUsers: number;
  totalReservations: number;
}

export default function StatisticsDashboard() {
  const [stats, setStats] = useState<Statistics>({
    totalSpots: 0,
    activeSpots: 0,
    inactiveSpots: 0,
    totalUsers: 0,
    totalReservations: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStatistics();
  }, []);

  const loadStatistics = async () => {
    try {
      setLoading(true);
      console.log('[StatisticsDashboard] Starting to load statistics...');

      const client = getSupabaseClient();
      
      // Fetch all statistics in parallel
      console.log('[StatisticsDashboard] Fetching parking_spots (total)...');
      const totalSpotsQuery = client.from('parking_spots').select('*', { count: 'exact', head: true });
      const totalSpotsResult = await totalSpotsQuery;
      console.log('[StatisticsDashboard] Total spots result:', { 
        count: totalSpotsResult.count, 
        error: totalSpotsResult.error,
        data: totalSpotsResult.data 
      });

      // Load spot expiration time from settings (default 6 minutes)
      let spotExpirationMinutes = 6; // default
      try {
        const storedSettings = localStorage.getItem('admin_settings');
        if (storedSettings) {
          const settings = JSON.parse(storedSettings);
          if (settings.spotExpirationTime) {
            spotExpirationMinutes = settings.spotExpirationTime;
          }
        }
      } catch (err) {
        console.warn('[StatisticsDashboard] Could not load settings, using default expiration time:', err);
      }
      
      console.log('[StatisticsDashboard] Using spot expiration time:', spotExpirationMinutes, 'minutes');
      
      // Calculate expiration threshold: spots created before this time are inactive
      const now = new Date();
      const expirationThreshold = new Date(now.getTime() - (spotExpirationMinutes * 60 * 1000));
      console.log('[StatisticsDashboard] Current time:', now.toISOString());
      console.log('[StatisticsDashboard] Expiration threshold (spots created after this are active):', expirationThreshold.toISOString());

      // Fetch all spots with created_at to calculate active/inactive based on expiration
      console.log('[StatisticsDashboard] Fetching parking_spots (with created_at for expiration check)...');
      const { data: allSpots, error: allSpotsError } = await client
        .from('parking_spots')
        .select('id, created_at');
      
      if (allSpotsError) {
        console.error('[StatisticsDashboard] Error fetching spots for expiration check:', allSpotsError);
        throw new Error(`Parking Spots: ${allSpotsError.message || allSpotsError.code || 'Unknown error'}`);
      }

      // Calculate active/inactive based on expiration time
      let activeCount = 0;
      let inactiveCount = 0;
      
      if (allSpots && allSpots.length > 0) {
        allSpots.forEach((spot: any) => {
          if (spot.created_at) {
            const spotCreatedAt = new Date(spot.created_at);
            // Spot is active if created_at + expirationMinutes > now
            // Which means: created_at > (now - expirationMinutes)
            if (spotCreatedAt > expirationThreshold) {
              activeCount++;
            } else {
              inactiveCount++;
            }
          } else {
            // If no created_at, count as inactive
            inactiveCount++;
          }
        });
      }
      
      console.log('[StatisticsDashboard] Active/Inactive calculation:', {
        totalSpots: allSpots?.length || 0,
        activeCount,
        inactiveCount,
        expirationMinutes: spotExpirationMinutes
      });

      const activeSpotsResult = { count: activeCount, error: null };
      const inactiveSpotsResult = { count: inactiveCount, error: null };

      // Try to get users count - first try profiles, then try to count from parking_spots unique user_ids
      console.log('[StatisticsDashboard] Fetching profiles...');
      let totalUsersResult: any;
      try {
        const profilesQuery = client.from('profiles').select('*', { count: 'exact', head: true });
        totalUsersResult = await profilesQuery;
        console.log('[StatisticsDashboard] Profiles result:', { 
          count: totalUsersResult.count, 
          error: totalUsersResult.error 
        });

        // If profiles is empty but we have parking_spots, count unique user_ids from parking_spots
        if ((totalUsersResult.count === 0 || totalUsersResult.error) && totalSpotsResult.count && totalSpotsResult.count > 0) {
          console.log('[StatisticsDashboard] Profiles is empty/error, trying to count unique users from parking_spots...');
          console.log('[StatisticsDashboard] Fetching user_ids from parking_spots (this may take a moment for large datasets)...');
          // Get all user_ids and count unique ones
          // Note: For very large datasets, this might be slow. Consider using a database view or function for better performance.
          const { data: allSpots, error: spotsError } = await client
            .from('parking_spots')
            .select('user_id');
          
          if (spotsError) {
            console.error('[StatisticsDashboard] Error fetching user_ids:', spotsError);
            totalUsersResult = { count: 0, error: spotsError };
          } else if (allSpots && allSpots.length > 0) {
            const uniqueUserIds = new Set(allSpots.map((spot: any) => spot.user_id).filter((id: any) => id && id !== null && id !== ''));
            totalUsersResult = { count: uniqueUserIds.size, error: null };
            console.log('[StatisticsDashboard] Counted unique users from parking_spots:', {
              uniqueUsers: uniqueUserIds.size,
              totalSpots: allSpots.length
            });
          }
        }
      } catch (err: any) {
        console.error('[StatisticsDashboard] Error fetching users:', err);
        // Fallback: try to count unique user_ids from parking_spots
        try {
          console.log('[StatisticsDashboard] Fallback: Fetching user_ids from parking_spots...');
          const { data: allSpots, error: spotsError } = await client
            .from('parking_spots')
            .select('user_id');
          
          if (spotsError) {
            console.error('[StatisticsDashboard] Fallback error fetching user_ids:', spotsError);
            totalUsersResult = { count: 0, error: spotsError };
          } else if (allSpots && allSpots.length > 0) {
            const uniqueUserIds = new Set(allSpots.map((spot: any) => spot.user_id).filter((id: any) => id && id !== null && id !== ''));
            totalUsersResult = { count: uniqueUserIds.size, error: null };
            console.log('[StatisticsDashboard] Fallback: Counted unique users from parking_spots:', {
              uniqueUsers: uniqueUserIds.size,
              totalSpots: allSpots.length
            });
          } else {
            totalUsersResult = { count: 0, error: null };
          }
        } catch (fallbackErr: any) {
          console.error('[StatisticsDashboard] Fallback exception:', fallbackErr);
          totalUsersResult = { count: 0, error: fallbackErr };
        }
      }
      
      console.log('[StatisticsDashboard] Final users result:', { 
        count: totalUsersResult?.count || 0, 
        error: totalUsersResult?.error 
      });

      // Count reservations from user_reservation_stock table
      console.log('[StatisticsDashboard] Fetching user_reservation_stock...');
      const totalReservationsQuery = client.from('user_reservation_stock').select('*', { count: 'exact', head: true });
      const totalReservationsResult = await totalReservationsQuery;
      console.log('[StatisticsDashboard] Total reservations result:', { 
        count: totalReservationsResult.count, 
        error: totalReservationsResult.error 
      });
      
      // Fallback to reserved_spots if user_reservation_stock is empty or has error
      if ((totalReservationsResult.count === 0 || totalReservationsResult.error) && !totalReservationsResult.count) {
        console.log('[StatisticsDashboard] Trying fallback to reserved_spots...');
        const fallbackQuery = client.from('reserved_spots').select('*', { count: 'exact', head: true });
        const fallbackResult = await fallbackQuery;
        if (fallbackResult.count && fallbackResult.count > 0) {
          console.log('[StatisticsDashboard] Using reserved_spots fallback:', fallbackResult.count);
          totalReservationsResult.count = fallbackResult.count;
          totalReservationsResult.error = fallbackResult.error;
        }
      }

      // Check for errors
      if (totalSpotsResult.error) {
        console.error('[StatisticsDashboard] Error in totalSpots:', totalSpotsResult.error);
        throw new Error(`Parking Spots: ${totalSpotsResult.error.message || totalSpotsResult.error.code || 'Unknown error'}`);
      }
      // Don't throw error for users if we have a fallback count
      if (totalUsersResult?.error && !totalUsersResult?.count) {
        console.warn('[StatisticsDashboard] Warning in totalUsers (non-fatal):', totalUsersResult.error);
        // Don't throw, just use 0
        totalUsersResult = { count: 0, error: null };
      }
      if (totalReservationsResult.error) {
        console.error('[StatisticsDashboard] Error in totalReservations:', totalReservationsResult.error);
        throw new Error(`Reservations: ${totalReservationsResult.error.message || totalReservationsResult.error.code || 'Unknown error'}`);
      }

      const newStats = {
        totalSpots: totalSpotsResult.count || 0,
        activeSpots: activeSpotsResult.count || 0,
        inactiveSpots: inactiveSpotsResult.count || 0,
        totalUsers: totalUsersResult?.count || 0,
        totalReservations: totalReservationsResult.count || 0,
      };

      console.log('[StatisticsDashboard] Setting stats:', newStats);
      setStats(newStats);
      console.log('[StatisticsDashboard] Statistics loaded successfully!');
    } catch (error: any) {
      console.error('[StatisticsDashboard] Error loading statistics:', error);
      console.error('[StatisticsDashboard] Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        stack: error.stack
      });
      alert(`Σφάλμα κατά τη φόρτωση των στατιστικών:\n\n${error.message || 'Άγνωστο σφάλμα'}\n\nΕλέγξτε την κονσόλα για περισσότερες λεπτομέρειες.`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Φόρτωση στατιστικών...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Συνολικές Θέσεις',
      value: stats.totalSpots,
      icon: '🅿️',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      description: undefined,
    },
    {
      title: 'Ενεργές Θέσεις',
      value: stats.activeSpots,
      icon: '✅',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      description: 'Στον χάρτη αυτή τη στιγμή',
    },
    {
      title: 'Μη Ενεργές Θέσεις',
      value: stats.inactiveSpots,
      icon: '❌',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      description: 'Δεν εμφανίζονται πλέον',
    },
    {
      title: 'Συνολικοί Χρήστες',
      value: stats.totalUsers,
      icon: '👥',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      description: undefined,
    },
    {
      title: 'Κρατήσεις',
      value: stats.totalReservations,
      icon: '📅',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      description: undefined,
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Στατιστικά Dashboard</h2>
        <p className="text-gray-600 mt-1">Επισκόπηση των δεδομένων της εφαρμογής</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} rounded-xl p-6 shadow-sm border border-gray-200`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`text-4xl ${card.textColor}`}>{card.icon}</div>
            </div>
            <div className={`text-3xl font-bold ${card.textColor} mb-2`}>
              {card.value.toLocaleString('el-GR')}
            </div>
            <div className="text-gray-700 font-medium">{card.title}</div>
            {card.description && (
              <div className="text-xs text-gray-500 mt-1">{card.description}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={loadStatistics}
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

