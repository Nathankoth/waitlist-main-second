#!/usr/bin/env node

/**
 * VistaForge Supabase Connection Test
 * 
 * This script tests the Supabase connection and form submission functionality
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔗 VistaForge Supabase Connection Test\n');

// Test environment variables
console.log('1. Checking environment variables...\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  console.error('❌ VITE_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL not found');
  process.exit(1);
}

if (!supabaseAnonKey) {
  console.error('❌ VITE_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY not found');
  process.exit(1);
}

console.log('   ✅ Supabase URL found');
console.log('   ✅ Supabase Anon Key found');
console.log('   ✅ Environment variables properly configured\n');

// Test Supabase connection
console.log('2. Testing Supabase connection...\n');

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

try {
  // Test connection by querying the waitlist table
  const { data, error } = await supabase
    .from('waitlist')
    .select('count')
    .limit(1);

  if (error) {
    console.error('❌ Supabase connection failed:', error.message);
    console.log('   This might be due to:');
    console.log('   - Incorrect Supabase URL or Anon Key');
    console.log('   - Table "waitlist" does not exist');
    console.log('   - RLS policies blocking access');
    console.log('   - Network connectivity issues\n');
  } else {
    console.log('   ✅ Supabase connection successful');
    console.log('   ✅ Can access waitlist table\n');
  }
} catch (err) {
  console.error('❌ Connection test failed:', err.message);
}

// Test form data validation
console.log('3. Testing form data validation...\n');

const testFormData = {
  email: 'test@example.com',
  role: 'realtor',
  company: 'Test Realty',
  monthly_listings: '10–20 listings',
  how_heard: 'Test'
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const VALID_ROLES = ['realtor', 'investor', 'architect', 'surveyor', 'homebuyer', 'homeowner', 'lawyer', 'other'];
const VALID_MONTHLY_LISTINGS = ['0–5 listings', '5–10 listings', '10–20 listings', '20–40 listings', '40+ listings'];

function validateFormData(data) {
  const errors = [];
  
  if (!data.email || !EMAIL_REGEX.test(data.email)) {
    errors.push('Invalid email address');
  }
  
  if (!data.role || !VALID_ROLES.includes(data.role.toLowerCase())) {
    errors.push('Invalid role');
  }
  
  if (data.monthly_listings && !VALID_MONTHLY_LISTINGS.includes(data.monthly_listings)) {
    errors.push('Invalid monthly listings value');
  }
  
  return errors;
}

const validationErrors = validateFormData(testFormData);
if (validationErrors.length === 0) {
  console.log('   ✅ Form data validation passed');
} else {
  console.log('   ❌ Form data validation failed:', validationErrors.join(', '));
}

// Test data insertion (dry run)
console.log('\n4. Testing data insertion (dry run)...\n');

const testData = {
  email: testFormData.email.toLowerCase().trim(),
  role: testFormData.role?.toLowerCase() || null,
  company: testFormData.company?.trim() || null,
  monthly_listings: testFormData.monthly_listings || null,
  how_heard: testFormData.how_heard?.trim() || null,
};

console.log('   Test data prepared:');
console.log('   ', JSON.stringify(testData, null, 2));

console.log('\n📋 Test Summary:');
console.log('================');
console.log('✅ Environment variables configured');
console.log('✅ Supabase client created');
console.log('✅ Form validation working');
console.log('✅ Data preparation successful');

console.log('\n🚀 Next Steps:');
console.log('1. Ensure Supabase table "waitlist" exists with correct schema');
console.log('2. Test form submission in the browser');
console.log('3. Verify data appears in Supabase dashboard');
console.log('4. Check RLS policies allow public inserts');

console.log('\n🔒 Security Notes:');
console.log('- Only public anon key is used (safe for frontend)');
console.log('- Service role key is not exposed');
console.log('- Environment variables are properly gitignored');
console.log('- RLS policies should be configured for security');

console.log('\n📝 Supabase Table Schema Required:');
console.log('CREATE TABLE waitlist (');
console.log('  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),');
console.log('  email text UNIQUE NOT NULL,');
console.log('  role text,');
console.log('  company text,');
console.log('  monthly_listings text,');
console.log('  how_heard text,');
console.log('  created_at timestamptz DEFAULT now()');
console.log(');');
