/**
 * VistaForge Waitlist Handler - Supabase Edge Function
 * 
 * This serverless function handles waitlist signups by:
 * 1. Validating and sanitizing input
 * 2. Inserting data into Supabase database
 * 3. Subscribing user to Mailchimp
 * 4. Sending notification to Slack
 * 
 * Required Environment Variables:
 * - SUPABASE_URL: Your Supabase project URL
 * - SUPABASE_SERVICE_ROLE_KEY: Service role key for database access
 * - MAILCHIMP_API_KEY: Mailchimp API key
 * - MAILCHIMP_LIST_ID: Target Mailchimp audience/list ID
 * - MAILCHIMP_SERVER_PREFIX: Server prefix (e.g., 'us1', 'us2')
 * - SLACK_WEBHOOK_URL: Slack incoming webhook URL
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Valid roles
const VALID_ROLES = [
  'realtor',
  'investor',
  'architect',
  'surveyor',
  'homebuyer',
  'homeowner',
  'lawyer',
  'other'
];

// Valid monthly listings options
const VALID_MONTHLY_LISTINGS = [
  '0 - 5',
  '5 - 10',
  '10 - 15',
  '20 - 40',
  '40+'
];

/**
 * Validates and sanitizes input data
 */
function validateInput(data) {
  const errors = [];
  
  // Validate email
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push('Invalid email address');
  }
  
  // Validate role
  if (!data.role) {
    errors.push('Role is required');
  } else if (!VALID_ROLES.includes(data.role.toLowerCase())) {
    errors.push('Invalid role');
  }
  
  // Validate monthly_listings (if provided)
  if (data.monthly_listings && !VALID_MONTHLY_LISTINGS.includes(data.monthly_listings)) {
    errors.push('Invalid monthly listings value');
  }
  
  return errors;
}

/**
 * Insert waitlist entry into Supabase
 */
async function insertToDatabase(supabase, data) {
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      email: data.email.toLowerCase().trim(),
      role: data.role?.toLowerCase() || null,
      company: data.company?.trim() || null,
      monthly_listings: data.monthly_listings || null,
      how_heard: data.how_heard?.trim() || null,
    }])
    .select()
    .single();
  
  if (error) {
    if (error.code === '23505') { // Unique violation
      throw new Error('Email already registered');
    }
    throw error;
  }
  
  return result;
}

/**
 * Subscribe user to Mailchimp
 */
async function subscribeToMailchimp(data) {
  const MAILCHIMP_API_KEY = Deno.env.get('MAILCHIMP_API_KEY');
  const MAILCHIMP_LIST_ID = Deno.env.get('MAILCHIMP_LIST_ID');
  const MAILCHIMP_SERVER_PREFIX = Deno.env.get('MAILCHIMP_SERVER_PREFIX') || 'us1';
  
  if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
    console.warn('Mailchimp credentials not configured, skipping subscription');
    return null;
  }
  
  const url = `https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`;
  
  const payload = {
    email_address: data.email.toLowerCase(),
    status: 'subscribed',
    merge_fields: {
      ROLE: data.role || '',
      COMPANY: data.company || '',
      LISTINGS: data.monthly_listings || 0,
    },
    tags: ['waitlist', 'vistaforge'],
  };
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const error = await response.json();
      console.error('Mailchimp error:', error);
      return null;
    }
    
    return await response.json();
  } catch (error) {
    console.error('Failed to subscribe to Mailchimp:', error);
    return null;
  }
}

/**
 * Send notification to Slack
 */
async function notifySlack(data) {
  const SLACK_WEBHOOK_URL = Deno.env.get('SLACK_WEBHOOK_URL');
  
  if (!SLACK_WEBHOOK_URL) {
    console.warn('Slack webhook not configured, skipping notification');
    return null;
  }
  
  const message = {
    text: '🎉 New Waitlist Signup!',
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: '🎉 New VistaForge Waitlist Signup',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*Email:*\n${data.email}`,
          },
          {
            type: 'mrkdwn',
            text: `*Role:*\n${data.role || 'Not specified'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Company:*\n${data.company || 'Not specified'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Monthly Listings:*\n${data.monthly_listings || 'Not specified'}`,
          },
          {
            type: 'mrkdwn',
            text: `*How Heard:*\n${data.how_heard || 'Not specified'}`,
          },
          {
            type: 'mrkdwn',
            text: `*Timestamp:*\n${new Date().toISOString()}`,
          },
        ],
      },
    ],
  };
  
  try {
    const response = await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    
    if (!response.ok) {
      console.error('Slack notification failed:', response.statusText);
      return null;
    }
    
    return true;
  } catch (error) {
    console.error('Failed to send Slack notification:', error);
    return null;
  }
}

/**
 * Main handler
 */
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Parse request body
    const data = await req.json();
    
    // Validate input
    const validationErrors = validateInput(data);
    if (validationErrors.length > 0) {
      return new Response(
        JSON.stringify({ error: validationErrors.join(', ') }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert to database
    const dbResult = await insertToDatabase(supabase, data);
    console.log('Database insert successful:', dbResult.id);
    
    // Subscribe to Mailchimp (non-blocking)
    subscribeToMailchimp(data).catch(err => 
      console.error('Mailchimp subscription failed:', err)
    );
    
    // Notify Slack (non-blocking)
    notifySlack(data).catch(err => 
      console.error('Slack notification failed:', err)
    );
    
    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        id: dbResult.id,
        message: 'Successfully joined the waitlist',
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
    
  } catch (error) {
    console.error('Error in waitlist handler:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An unexpected error occurred',
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
