import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { format } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface ActivityLog {
  id: string;
  user_id?: string;
  user_email?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  details?: any;
  ip_address?: string;
  status: string;
  created_at: string;
}

export default function ActivityLogs() {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [filterAction, setFilterAction] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadLogs();
      }, 5000); // 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadLogs = async () => {
    try {
      setLoading(true);
      console.log('[ActivityLogs] Loading activity logs...');
      
      const client = getSupabaseClient();
      
      // Check if activity_logs table exists
      let query = client.from('activity_logs').select('*');
      
      if (dateFrom) {
        query = query.gte('created_at', new Date(dateFrom).toISOString());
      }
      if (dateTo) {
        query = query.lte('created_at', new Date(dateTo + 'T23:59:59').toISOString());
      }
      if (filterAction !== 'all') {
        query = query.eq('action', filterAction);
      }
      if (filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false }).limit(1000);
      
      if (error) {
        // Table might not exist - show message
        console.warn('[ActivityLogs] activity_logs table might not exist:', error);
        setLogs([]);
        return;
      }
      
      setLogs(data || []);
      console.log('[ActivityLogs] Loaded', data?.length || 0, 'logs');
    } catch (error: any) {
      console.error('[ActivityLogs] Error loading logs:', error);
      // Don't show alert if table doesn't exist
      if (!error.message?.includes('does not exist')) {
        alert(`Σφάλμα κατά τη φόρτωση των logs:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = async () => {
    if (!window.confirm('Είστε σίγουρος ότι θέλετε να διαγράψετε όλα τα logs;')) {
      return;
    }

    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      let query = client.from('activity_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (dateFrom) {
        query = query.gte('created_at', new Date(dateFrom).toISOString());
      }
      if (dateTo) {
        query = query.lte('created_at', new Date(dateTo + 'T23:59:59').toISOString());
      }
      
      const { error } = await query;
      
      if (error) throw error;
      
      alert('Τα logs διαγράφηκαν επιτυχώς!');
      loadLogs();
    } catch (error: any) {
      console.error('[ActivityLogs] Error clearing logs:', error);
      alert(`Σφάλμα κατά τη διαγραφή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportLogs = () => {
    const csv = [
      'Timestamp,User,Action,Table,Status,Details',
      ...filteredLogs.map((log) =>
        [
          format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
          log.user_email || log.user_id || 'System',
          log.action,
          log.table_name || '-',
          log.status,
          JSON.stringify(log.details || {}).replace(/,/g, ';'),
        ].join(',')
      ),
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity_logs_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredLogs = logs.filter((log) => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase();
      return (
        (log.user_email && log.user_email.toLowerCase().includes(search)) ||
        log.action.toLowerCase().includes(search) ||
        (log.table_name && log.table_name.toLowerCase().includes(search)) ||
        (log.details && JSON.stringify(log.details).toLowerCase().includes(search))
      );
    }
    return true;
  });

  const tableExists = logs.length > 0 || !loading;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Λογαρίσματα Δραστηριότητας</h2>
          <p className="text-gray-600">Ιστορικό ενεργειών και operations</p>
        </div>
        <div className="flex gap-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span className="text-sm text-gray-700">Auto-refresh (5s)</span>
          </label>
          <button
            onClick={loadLogs}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Φόρτωση...' : 'Ανανέωση'}
          </button>
        </div>
      </div>

      {!tableExists && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            ⚠️ Το activity_logs table δεν υπάρχει στη βάση δεδομένων. Για να ενεργοποιήσεις το logging,
            δημιούργησε το table με το SQL script που βρίσκεται στην documentation.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Από Ημερομηνία</label>
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Έως Ημερομηνία</label>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Όλα</option>
              <option value="create">Create</option>
              <option value="update">Update</option>
              <option value="delete">Delete</option>
              <option value="login">Login</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Όλα</option>
              <option value="success">Success</option>
              <option value="error">Error</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Αναζήτηση</label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Αναζήτηση..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              setDateFrom('');
              setDateTo('');
              setFilterAction('all');
              setFilterStatus('all');
              setSearchQuery('');
              loadLogs();
            }}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Καθαρισμός
          </button>
          <button
            onClick={loadLogs}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Εφαρμογή Φίλτρων
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex gap-4">
          <button
            onClick={exportLogs}
            disabled={filteredLogs.length === 0}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Export to CSV
          </button>
          <button
            onClick={clearLogs}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            Clear Logs
          </button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading && logs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Φόρτωση logs...</div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Δεν βρέθηκαν logs</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Timestamp</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Table</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(log.created_at), 'dd/MM/yyyy HH:mm:ss')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                      {log.user_email || log.user_id || 'System'}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{log.action}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{log.table_name || '-'}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          log.status === 'success'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 max-w-xs truncate">
                      {log.details ? JSON.stringify(log.details) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

