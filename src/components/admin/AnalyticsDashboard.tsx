import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format, subDays, startOfDay } from 'date-fns';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface AnalyticsData {
  spotsCreated: any[];
  activeVsInactive: any[];
  spotsBySize: any[];
  userGrowth: any[];
  topUsers: any[];
  spotsByHour: any[];
}

const COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(false);
  const [timePeriod, setTimePeriod] = useState<string>('week');
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    spotsCreated: [],
    activeVsInactive: [],
    spotsBySize: [],
    userGrowth: [],
    topUsers: [],
    spotsByHour: [],
  });
  const [metrics, setMetrics] = useState({
    totalSpotsCreated: 0,
    activeSpotsAverage: 0,
    newUsers: 0,
    reservationsMade: 0,
    averageScore: 0,
    mostActiveUser: '',
  });
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadAnalytics();
  }, [timePeriod]);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadAnalytics();
      }, 30000); // 30 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, timePeriod]);

  const getDateRange = () => {
    const now = new Date();
    switch (timePeriod) {
      case 'today':
        return { start: startOfDay(now), end: now };
      case 'week':
        return { start: subDays(now, 7), end: now };
      case 'month':
        return { start: subDays(now, 30), end: now };
      case '3months':
        return { start: subDays(now, 90), end: now };
      case 'year':
        return { start: subDays(now, 365), end: now };
      default:
        return { start: subDays(now, 7), end: now };
    }
  };

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      console.log('[AnalyticsDashboard] Loading analytics for period:', timePeriod);
      
      const client = getSupabaseClient();
      const { start, end } = getDateRange();
      
      // Fetch spots created over time from parking_spots (active spots)
      const { data: spots, error: spotsError } = await client
        .from('parking_spots')
        .select('created_at, is_active, size')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      if (spotsError) {
        console.warn('[AnalyticsDashboard] Error fetching parking_spots:', spotsError);
      }
      
      // Fetch deleted spots from parking_history (to include them in analytics)
      console.log('[AnalyticsDashboard] Fetching parking_history for deleted spots...');
      const { data: historySpots, error: historyError } = await client
        .from('parking_history')
        .select('created_at, size')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      if (historyError) {
        console.warn('[AnalyticsDashboard] Error fetching parking_history (non-fatal):', historyError);
      }
      
      // Combine spots from parking_spots and parking_history
      // Normalize history spots to match spots structure (is_active will be false for deleted spots)
      const normalizedHistorySpots = (historySpots || []).map((h: any) => ({
        created_at: h.created_at,
        is_active: false, // History spots are always inactive (deleted)
        size: h.size || 'unknown'
      }));
      
      // Combine all spots (active + deleted)
      const allSpotsCombined = [
        ...(spots || []),
        ...normalizedHistorySpots
      ];
      
      console.log('[AnalyticsDashboard] Combined spots:', {
        fromParkingSpots: (spots || []).length,
        fromHistory: (historySpots || []).length,
        total: allSpotsCombined.length
      });
      
      // Use combined spots for all calculations
      const spotsForAnalytics = allSpotsCombined;
      
      // Process spots created over time (using combined spots)
      const spotsByDate: Record<string, number> = {};
      spotsForAnalytics.forEach((spot: any) => {
        const date = format(new Date(spot.created_at), 'yyyy-MM-dd');
        spotsByDate[date] = (spotsByDate[date] || 0) + 1;
      });
      const spotsCreated = Object.entries(spotsByDate).map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM'),
        count,
      }));
      
      // Active vs Inactive - Calculate based on expiration time, not current is_active status
      // This ensures we count all spots created in the period, even if they've expired/deleted
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
        console.warn('[AnalyticsDashboard] Could not load settings, using default expiration time:', err);
      }
      
      const now = new Date();
      const expirationThreshold = new Date(now.getTime() - (spotExpirationMinutes * 60 * 1000));
      
      let activeCount = 0;
      let inactiveCount = 0;
      
      // Count all spots created in the period based on expiration (using combined spots)
      spotsForAnalytics.forEach((spot: any) => {
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
      
      console.log('[AnalyticsDashboard] Active vs Inactive calculation:', {
        totalSpots: spotsForAnalytics.length,
        activeCount,
        inactiveCount,
        expirationMinutes: spotExpirationMinutes,
        expirationThreshold: expirationThreshold.toISOString(),
        fromParkingSpots: (spots || []).length,
        fromHistory: (historySpots || []).length
      });
      
      const activeVsInactive = [
        { name: 'Ενεργές', value: activeCount },
        { name: 'Ανενεργές', value: inactiveCount },
      ];
      
      // Spots by size (using combined spots)
      const sizeCounts: Record<string, number> = {};
      spotsForAnalytics.forEach((spot: any) => {
        const size = spot.size || 'unknown';
        sizeCounts[size] = (sizeCounts[size] || 0) + 1;
      });
      const spotsBySize = Object.entries(sizeCounts).map(([name, value]) => ({
        name: name === 'small' ? 'Μικρή' : name === 'medium' ? 'Μεσαία' : name === 'large' ? 'Μεγάλη' : name,
        value,
      }));
      
      // User growth
      const { data: profiles, error: profilesError } = await client
        .from('profiles')
        .select('created_at')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString())
        .order('created_at', { ascending: true });
      
      const usersByDate: Record<string, number> = {};
      let cumulative = 0;
      (profiles || []).forEach((profile: any) => {
        const date = format(new Date(profile.created_at), 'yyyy-MM-dd');
        cumulative++;
        usersByDate[date] = cumulative;
      });
      const userGrowth = Object.entries(usersByDate).map(([date, count]) => ({
        date: format(new Date(date), 'dd/MM'),
        count,
      }));
      
      // Top users by score
      const { data: scores, error: scoresError } = await client
        .from('user_scores')
        .select('user_id, score')
        .order('score', { ascending: false })
        .limit(10);
      
      const topUsers = (scores || []).map((score: any) => ({
        name: score.user_id.substring(0, 8),
        score: score.score || 0,
      }));
      
      // Spots by hour (using combined spots)
      const hourCounts: Record<number, number> = {};
      spotsForAnalytics.forEach((spot: any) => {
        const hour = new Date(spot.created_at).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      });
      const spotsByHour = Array.from({ length: 24 }, (_, i) => ({
        hour: `${i}:00`,
        count: hourCounts[i] || 0,
      }));
      
      setAnalyticsData({
        spotsCreated,
        activeVsInactive,
        spotsBySize,
        userGrowth,
        topUsers,
        spotsByHour,
      });
      
      // Calculate metrics (using combined spots - already loaded above)
      // Note: allSpotsCombined is already filtered by date range, so we use it directly
      
      const { data: allUsers, error: allUsersError } = await client
        .from('profiles')
        .select('created_at')
        .gte('created_at', start.toISOString())
        .lte('created_at', end.toISOString());
      
      const { data: allScores, error: allScoresError } = await client
        .from('user_scores')
        .select('score');
      
      // Calculate active spots based on expiration time (using combined spots)
      let activeCountTotal = 0;
      if (spotsForAnalytics && spotsForAnalytics.length > 0) {
        spotsForAnalytics.forEach((spot: any) => {
          if (spot.created_at) {
            const spotCreatedAt = new Date(spot.created_at);
            if (spotCreatedAt > expirationThreshold) {
              activeCountTotal++;
            }
          }
        });
      }
      
      const days = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
      
      setMetrics({
        totalSpotsCreated: spotsForAnalytics.length,
        activeSpotsAverage: Math.round(activeCountTotal / days),
        newUsers: (allUsers || []).length,
        reservationsMade: 0, // Would need to fetch from reserved_spots
        averageScore: (allScores || []).length > 0
          ? Math.round((allScores || []).reduce((sum: number, s: any) => sum + (s.score || 0), 0) / (allScores || []).length)
          : 0,
        mostActiveUser: topUsers.length > 0 ? topUsers[0].name : '-',
      });
      
      console.log('[AnalyticsDashboard] Analytics loaded successfully');
    } catch (error: any) {
      console.error('[AnalyticsDashboard] Error loading analytics:', error);
      alert(`Σφάλμα κατά τη φόρτωση των αναλυτικών:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportToCSV = () => {
    // Simple CSV export of key metrics
    const csv = `Metric,Value
Total Spots Created,${metrics.totalSpotsCreated}
Active Spots Average,${metrics.activeSpotsAverage}
New Users,${metrics.newUsers}
Average Score,${metrics.averageScore}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Αναλυτικά & Reports</h2>
          <p className="text-gray-600">Στατιστικά και αναλύσεις για την εφαρμογή</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Auto-refresh (30s)</span>
          </label>
          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export CSV
          </button>
          <button
            onClick={loadAnalytics}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Φόρτωση...' : 'Ανανέωση'}
          </button>
        </div>
      </div>

      {/* Time Period Selector */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Χρονική Περίοδος</label>
        <select
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="today">Σήμερα</option>
          <option value="week">Εβδομάδα</option>
          <option value="month">Μήνας</option>
          <option value="3months">3 Μήνες</option>
          <option value="year">Έτος</option>
        </select>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Spots Δημιουργημένα</div>
          <div className="text-2xl font-bold text-gray-900">{metrics.totalSpotsCreated}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Μέσος Όρος Ενεργών</div>
          <div className="text-2xl font-bold text-blue-600">{metrics.activeSpotsAverage}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Νέοι Χρήστες</div>
          <div className="text-2xl font-bold text-green-600">{metrics.newUsers}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Κρατήσεις</div>
          <div className="text-2xl font-bold text-purple-600">{metrics.reservationsMade}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Μέσος Score</div>
          <div className="text-2xl font-bold text-yellow-600">{metrics.averageScore}</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="text-sm text-gray-600 mb-1">Πιο Ενεργός</div>
          <div className="text-lg font-bold text-indigo-600">{metrics.mostActiveUser}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Spots Created Over Time */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots Δημιουργημένα ανά Ημερομηνία</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.spotsCreated}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" name="Spots" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Active vs Inactive */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ενεργές vs Ανενεργές Spots</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.activeVsInactive}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => {
                    const name = props.name || '';
                    const percent = props.percent || 0;
                    return `${name}: ${(percent * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {analyticsData.activeVsInactive.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spots by Size */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots ανά Μέγεθος</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.spotsBySize}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#10b981" name="Πλήθος" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Αύξηση Χρηστών</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="#8b5cf6" name="Χρήστες" />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Top Users by Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top 10 Χρήστες ανά Score</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.topUsers} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#f59e0b" name="Score" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Spots by Hour */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spots ανά Ώρα Ημέρας</h3>
          {loading ? (
            <div className="text-center py-8 text-gray-600">Φόρτωση...</div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.spotsByHour}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#ef4444" name="Spots" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}

