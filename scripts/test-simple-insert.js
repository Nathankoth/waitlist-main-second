#!/usr/bin/env node

/**
 * VistaForge Simple Insert Test
 * 
 * This script tests inserting data with only the basic required fields
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Simple Insert Test\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test with minimal data first
const testData = {
  email: `test-${Date.now()}@example.com`,
  role: 'realtor'
};

console.log('📝 Testing with minimal data:');
console.log(JSON.stringify(testData, null, 2));
console.log('');

try {
  console.log('🚀 Attempting insert...\n');
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      email: testData.email.toLowerCase().trim(),
      role: testData.role?.toLowerCase() || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.log('Error code:', error.code);
    console.log('Error details:', error);
  } else {
    console.log('✅ SUCCESS! Minimal insert worked:');
    console.log('   ID:', result.id);
    console.log('   Email:', result.email);
    console.log('   Role:', result.role);
    console.log('   Created At:', result.created_at);
    
    console.log('\n🎉 Basic backend is working!');
    
    // Now try with more fields
    console.log('\n🔄 Testing with additional fields...');
    
    const testData2 = {
      email: `test2-${Date.now()}@example.com`,
      role: 'investor',
      company: 'Test Company',
      monthly_listings: '5–10 listings'
    };
    
    const { data: result2, error: error2 } = await supabase
      .from('waitlist')
      .insert([{
        email: testData2.email.toLowerCase().trim(),
        role: testData2.role?.toLowerCase() || null,
        company: testData2.company?.trim() || null,
        monthly_listings: testData2.monthly_listings || null,
      }])
      .select()
      .single();

    if (error2) {
      console.log('⚠️  Additional fields failed:', error2.message);
      console.log('   This means some columns might not exist in the table.');
    } else {
      console.log('✅ SUCCESS! Additional fields worked:');
      console.log('   ID:', result2.id);
      console.log('   Email:', result2.email);
      console.log('   Role:', result2.role);
      console.log('   Company:', result2.company);
      console.log('   Monthly Listings:', result2.monthly_listings);
      console.log('   Created At:', result2.created_at);
    }
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n🌐 Your app is running at: http://localhost:8082/');
console.log('📝 Test the form by:');
console.log('1. Opening the URL in your browser');
console.log('2. Clicking "Join the Waitlist"');
console.log('3. Filling out the form');
console.log('4. Submitting and checking for success/error messages');
console.log('5. Checking your Supabase dashboard for new entries');
