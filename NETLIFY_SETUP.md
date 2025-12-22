# Netlify Setup Instructions

## Environment Variables στο Netlify

Για να λειτουργήσει το Admin Panel στο Netlify, πρέπει να προσθέσεις τα environment variables στο Netlify Dashboard.

### Οδηγίες:

1. **Άνοιξε το Netlify Dashboard**
   - Πήγαινε στο: https://app.netlify.com
   - Επέλεξε το site σου

2. **Πήγαινε στα Site Settings**
   - Στο μενού, πάτα "Site configuration"
   - Κάνε scroll down και πάτα "Environment variables"

3. **Πρόσθεσε τα Environment Variables**

   Πάτα "Add a variable" και πρόσθεσε τα παρακάτω:

   **VITE_ADMIN_PASSWORD**
   - Key: `VITE_ADMIN_PASSWORD`
   - Value: `Skatanafas14!` (ή όποιο password θέλεις)
   - Scopes: All scopes (ή Production, Deploy previews, Branch deploys)

   **VITE_SUPABASE_URL** (αν δεν είναι ήδη set)
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://utuoppaqarwowecxxjqw.supabase.co`

   **VITE_SUPABASE_ANON_KEY** (αν δεν είναι ήδη set)
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dW9wcGFxYXJ3b3dlY3h4anF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MzkxNzksImV4cCI6MjA1NDIxNTE3OX0.3mg3j-kEd09I4KgToi2c3afDxdBIG-tksaldKobc5RE`

   **VITE_SUPABASE_SERVICE_ROLE_KEY** (για admin operations)
   - Key: `VITE_SUPABASE_SERVICE_ROLE_KEY`
   - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dW9wcGFxYXJ3b3dlY3h4anF3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODYzOTE3OSwiZXhwIjoyMDU0MjE1MTc5fQ.826lqbJRHtPxEcSrEYGn4ZkhzaqLy4-8NdRe_G2z4wY`

   **VITE_GOOGLE_MAPS_API_KEY** (για το Map View)
   - Key: `VITE_GOOGLE_MAPS_API_KEY`
   - Value: `AIzaSyCfKoSVZ2oByjn2uHqt1kQb20-BcSymaKY`

4. **Redeploy το Site**
   - Μετά την προσθήκη των environment variables, πάτα "Trigger deploy" > "Clear cache and deploy site"
   - Ή πάτα "Deploys" > "Trigger deploy" > "Deploy site"

### ⚠️ ΣΗΜΑΝΤΙΚΟ:

- Τα environment variables στο Netlify πρέπει να ξεκινάνε με `VITE_` για να είναι διαθέσιμα στο frontend
- Μετά την προσθήκη/αλλαγή environment variables, πρέπει να κάνεις **redeploy** το site
- Το password δεν θα φαίνεται στον κώδικα - είναι ασφαλές!

### Troubleshooting:

Αν δεν λειτουργεί ακόμα:
1. Έλεγξε ότι τα environment variables είναι σωστά γραμμένα (case-sensitive)
2. Κάνε clear cache και redeploy
3. Ελέγξε τα logs στο Netlify Dashboard για errors
4. Άνοιξε το browser console και δες αν υπάρχουν errors

