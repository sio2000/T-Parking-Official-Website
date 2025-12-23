import { createClient } from '@supabase/supabase-js';
import { Handler } from '@netlify/functions';

const supabaseUrl = process.env.SUPABASE_URL || 'https://utuoppaqarwowecxxjqw.supabase.co';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  // Check if service role key is configured
  if (!supabaseServiceRoleKey) {
    console.error('[delete-account] Service role key not configured');
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server configuration error' }),
    };
  }

  try {
    const { userId, accessToken } = JSON.parse(event.body || '{}');

    if (!userId || !accessToken) {
      return {
        statusCode: 400,
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
        body: JSON.stringify({ error: 'Failed to delete auth account: ' + authDeleteError.message }),
      };
    }

    console.log('[delete-account] Account deleted successfully');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Account deleted successfully' }),
    };
  } catch (error: any) {
    console.error('[delete-account] Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal server error' }),
    };
  }
};

export { handler };

