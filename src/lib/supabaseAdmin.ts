import { createClient } from '@supabase/supabase-js'

// ⚠️ SECURITY WARNING: Service role key bypasses all RLS policies!
// This should ONLY be used in secure admin contexts, NEVER expose to public client-side code.
// Get your service_role key from: Supabase Dashboard > Settings > API > service_role key (secret)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://utuoppaqarwowecxxjqw.supabase.co'
const supabaseServiceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ''

// Check if service_role key is set (valid JWT token starts with 'eyJ')
const hasServiceRoleKey = supabaseServiceRoleKey && 
  supabaseServiceRoleKey.trim() !== '' && 
  supabaseServiceRoleKey.startsWith('eyJ') // JWT tokens start with 'eyJ'

if (!hasServiceRoleKey) {
  console.warn('[Supabase Admin] ⚠️ Service role key not configured. Admin DELETE operations may fail due to RLS policies.')
  console.warn('[Supabase Admin] To enable admin operations, set VITE_SUPABASE_SERVICE_ROLE_KEY in your .env file')
}

// Create admin client with service_role key (bypasses RLS)
// Falls back to anon key if service_role is not configured
export const supabaseAdmin = hasServiceRoleKey
  ? createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null

console.log('[Supabase Admin] Admin client initialized:', {
  url: supabaseUrl,
  hasServiceRoleKey: hasServiceRoleKey,
  canBypassRLS: hasServiceRoleKey,
  timestamp: new Date().toISOString()
})

