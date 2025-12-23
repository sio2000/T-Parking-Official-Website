import { createClient } from '@supabase/supabase-js';
import { Handler } from '@netlify/functions';

// Support both VITE_ prefixed and non-prefixed env vars
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || 'https://utuoppaqarwowecxxjqw.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler: Handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  console.log('[delete-account] Function invoked');
  console.log('[delete-account] Has service role key:', !!supabaseServiceRoleKey);
  console.log('[delete-account] Supabase URL:', supabaseUrl);

  // Check if service role key is configured
  if (!supabaseServiceRoleKey || !supabaseServiceRoleKey.startsWith('eyJ')) {
    console.error('[delete-account] Service role key not configured or invalid');
    console.error('[delete-account] Key length:', supabaseServiceRoleKey?.length || 0);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Server configuration error - service role key missing' }),
    };
  }

  try {
    const { userId, accessToken } = JSON.parse(event.body || '{}');

    if (!userId || !accessToken) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing userId or accessToken' }),
      };
    }

    // Create admin client
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });

    // Verify the access token belongs to the user
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (userError || !userData.user || userData.user.id !== userId) {
      console.error('[delete-account] Token verification failed:', userError);
      return {
        statusCode: 401,
        headers,
        body: JSON.stringify({ error: 'Unauthorized' }),
      };
    }

    console.log('[delete-account] Starting deletion for user:', userId);

    // Delete user's parking spots
    await supabaseAdmin.from('parking_spots').delete().eq('user_id', userId);
    
    // Delete user's scores
    await supabaseAdmin.from('user_scores').delete().eq('user_id', userId);
    
    // Delete user's parking history
    await supabaseAdmin.from('parking_history').delete().eq('user_id', userId);
    
    // Delete user's notifications
    await supabaseAdmin.from('notifications').delete().eq('user_id', userId);
    
    // Delete user's settings
    await supabaseAdmin.from('user_settings').delete().eq('user_id', userId);

    // Delete user profile
    await supabaseAdmin.from('profiles').delete().eq('id', userId);

    // Delete user from Supabase Auth (permanent deletion)
    const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    
    if (authDeleteError) {
      console.error('[delete-account] Error deleting auth user:', authDeleteError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Failed to delete auth account: ' + authDeleteError.message }),
      };
    }

    console.log('[delete-account] Account deleted successfully');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: 'Account deleted successfully' }),
    };
  } catch (error: any) {
    console.error('[delete-account] Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};

export { handler };

