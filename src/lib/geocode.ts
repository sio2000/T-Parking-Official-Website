/**
 * Reverse geocode: get city from lat/lng via Google Geocoding API
 */
const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || import.meta.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const cache = new Map<string, string>();

function cacheKey(lat: number, lng: number): string {
  return `${lat.toFixed(4)},${lng.toFixed(4)}`;
}

export async function getCityFromCoords(lat: number, lng: number): Promise<string> {
  const key = cacheKey(lat, lng);
  if (cache.has(key)) return cache.get(key)!;
  if (!API_KEY) return 'Άγνωστο';

  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}&language=el`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.status !== 'OK' || !data.results?.[0]) {
      cache.set(key, 'Άγνωστο');
      return 'Άγνωστο';
    }
    const comp = data.results[0].address_components;
    const locality = comp.find((c: { types: string[] }) => c.types.includes('locality'));
    const admin2 = comp.find((c: { types: string[] }) => c.types.includes('administrative_area_level_2'));
    const admin1 = comp.find((c: { types: string[] }) => c.types.includes('administrative_area_level_1'));
    const country = comp.find((c: { types: string[] }) => c.types.includes('country'));
    const city = locality?.long_name || admin2?.long_name || admin1?.long_name || 'Άγνωστο';
    const countryName = country?.long_name === 'Greece' ? 'Ελλάδα' : country?.long_name || '';
    const result = countryName ? `${city}, ${countryName}` : city;
    cache.set(key, result);
    return result;
  } catch {
    cache.set(key, 'Άγνωστο');
    return 'Άγνωστο';
  }
}
