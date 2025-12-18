import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://utuoppaqarwowecxxjqw.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0dW9wcGFxYXJ3b3dlY3h4anF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg2MzkxNzksImV4cCI6MjA1NDIxNTE3OX0.3mg3j-kEd09I4KgToi2c3afDxdBIG-tksaldKobc5RE'

// SERVICE_ROLE_KEY: For admin operations that need to bypass RLS policies
// To get this key: Supabase Dashboard > Settings > API > service_role key (secret)
// IMPORTANT: This key bypasses all RLS policies - use ONLY in admin panel, NEVER expose to client-side code in production!
// If you have the service_role key, uncomment the line below and add your key:
// const supabaseServiceRoleKey = 'YOUR_SERVICE_ROLE_KEY_HERE'

// Use service_role key if available (for admin operations), otherwise fall back to anon key
const supabaseKey = (typeof window !== 'undefined' && (window as any).__SUPABASE_SERVICE_ROLE_KEY__) 
  ? (window as any).__SUPABASE_SERVICE_ROLE_KEY__ 
  : supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseKey)

// Log which key type is being used
const keyType = supabaseKey === supabaseAnonKey ? 'anon' : 'service_role'
console.log('[Supabase] Client initialized:', {
  url: supabaseUrl,
  keyType: keyType,
  hasServiceRole: keyType === 'service_role',
  timestamp: new Date().toISOString(),
  note: keyType === 'anon' ? '⚠️ Using anon key - DELETE operations may be blocked by RLS policies' : '✅ Using service_role key - Admin operations enabled'
})

