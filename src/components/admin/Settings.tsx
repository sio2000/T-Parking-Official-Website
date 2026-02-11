import { useState, useEffect } from 'react';

interface AppSettings {
  appName: string;
  maintenanceMode: boolean;
  spotExpirationTime: number;
  friendsPriorityDuration: number;
  enablePushNotifications: boolean;
  notificationSound: boolean;
  emailNotifications: boolean;
  sessionTimeout: number;
  autoCleanup: boolean;
  dataRetentionPeriod: number;
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
}

const defaultSettings: AppSettings = {
  appName: 'T-Parking',
  maintenanceMode: false,
  spotExpirationTime: 6,
  friendsPriorityDuration: 15,
  enablePushNotifications: true,
  notificationSound: true,
  emailNotifications: true,
  sessionTimeout: 60,
  autoCleanup: false,
  dataRetentionPeriod: 90,
  autoBackup: false,
  backupFrequency: 'daily',
};

export default function Settings() {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = () => {
    const stored = localStorage.getItem('admin_settings');
    if (stored) {
      try {
        setSettings({ ...defaultSettings, ...JSON.parse(stored) });
      } catch (error) {
        console.error('[Settings] Error loading settings:', error);
      }
    }
  };

  const saveSettings = () => {
    try {
      setLoading(true);
      localStorage.setItem('admin_settings', JSON.stringify(settings));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      alert('Οι ρυθμίσεις αποθηκεύτηκαν επιτυχώς!');
    } catch (error) {
      console.error('[Settings] Error saving settings:', error);
      alert('Σφάλμα κατά την αποθήκευση των ρυθμίσεων');
    } finally {
      setLoading(false);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Είστε σίγουρος ότι θέλετε να επαναφέρετε τις ρυθμίσεις στις προεπιλεγμένες;')) {
      setSettings(defaultSettings);
      localStorage.removeItem('admin_settings');
      alert('Οι ρυθμίσεις επαναφέρθηκαν στις προεπιλεγμένες!');
    }
  };

  const exportSettings = () => {
    const json = JSON.stringify(settings, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin_settings_${new Date().toISOString()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ρυθμίσεις</h2>
          <p className="text-gray-600">Ρυθμίσεις της εφαρμογής</p>
        </div>
        {saved && <span className="text-green-600 font-semibold">✓ Αποθηκεύτηκε!</span>}
      </div>

      {/* Application Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ρυθμίσεις Εφαρμογής</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Όνομα Εφαρμογής</label>
            <input
              type="text"
              value={settings.appName}
              onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Spot Expiration Time (λεπτά)
            </label>
            <input
              type="number"
              value={settings.spotExpirationTime}
              onChange={(e) => setSettings({ ...settings, spotExpirationTime: parseInt(e.target.value) || 6 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Friends Priority Duration (δευτερόλεπτα)
            </label>
            <input
              type="number"
              value={settings.friendsPriorityDuration}
              onChange={(e) => setSettings({ ...settings, friendsPriorityDuration: parseInt(e.target.value) || 15 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="maintenanceMode"
              checked={settings.maintenanceMode}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
              Maintenance Mode (Λειτουργία Συντήρησης)
            </label>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ρυθμίσεις Ειδοποιήσεων</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.enablePushNotifications}
              onChange={(e) => setSettings({ ...settings, enablePushNotifications: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Enable Push Notifications</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notificationSound}
              onChange={(e) => setSettings({ ...settings, notificationSound: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Notification Sound</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.emailNotifications}
              onChange={(e) => setSettings({ ...settings, emailNotifications: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm font-medium text-gray-700">Email Notifications</span>
          </label>
        </div>
      </div>

      {/* Security Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ρυθμίσεις Ασφαλείας</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Timeout (λεπτά)
            </label>
            <input
              type="number"
              value={settings.sessionTimeout}
              onChange={(e) => setSettings({ ...settings, sessionTimeout: parseInt(e.target.value) || 60 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Database Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ρυθμίσεις Βάσης Δεδομένων</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoCleanup"
              checked={settings.autoCleanup}
              onChange={(e) => setSettings({ ...settings, autoCleanup: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="autoCleanup" className="text-sm font-medium text-gray-700">
              Auto Cleanup
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Retention Period (ημέρες)
            </label>
            <input
              type="number"
              value={settings.dataRetentionPeriod}
              onChange={(e) => setSettings({ ...settings, dataRetentionPeriod: parseInt(e.target.value) || 90 })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Backup Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Ρυθμίσεις Backup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="autoBackup"
              checked={settings.autoBackup}
              onChange={(e) => setSettings({ ...settings, autoBackup: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="autoBackup" className="text-sm font-medium text-gray-700">
              Auto Backup
            </label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => setSettings({ ...settings, backupFrequency: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={saveSettings}
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-semibold"
          >
            {loading ? 'Αποθήκευση...' : 'Αποθήκευση'}
          </button>
          <button
            onClick={resetToDefaults}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Reset to Defaults
          </button>
          <button
            onClick={exportSettings}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Export Settings
          </button>
        </div>
      </div>
    </div>
  );
}

