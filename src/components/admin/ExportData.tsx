import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import * as XLSX from 'xlsx';
import { format } from 'date-fns';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

interface ExportOptions {
  parkingSpots: boolean;
  parkingHistory: boolean;
  users: boolean;
  reservations: boolean;
  userScores: boolean;
  statistics: boolean;
}

export default function ExportData() {
  const [loading, setLoading] = useState(false);
  const [exportFormat, setExportFormat] = useState<'csv' | 'json' | 'excel'>('csv');
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    parkingSpots: true,
    parkingHistory: false,
    users: false,
    reservations: false,
    userScores: false,
    statistics: false,
  });
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const downloadFile = (data: any[], filename: string, format: 'csv' | 'json' | 'excel') => {
    if (format === 'csv') {
      if (data.length === 0) {
        alert('Δεν υπάρχουν δεδομένα για εξαγωγή');
        return;
      }
      const headers = Object.keys(data[0]).join(',');
      const rows = data.map((row) =>
        Object.values(row)
          .map((val) => (val === null || val === undefined ? '' : String(val).replace(/,/g, ';')))
          .join(',')
      );
      const csv = [headers, ...rows].join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'excel') {
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Data');
      XLSX.writeFile(wb, filename);
    }
  };

  const exportParkingSpots = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      let query = client.from('parking_spots').select('*');
      
      if (dateFrom) {
        query = query.gte('created_at', new Date(dateFrom).toISOString());
      }
      if (dateTo) {
        query = query.lte('created_at', new Date(dateTo + 'T23:59:59').toISOString());
      }
      if (statusFilter === 'active') {
        query = query.eq('is_active', true);
      } else if (statusFilter === 'inactive') {
        query = query.eq('is_active', false);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const filename = `parking_spots_${format(new Date(), 'yyyy-MM-dd')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
      downloadFile(data || [], filename, exportFormat);
      
      alert(`Εξάχθηκαν ${data?.length || 0} parking spots επιτυχώς!`);
    } catch (error: any) {
      console.error('[ExportData] Error exporting parking spots:', error);
      alert(`Σφάλμα κατά την εξαγωγή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportParkingHistory = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      let query = client.from('parking_history').select('*');
      
      if (dateFrom) {
        query = query.gte('created_at', new Date(dateFrom).toISOString());
      }
      if (dateTo) {
        query = query.lte('created_at', new Date(dateTo + 'T23:59:59').toISOString());
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const filename = `parking_history_${format(new Date(), 'yyyy-MM-dd')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
      downloadFile(data || [], filename, exportFormat);
      
      alert(`Εξάχθηκαν ${data?.length || 0} parking history records επιτυχώς!`);
    } catch (error: any) {
      console.error('[ExportData] Error exporting parking history:', error);
      alert(`Σφάλμα κατά την εξαγωγή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportUsers = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      const { data, error } = await client
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const filename = `users_${format(new Date(), 'yyyy-MM-dd')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
      downloadFile(data || [], filename, exportFormat);
      
      alert(`Εξάχθηκαν ${data?.length || 0} users επιτυχώς!`);
    } catch (error: any) {
      console.error('[ExportData] Error exporting users:', error);
      alert(`Σφάλμα κατά την εξαγωγή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportReservations = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      const { data, error } = await client
        .from('reserved_spots')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      const filename = `reservations_${format(new Date(), 'yyyy-MM-dd')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
      downloadFile(data || [], filename, exportFormat);
      
      alert(`Εξάχθηκαν ${data?.length || 0} reservations επιτυχώς!`);
    } catch (error: any) {
      console.error('[ExportData] Error exporting reservations:', error);
      alert(`Σφάλμα κατά την εξαγωγή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportUserScores = async () => {
    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      const { data, error } = await client
        .from('user_scores')
        .select('*')
        .order('score', { ascending: false });
      
      if (error) throw error;
      
      const filename = `user_scores_${format(new Date(), 'yyyy-MM-dd')}.${exportFormat === 'excel' ? 'xlsx' : exportFormat}`;
      downloadFile(data || [], filename, exportFormat);
      
      alert(`Εξάχθηκαν ${data?.length || 0} user scores επιτυχώς!`);
    } catch (error: any) {
      console.error('[ExportData] Error exporting user scores:', error);
      alert(`Σφάλμα κατά την εξαγωγή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const exportAll = async () => {
    const exports = [];
    if (exportOptions.parkingSpots) exports.push(exportParkingSpots());
    if (exportOptions.parkingHistory) exports.push(exportParkingHistory());
    if (exportOptions.users) exports.push(exportUsers());
    if (exportOptions.reservations) exports.push(exportReservations());
    if (exportOptions.userScores) exports.push(exportUserScores());
    
    if (exports.length === 0) {
      alert('Παρακαλώ επιλέξτε τουλάχιστον ένα type δεδομένων για εξαγωγή');
      return;
    }
    
    try {
      setLoading(true);
      await Promise.all(exports);
    } catch (error) {
      console.error('[ExportData] Error in bulk export:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Εξαγωγή Δεδομένων</h2>
      <p className="text-gray-600 mb-6">Εξαγωγή δεδομένων σε CSV, JSON ή Excel format</p>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Επιλογή Δεδομένων</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exportOptions.parkingSpots}
              onChange={(e) => setExportOptions({ ...exportOptions, parkingSpots: e.target.checked })}
              className="rounded"
            />
            <span>Parking Spots</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exportOptions.parkingHistory}
              onChange={(e) => setExportOptions({ ...exportOptions, parkingHistory: e.target.checked })}
              className="rounded"
            />
            <span>Parking History</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exportOptions.users}
              onChange={(e) => setExportOptions({ ...exportOptions, users: e.target.checked })}
              className="rounded"
            />
            <span>Users</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exportOptions.reservations}
              onChange={(e) => setExportOptions({ ...exportOptions, reservations: e.target.checked })}
              className="rounded"
            />
            <span>Reservations</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={exportOptions.userScores}
              onChange={(e) => setExportOptions({ ...exportOptions, userScores: e.target.checked })}
              className="rounded"
            />
            <span>User Scores</span>
          </label>
        </div>
      </div>

      {/* Format Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Format</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="format"
              value="csv"
              checked={exportFormat === 'csv'}
              onChange={(e) => setExportFormat(e.target.value as 'csv')}
            />
            <span>CSV</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="format"
              value="json"
              checked={exportFormat === 'json'}
              onChange={(e) => setExportFormat(e.target.value as 'json')}
            />
            <span>JSON</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="format"
              value="excel"
              checked={exportFormat === 'excel'}
              onChange={(e) => setExportFormat(e.target.value as 'excel')}
            />
            <span>Excel (.xlsx)</span>
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Φίλτρα (για Parking Spots)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-2">Κατάσταση</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Όλα</option>
              <option value="active">Ενεργές</option>
              <option value="inactive">Ανενεργές</option>
            </select>
          </div>
        </div>
      </div>

      {/* Export Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          {exportOptions.parkingSpots && (
            <button
              onClick={exportParkingSpots}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Export Parking Spots
            </button>
          )}
          {exportOptions.parkingHistory && (
            <button
              onClick={exportParkingHistory}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Export Parking History
            </button>
          )}
          {exportOptions.users && (
            <button
              onClick={exportUsers}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Export Users
            </button>
          )}
          {exportOptions.reservations && (
            <button
              onClick={exportReservations}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Export Reservations
            </button>
          )}
          {exportOptions.userScores && (
            <button
              onClick={exportUserScores}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              Export User Scores
            </button>
          )}
          <button
            onClick={exportAll}
            disabled={loading}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 font-semibold"
          >
            {loading ? 'Εξαγωγή...' : 'Export Όλα (Bulk)'}
          </button>
        </div>
      </div>
    </div>
  );
}

