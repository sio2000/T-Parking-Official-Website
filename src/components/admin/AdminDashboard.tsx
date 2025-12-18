import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearAdminSession } from '../../lib/adminAuth';
import ParkingSpotsManagement from './ParkingSpotsManagement';
import StatisticsDashboard from './StatisticsDashboard';
import ReservedSpotsManagement from './ReservedSpotsManagement';
import DatabaseCleanupTools from './DatabaseCleanupTools';
import UsersManagement from './UsersManagement';
import AnalyticsDashboard from './AnalyticsDashboard';
import ExportData from './ExportData';
import Settings from './Settings';
import ArrivalNotifications from './ArrivalNotifications';

type AdminTab = 'dashboard' | 'parking-spots' | 'reservations' | 'cleanup' | 'users' | 'analytics' | 'export' | 'settings' | 'arrival-notifications';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate('/');
  };

  const tabs = [
    { id: 'dashboard' as AdminTab, label: 'Στατιστικά', icon: '📊' },
    { id: 'parking-spots' as AdminTab, label: 'Θέσεις Στάθμευσης', icon: '🅿️' },
    { id: 'reservations' as AdminTab, label: 'Κρατήσεις', icon: '📅' },
    { id: 'users' as AdminTab, label: 'Χρήστες', icon: '👥' },
    { id: 'analytics' as AdminTab, label: 'Αναλυτικά', icon: '📈' },
    { id: 'arrival-notifications' as AdminTab, label: 'Ειδοποιήσεις Άφιξης', icon: '🎉' },
    { id: 'export' as AdminTab, label: 'Εξαγωγή', icon: '📥' },
    { id: 'cleanup' as AdminTab, label: 'Καθαρισμός', icon: '🧹' },
    { id: 'settings' as AdminTab, label: 'Ρυθμίσεις', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Αποσύνδεση
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sidebar Navigation */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 bg-white rounded-lg shadow-sm p-2 border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {activeTab === 'dashboard' && <StatisticsDashboard />}
          {activeTab === 'parking-spots' && <ParkingSpotsManagement />}
          {activeTab === 'reservations' && <ReservedSpotsManagement />}
          {activeTab === 'users' && <UsersManagement />}
          {activeTab === 'analytics' && <AnalyticsDashboard />}
          {activeTab === 'arrival-notifications' && <ArrivalNotifications />}
          {activeTab === 'export' && <ExportData />}
          {activeTab === 'cleanup' && <DatabaseCleanupTools />}
          {activeTab === 'settings' && <Settings />}
        </div>
      </div>
    </div>
  );
}

