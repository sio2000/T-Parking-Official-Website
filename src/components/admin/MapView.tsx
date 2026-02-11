import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { supabaseAdmin } from '../../lib/supabaseAdmin';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Use admin client if available (bypasses RLS), otherwise fall back to regular client
const getSupabaseClient = () => supabaseAdmin || supabase;

// ⚠️ SECURITY: Google Maps API key should be set via VITE_GOOGLE_MAPS_API_KEY environment variable
// Get your API key from: https://console.cloud.google.com/apis/credentials
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

const mapContainerStyle = {
  width: '100%',
  height: '600px',
};

const defaultCenter = {
  lat: 37.9838, // Athens, Greece default
  lng: 23.7275,
};

interface ParkingSpot {
  id: string;
  latitude: number;
  longitude: number;
  user_email?: string;
  size?: string;
  is_active?: boolean;
  created_at?: string;
}

export default function MapView() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSize, setFilterSize] = useState<string>('all');
  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid'>('roadmap');

  useEffect(() => {
    loadSpots();
  }, []);

  const loadSpots = async () => {
    try {
      setLoading(true);
      console.log('[MapView] Loading spots...');
      
      const client = getSupabaseClient();
      
      const { data, error } = await client
        .from('parking_spots')
        .select('id, latitude, longitude, user_email, size, is_active, created_at')
        .not('latitude', 'is', null)
        .not('longitude', 'is', null);
      
      if (error) throw error;
      
      setSpots(data || []);
      
      // Calculate center from spots if available
      if (data && data.length > 0) {
        const avgLat = data.reduce((sum: number, s: any) => sum + s.latitude, 0) / data.length;
        const avgLng = data.reduce((sum: number, s: any) => sum + s.longitude, 0) / data.length;
        setMapCenter({ lat: avgLat, lng: avgLng });
      }
      
      console.log('[MapView] Loaded', data?.length || 0, 'spots');
    } catch (error: any) {
      console.error('[MapView] Error loading spots:', error);
      alert(`Σφάλμα κατά τη φόρτωση των spots:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSpot = async (spotId: string) => {
    const confirmed = window.confirm('Είστε σίγουρος ότι θέλετε να διαγράψετε αυτό το spot;');
    if (!confirmed) return;

    try {
      setLoading(true);
      const client = getSupabaseClient();
      
      const { error } = await client
        .from('parking_spots')
        .delete()
        .eq('id', spotId);
      
      if (error) throw error;
      
      alert('Το spot διαγράφηκε επιτυχώς!');
      setSelectedSpot(null);
      loadSpots();
    } catch (error: any) {
      console.error('[MapView] Error deleting spot:', error);
      alert(`Σφάλμα κατά τη διαγραφή:\n\n${error.message || 'Άγνωστο σφάλμα'}`);
    } finally {
      setLoading(false);
    }
  };

  const getMarkerColor = (spot: ParkingSpot) => {
    if (!spot.is_active) return '#ef4444'; // Red for inactive
    return '#10b981'; // Green for active
  };

  const filteredSpots = spots.filter((spot) => {
    if (filterStatus === 'active' && !spot.is_active) return false;
    if (filterStatus === 'inactive' && spot.is_active) return false;
    if (filterSize !== 'all' && spot.size !== filterSize) return false;
    return true;
  });

  const spotsInView = filteredSpots.length;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Χάρτης Spots</h2>
          <p className="text-gray-600">Διαδραστικός χάρτης με όλα τα parking spots</p>
        </div>
        <button
          onClick={loadSpots}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Φόρτωση...' : 'Ανανέωση'}
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Κατάσταση</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Όλα</option>
              <option value="active">Ενεργές</option>
              <option value="inactive">Ανενεργές</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Μέγεθος</label>
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Όλα</option>
              <option value="small">Μικρή</option>
              <option value="medium">Μεσαία</option>
              <option value="large">Μεγάλη</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Τύπος Χάρτη</label>
            <select
              value={mapType}
              onChange={(e) => setMapType(e.target.value as any)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="roadmap">Roadmap</option>
              <option value="satellite">Satellite</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              onClick={() => {
                if (filteredSpots.length > 0) {
                  const avgLat = filteredSpots.reduce((sum, s) => sum + s.latitude, 0) / filteredSpots.length;
                  const avgLng = filteredSpots.reduce((sum, s) => sum + s.longitude, 0) / filteredSpots.length;
                  setMapCenter({ lat: avgLat, lng: avgLng });
                }
              }}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Center on Spots
            </button>
          </div>
        </div>
      </div>

      {/* Statistics Overlay */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-gray-600">Spots στον Χάρτη: </span>
            <span className="font-bold text-gray-900">{spotsInView}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600">Σύνολο: </span>
            <span className="font-bold text-gray-900">{spots.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Ενεργές</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-600 rounded-full"></div>
            <span className="text-sm text-gray-600">Ανενεργές</span>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loading && spots.length === 0 ? (
          <div className="text-center py-8 text-gray-600">Φόρτωση χάρτη...</div>
        ) : (
          <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={mapCenter}
              zoom={12}
              mapTypeId={mapType}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: true,
                fullscreenControl: true,
              }}
            >
              {filteredSpots.map((spot) => (
                <Marker
                  key={spot.id}
                  position={{ lat: spot.latitude, lng: spot.longitude }}
                  onClick={() => setSelectedSpot(spot)}
                  icon={{
                    path: window.google?.maps?.SymbolPath?.CIRCLE || '',
                    scale: 8,
                    fillColor: getMarkerColor(spot),
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }}
                />
              ))}

              {selectedSpot && (
                <InfoWindow
                  position={{ lat: selectedSpot.latitude, lng: selectedSpot.longitude }}
                  onCloseClick={() => setSelectedSpot(null)}
                >
                  <div className="p-2">
                    <h3 className="font-bold text-gray-900 mb-2">Spot Details</h3>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>ID:</strong> {selectedSpot.id.substring(0, 8)}...
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Email:</strong> {selectedSpot.user_email || '-'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Μέγεθος:</strong> {selectedSpot.size || '-'}
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      <strong>Κατάσταση:</strong>{' '}
                      <span className={selectedSpot.is_active ? 'text-green-600' : 'text-red-600'}>
                        {selectedSpot.is_active ? 'Ενεργή' : 'Ανενεργή'}
                      </span>
                    </p>
                    <button
                      onClick={() => handleDeleteSpot(selectedSpot.id)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                    >
                      Διαγραφή
                    </button>
                  </div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </div>
  );
}

