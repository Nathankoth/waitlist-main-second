import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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
  '0–5 listings',
  '5–10 listings',
  '10–20 listings',
  '20–40 listings',
  '40+ listings'
];

/**
 * Validates and sanitizes input data
 */
function validateInput(data: any) {
  const errors: string[] = [];
  
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

export async function OPTIONS() {
  return new NextResponse(null, { 
    status: 200, 
    headers: corsHeaders 
  });
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const data = await request.json();
    
    // Validate input
    const validationErrors = validateInput(data);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { error: validationErrors.join(', ') },
        { 
          status: 400,
          headers: corsHeaders
        }
      );
    }
    
    // Initialize Supabase client
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error('Supabase configuration missing');
    }
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Insert to database
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
        return NextResponse.json(
          { error: 'Email already registered' },
          { 
            status: 400,
            headers: corsHeaders
          }
        );
      }
      throw error;
    }
    
    console.log('Database insert successful:', result.id);
    
    // Return success response
    return NextResponse.json(
      {
        success: true,
        id: result.id,
        message: 'Successfully joined the waitlist',
      },
      {
        status: 200,
        headers: corsHeaders
      }
    );
    
  } catch (error) {
    console.error('Error in waitlist handler:', error);
    
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      },
      {
        status: 500,
        headers: corsHeaders
      }
    );
  }
}
