#!/usr/bin/env node

/**
 * VistaForge Test with Required Fields
 * 
 * This script tests inserting data with all required fields
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Test with Required Fields\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test with all required fields
const testData = {
  name: 'Test User',
  email: `test-${Date.now()}@example.com`,
  company: 'Test Company'
};

console.log('📝 Testing with required fields:');
console.log(JSON.stringify(testData, null, 2));
console.log('');

try {
  console.log('🚀 Attempting insert...\n');
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      name: testData.name,
      email: testData.email.toLowerCase().trim(),
      company: testData.company,
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.log('Error code:', error.code);
  } else {
    console.log('✅ SUCCESS! Insert worked:');
    console.log('   ID:', result.id);
    console.log('   Name:', result.name);
    console.log('   Email:', result.email);
    console.log('   Company:', result.company);
    console.log('   All columns:', Object.keys(result));
    console.log('   Full record:', result);
    
    console.log('\n🎉 Backend is working! The table has these columns:');
    Object.keys(result).forEach(key => {
      console.log(`   - ${key}: ${typeof result[key]} (${result[key]})`);
    });
    
    console.log('\n💡 The form needs to include "name" and "company" fields!');
    console.log('   Both are required by the database schema.');
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n🔧 To fix the form, you need to:');
console.log('1. Add a "name" field to the WaitlistForm component');
console.log('2. Make "company" field required (not optional)');
console.log('3. Update the form submission to include both fields');

console.log('\n🌐 Your app is running at: http://localhost:8082/');
console.log('📱 The form will currently fail because it\'s missing required fields.');
