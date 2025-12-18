# T-Parking Landing Page

Μια μοντέρνα, responsive landing page για την εφαρμογή T-Parking, χτισμένη με React και Tailwind CSS.

## Χαρακτηριστικά

- 🎨 Μοντέρνο UI/UX σχεδιασμό
- 📱 Πλήρως responsive
- ⚡️ Βελτιστοποιημένη απόδοση
- 🎭 Animations με Framer Motion
- 🎯 SEO-friendly
- 🌐 Υποστήριξη για Ελληνικά και Αγγλικά

## Προαπαιτούμενα

- Node.js (v14 ή νεότερη έκδοση)
- npm ή yarn

## Εγκατάσταση

1. Κλωνοποιήστε το repository:
```bash
git clone https://github.com/yourusername/t-parking.git
cd t-parking
```

2. Εγκαταστήστε τις εξαρτήσεις:
```bash
npm install
```

3. Δημιουργήστε το `.env` αρχείο με τα απαραίτητα credentials:
```bash
# Αντιγράψτε το .env.example και συμπληρώστε τις τιμές
cp .env.example .env
```

**⚠️ ΣΗΜΑΝΤΙΚΟ - Environment Variables:**
Πρέπει να ρυθμίσετε τα παρακάτω environment variables στο `.env` αρχείο:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Supabase Admin (Service Role Key) - ΠΟΛΥ ΕΥΑΙΣΘΗΤΟ!
# ⚠️ Αυτό το key bypasses όλες τις RLS πολιτικές - χρησιμοποιήστε το με προσοχή!
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Admin Panel Password
VITE_ADMIN_PASSWORD=your-secure-admin-password-here

# Google Maps API Key
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-api-key-here
```

4. Ξεκινήστε τον development server:
```bash
npm run dev
```

5. Ανοίξτε το [http://localhost:5173](http://localhost:5173) στον browser σας.

## Δομή Project

```
t-parking/
├── src/
│   ├── components/     # React components
│   ├── data/          # Mock data και σταθερές
│   ├── assets/        # Εικόνες και άλλα assets
│   ├── styles/        # Global styles
│   ├── App.tsx        # Main App component
│   └── main.tsx       # Entry point
├── public/            # Static files
├── index.html         # HTML template
└── package.json       # Project dependencies
```

## Scripts

- `npm run dev` - Ξεκινάει τον development server
- `npm run build` - Δημιουργεί production build
- `npm run preview` - Προεπισκόπηση του production build
- `npm run lint` - Ελέγχει για linting errors

## Τεχνολογίες

- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Vite

## Άδεια

MIT 