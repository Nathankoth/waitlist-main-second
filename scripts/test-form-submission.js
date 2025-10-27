#!/usr/bin/env node

/**
 * VistaForge Form Submission Test
 * 
 * This script tests the actual form submission by inserting test data
 * into the Supabase waitlist table
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Form Submission Test\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test data that matches the form structure
const testFormData = {
  email: `test-${Date.now()}@example.com`, // Unique email to avoid conflicts
  role: 'realtor',
  company: 'Test Realty Company',
  monthly_listings: '10–20 listings',
  how_heard: 'Local testing'
};

console.log('📝 Test Form Data:');
console.log(JSON.stringify(testFormData, null, 2));
console.log('');

console.log('🚀 Attempting to insert data into Supabase...\n');

try {
  // This is exactly what the form does
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      email: testFormData.email.toLowerCase().trim(),
      role: testFormData.role?.toLowerCase() || null,
      company: testFormData.company?.trim() || null,
      monthly_listings: testFormData.monthly_listings || null,
      how_heard: testFormData.how_heard?.trim() || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.log('Error details:', error);
    
    if (error.code === '23505') {
      console.log('\n💡 This is a duplicate email error - the form is working correctly!');
    } else if (error.code === 'PGRST301') {
      console.log('\n💡 This might be a Row Level Security (RLS) issue.');
      console.log('   Check your Supabase RLS policies allow public inserts.');
    } else if (error.message.includes('relation "waitlist" does not exist')) {
      console.log('\n💡 The waitlist table does not exist.');
      console.log('   Run the SQL schema in your Supabase SQL editor.');
    }
  } else {
    console.log('✅ SUCCESS! Data inserted successfully:');
    console.log('   ID:', result.id);
    console.log('   Email:', result.email);
    console.log('   Role:', result.role);
    console.log('   Company:', result.company);
    console.log('   Monthly Listings:', result.monthly_listings);
    console.log('   How Heard:', result.how_heard);
    console.log('   Created At:', result.created_at);
    
    console.log('\n🎉 The backend is working perfectly!');
    console.log('   You can now test the form in your browser at:');
    console.log('   http://localhost:8082/');
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
  console.log('Full error:', err);
}

console.log('\n📋 Next Steps:');
console.log('1. Open http://localhost:8082/ in your browser');
console.log('2. Click "Join the Waitlist" button');
console.log('3. Fill out the form and submit');
console.log('4. Check your Supabase dashboard for the new entry');
console.log('5. Verify the data appears in the waitlist table');

console.log('\n🔍 Troubleshooting:');
console.log('- If you get RLS errors, check Supabase RLS policies');
console.log('- If table doesn\'t exist, run the SQL schema');
console.log('- If connection fails, check environment variables');
console.log('- Check browser console for any frontend errors');
