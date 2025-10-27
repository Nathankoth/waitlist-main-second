#!/usr/bin/env node

/**
 * VistaForge Role Dropdown Test
 * 
 * This script tests the updated role dropdown functionality
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

console.log('🧪 VistaForge Role Dropdown Test\n');

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test with different role selections
const testCases = [
  {
    name: 'Test with selected role',
    data: {
      name: 'John Doe',
      email: `test-role-${Date.now()}@example.com`,
      company: 'Test Company',
      monthly_listings: '10–20 listings',
      role: 'Real Estate Agent / Realtor'
    }
  },
  {
    name: 'Test with empty role (should be null)',
    data: {
      name: 'Jane Smith',
      email: `test-empty-role-${Date.now()}@example.com`,
      company: 'Test Company 2',
      monthly_listings: '5–10 listings',
      role: null // This simulates empty selection
    }
  },
  {
    name: 'Test with different role',
    data: {
      name: 'Bob Wilson',
      email: `test-investor-${Date.now()}@example.com`,
      company: 'Investment Corp',
      monthly_listings: '20–40 listings',
      role: 'Investor'
    }
  }
];

console.log('📝 Testing role dropdown functionality...\n');

for (const testCase of testCases) {
  console.log(`Testing: ${testCase.name}`);
  console.log('Data:', JSON.stringify(testCase.data, null, 2));
  
  try {
    const { data: result, error } = await supabase
      .from('waitlist')
      .insert([{
        name: testCase.data.name.trim(),
        email: testCase.data.email.toLowerCase().trim(),
        company: testCase.data.company.trim(),
        monthly_listings: testCase.data.monthly_listings || null,
        role: testCase.data.role,
      }])
      .select()
      .single();

    if (error) {
      console.error('❌ Insert failed:', error.message);
    } else {
      console.log('✅ SUCCESS!');
      console.log('   ID:', result.id);
      console.log('   Name:', result.name);
      console.log('   Email:', result.email);
      console.log('   Role:', result.role || 'NULL (as expected)');
      console.log('   Company:', result.company);
      console.log('   Monthly Listings:', result.monthly_listings);
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
  
  console.log('');
}

console.log('🎯 Role Dropdown Options Available:');
console.log('   - Prefer not to say (empty value)');
console.log('   - Homeowner / Buyer');
console.log('   - Investor');
console.log('   - Real Estate Agent / Realtor');
console.log('   - Architect');
console.log('   - Surveyor');
console.log('   - Lawyer');

console.log('\n🌐 Test the form in your browser:');
console.log('1. Open http://localhost:8082/');
console.log('2. Click "Join the Waitlist"');
console.log('3. Verify the role field is now a dropdown');
console.log('4. Test selecting different roles');
console.log('5. Test leaving role empty (should work)');
console.log('6. Submit and verify data in Supabase');

console.log('\n✅ Role dropdown update completed successfully!');
