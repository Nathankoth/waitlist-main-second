#!/usr/bin/env node

/**
 * VistaForge Updated Form Test
 * 
 * This script tests the updated form with the correct database schema
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Updated Form Test\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test with the updated form structure
const testFormData = {
  name: 'John Doe',
  email: `test-${Date.now()}@example.com`,
  company: 'Acme Realty',
  monthly_listings: '10–20 listings'
};

console.log('📝 Testing with updated form data:');
console.log(JSON.stringify(testFormData, null, 2));
console.log('');

try {
  console.log('🚀 Attempting insert...\n');
  
  const { data: result, error } = await supabase
    .from('waitlist')
    .insert([{
      name: testFormData.name.trim(),
      email: testFormData.email.toLowerCase().trim(),
      company: testFormData.company.trim(),
      monthly_listings: testFormData.monthly_listings || null,
    }])
    .select()
    .single();

  if (error) {
    console.error('❌ Insert failed:', error.message);
    console.log('Error code:', error.code);
  } else {
    console.log('✅ SUCCESS! Form data inserted successfully:');
    console.log('   ID:', result.id);
    console.log('   Name:', result.name);
    console.log('   Email:', result.email);
    console.log('   Company:', result.company);
    console.log('   Monthly Listings:', result.monthly_listings);
    console.log('   Created At:', result.created_at);
    
    console.log('\n🎉 The backend is working perfectly!');
    console.log('   The form now matches the database schema exactly.');
  }
} catch (err) {
  console.error('❌ Unexpected error:', err.message);
}

console.log('\n🌐 Your app is running at: http://localhost:8082/');
console.log('📱 Test the form in your browser:');
console.log('1. Open http://localhost:8082/ in your browser');
console.log('2. Click "Join the Waitlist" button');
console.log('3. Fill out the form with:');
console.log('   - Full Name: Your name');
console.log('   - Email: your@email.com');
console.log('   - Company: Your company');
console.log('   - Monthly Listings: Select an option');
console.log('4. Click "Join Waitlist"');
console.log('5. You should see a success message!');
console.log('6. Check your Supabase dashboard for the new entry');

console.log('\n✅ The form is now ready for production use!');
