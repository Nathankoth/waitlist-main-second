#!/usr/bin/env node

/**
 * VistaForge Table Schema Check
 * 
 * This script checks the actual structure of the waitlist table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🔍 VistaForge Table Schema Check\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('📊 Checking waitlist table structure...\n');

try {
  // Try to get table info by attempting a simple select
  const { data, error } = await supabase
    .from('waitlist')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Error accessing table:', error.message);
    console.log('Error code:', error.code);
    
    if (error.code === 'PGRST116') {
      console.log('\n💡 Table "waitlist" does not exist.');
      console.log('   You need to create it using the SQL schema.');
    } else if (error.code === 'PGRST301') {
      console.log('\n💡 Row Level Security (RLS) is blocking access.');
      console.log('   Check your RLS policies allow public access.');
    }
  } else {
    console.log('✅ Table exists and is accessible!');
    
    if (data && data.length > 0) {
      console.log('\n📋 Current table structure (from sample data):');
      const sample = data[0];
      Object.keys(sample).forEach(key => {
        console.log(`   ${key}: ${typeof sample[key]} (${sample[key]})`);
      });
    } else {
      console.log('\n📋 Table is empty, but accessible.');
      console.log('   This means the table exists but has no data yet.');
    }
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n🔧 To fix the table schema, run this SQL in your Supabase SQL editor:');
console.log(`
-- Create or update the waitlist table
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

-- Create policy to allow public inserts
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow public selects (for testing)
CREATE POLICY "Allow public to view waitlist" ON waitlist
  FOR SELECT
  TO anon
  USING (true);
`);

console.log('\n🚀 After running the SQL:');
console.log('1. Run this test again to verify the table structure');
console.log('2. Test the form submission');
console.log('3. Check your Supabase dashboard');
