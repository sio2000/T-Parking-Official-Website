import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

interface DiagnosticStatus {
  supabaseUrl: string;
  hasAnonKey: boolean;
  hasServiceRoleKey: boolean;
  profilesTableExists: boolean;
  canAccessProfiles: boolean;
  errorMessage?: string;
}

export default function DiagnosticsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [status, setStatus] = useState<DiagnosticStatus>({
    supabaseUrl: '',
    hasAnonKey: false,
    hasServiceRoleKey: false,
    profilesTableExists: false,
    canAccessProfiles: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      runDiagnostics();
    }
  }, [isOpen]);

  const runDiagnostics = async () => {
    setLoading(true);
    try {
      // Check environment
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'Not set';
      const hasAnonKey = !!import.meta.env.VITE_SUPABASE_ANON_KEY;
      const hasServiceRoleKey = !!import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;

      // Try to access profiles table
      let canAccessProfiles = false;
      try {
        const { error } = await supabase
          .from('profiles')
          .select('count')
          .limit(1);
        
        canAccessProfiles = !error;
      } catch (e) {
        // Table might not exist
      }

      setStatus({
        supabaseUrl,
        hasAnonKey,
        hasServiceRoleKey,
        profilesTableExists: true,
        canAccessProfiles,
      });
    } catch (error: any) {
      setStatus((prev) => ({
        ...prev,
        errorMessage: error.message,
      }));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">🔍 Διαγνωστικά Σύνδεσης</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ✕
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
              <p className="mt-2 text-gray-600">Έλεγχος σύνδεσης...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Supabase URL */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Supabase URL</p>
                    <p className="text-sm text-gray-600 mt-1">{status.supabaseUrl}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status.supabaseUrl !== 'Not set' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {status.supabaseUrl !== 'Not set' ? '✓ OK' : '✗ MISSING'}
                  </span>
                </div>
              </div>

              {/* Anon Key */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Anonymous Key (VITE_SUPABASE_ANON_KEY)</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {status.hasAnonKey ? '✓ Ορίστηκε στο .env' : '✗ Δεν ορίστηκε'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status.hasAnonKey ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {status.hasAnonKey ? '✓ OK' : '✗ MISSING'}
                  </span>
                </div>
              </div>

              {/* Service Role Key */}
              <div className="border rounded-lg p-4 bg-red-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Service Role Key (VITE_SUPABASE_SERVICE_ROLE_KEY)</p>
                    <p className="text-sm text-red-700 mt-1">
                      {status.hasServiceRoleKey 
                        ? '✓ Ορίστηκε - Admin queries θα δουλέψουν!' 
                        : '⚠️ ΔΕΝ ΟΡΊΣΤΗΚΕ - Add to .env for admin access'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status.hasServiceRoleKey ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {status.hasServiceRoleKey ? '✓ OK' : '⚠️ MISSING'}
                  </span>
                </div>
              </div>

              {/* Profiles Table Access */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-gray-900">Πρόσβαση στον πίνακα 'profiles'</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {status.canAccessProfiles 
                        ? '✓ Μπορώ να διαβάσω δεδομένα από profiles' 
                        : '✗ Αποτυχία σύνδεσης - RLS policies blocked or table missing'}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    status.canAccessProfiles ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {status.canAccessProfiles ? '✓ OK' : '✗ FAILED'}
                  </span>
                </div>
              </div>

              {/* Solution Guide */}
              <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded">
                <p className="font-semibold text-blue-900 mb-2">💡 ΛΎΣΗ:</p>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                  <li>Να σε πας στη Supabase Dashboard: <code className="bg-blue-100 px-2 py-1 rounded">https://app.supabase.com</code></li>
                  <li>Επιλέγω το T-Parking project</li>
                  <li>Πηγαίνω στο <strong>Settings → API</strong></li>
                  <li>Αντιγράφω το <strong>service_role</strong> key (το secret)</li>
                  <li>Ανοίγω το <code className="bg-blue-100 px-2 py-1 rounded">.env</code> αρχείο</li>
                  <li>Προσθέτω: <code className="bg-blue-100 px-2 py-1 rounded">VITE_SUPABASE_SERVICE_ROLE_KEY=eyJ...</code></li>
                  <li>Κάνω restart στον dev server: <code className="bg-blue-100 px-2 py-1 rounded">npm run dev</code></li>
                  <li>Κάνω refresh (F5) στον browser</li>
                </ol>
              </div>

              {status.errorMessage && (
                <div className="border border-red-300 bg-red-50 p-4 rounded">
                  <p className="font-semibold text-red-900">Σφάλμα:</p>
                  <p className="text-sm text-red-700 mt-1">{status.errorMessage}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={runDiagnostics}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              🔄 Δοκιμή ξανά
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Κλείσιμο
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
