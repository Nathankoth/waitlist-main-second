#!/usr/bin/env node

/**
 * VistaForge Email-Only Test
 * 
 * This script tests inserting data with only the email field
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Email-Only Test\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test with just email
const testData = {
  email: `test-${Date.now()}@example.com`
};

console.log('📝 Testing with email only:');
console.log(JSON.stringify(testData, null, 2));
console.log('');

try {
  console.log('🚀 Attempting insert...\n');
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      email: testData.email.toLowerCase().trim(),
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.log('Error code:', error.code);
    
    if (error.code === 'PGRST204') {
      console.log('\n💡 The table schema is different than expected.');
      console.log('   The waitlist table might have different column names.');
    }
  } else {
    console.log('✅ SUCCESS! Email insert worked:');
    console.log('   ID:', result.id);
    console.log('   Email:', result.email);
    console.log('   All columns:', Object.keys(result));
    console.log('   Full record:', result);
    
    console.log('\n🎉 Backend is working! The table has these columns:');
    Object.keys(result).forEach(key => {
      console.log(`   - ${key}: ${typeof result[key]}`);
    });
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n🔧 If the table schema is wrong, you need to:');
console.log('1. Go to your Supabase dashboard');
console.log('2. Open the SQL editor');
console.log('3. Run the correct schema:');
console.log(`
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text,
  company text,
  monthly_listings text,
  how_heard text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
`);

console.log('\n🌐 Your app is running at: http://localhost:8082/');
console.log('📱 Test the form in your browser to see what happens!');
