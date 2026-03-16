/**
 * Extract πόλη/χώρα from address - ΕΞΑΙΡΕΙ ταχυδρομικούς κώδικες.
 * Handles: "Street, City 12345, Greece" | "Street, 12345 City" | "Street, City, Greece"
 */
export function extractCityFromAddress(address: string | null | undefined): string {
  if (!address || typeof address !== 'string') return 'Άγνωστο';
  const trimmed = address.trim();
  if (!trimmed) return 'Άγνωστο';

  const isPostalCode = (s: string): boolean => {
    if (!s) return false;
    const cleaned = s.replace(/\s/g, '');
    return /^\d{5}$/.test(cleaned) || /^\d{3}\s?\d{2}$/.test(s);
  };

  const countryMatch = trimmed.match(/\b(Ελλάδα|Greece|Ελλάς)\b/i);
  const country = countryMatch ? (countryMatch[1].toLowerCase().includes('greece') ? 'Greece' : 'Ελλάδα') : '';

  const parts = trimmed.split(',').map((p) => p.trim()).filter(Boolean);
  let city = '';

  for (let i = parts.length - 1; i >= 0; i--) {
    let p = parts[i];
    if (!p) continue;
    if (/Ελλάδα|Greece|Ελλάς/i.test(p)) continue;
    if (isPostalCode(p)) continue;
    if (/^\d+$/.test(p)) continue;

    // "City 12345" | "546 44 Θεσσαλονίκη" - πάρε πόλη (όχι αριθμούς/ταχυδρομικό)
    const tokens = p.split(/\s+/);
    for (let j = tokens.length - 1; j >= 0; j--) {
      const t = tokens[j];
      if (!/^\d+$/.test(t) && !isPostalCode(t) && t.length >= 2) {
        city = t;
        break;
      }
    }
    if (city) break;

    if (p.length >= 2 && !/^\d/.test(p)) {
      city = p;
      break;
    }
  }

  // Fallback: "546 44 Θεσσαλονίκη" - πάρε το τελευταίο token που δεν είναι αριθμός
  if (!city && parts.length > 0) {
    const lastPart = parts[parts.length - 1];
    const tokens = lastPart.split(/\s+/).filter(Boolean);
    for (let j = tokens.length - 1; j >= 0; j--) {
      if (!isPostalCode(tokens[j]) && !/^\d+$/.test(tokens[j]) && tokens[j].length >= 2) {
        city = tokens[j];
        break;
      }
    }
  }

  if (!city) city = 'Άγνωστο';
  return country ? `${city}, ${country}` : city;
}
