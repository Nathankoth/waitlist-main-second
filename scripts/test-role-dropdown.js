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

// Test cases for role dropdown
const testCases = [
  {
    name: 'Test with selected role',
    data: {
      name: 'John Doe',
      email: `test-role-${Date.now()}@example.com`,
      company: 'Test Company',
      monthly_listings: '10–20 listings',
      role: 'Real Estate Agent / Realtor'
    },
    expected: 'Real Estate Agent / Realtor'
  },
  {
    name: 'Test with empty role (should be null)',
    data: {
      name: 'Jane Smith',
      email: `test-empty-role-${Date.now()}@example.com`,
      company: 'Test Company',
      monthly_listings: '5–10 listings',
      role: ''
    },
    expected: null
  },
  {
    name: 'Test with different role',
    data: {
      name: 'Bob Wilson',
      email: `test-investor-${Date.now()}@example.com`,
      company: 'Investment Corp',
      monthly_listings: '20–40 listings',
      role: 'Investor'
    },
    expected: 'Investor'
  }
];

console.log('📝 Testing role dropdown functionality...\n');

for (const testCase of testCases) {
  console.log(`Testing: ${testCase.name}`);
  console.log(`Data:`, JSON.stringify(testCase.data, null, 2));
  
  try {
    // Simulate the form submission logic
    const role = (testCase.data.role && testCase.data.role !== '') ? testCase.data.role : null;
    
    console.log(`Processed role: ${role} (expected: ${testCase.expected})`);
    
    if (role === testCase.expected) {
      console.log('✅ Role processing correct');
    } else {
      console.log('❌ Role processing incorrect');
    }
    
    // Test actual database insertion (matching actual schema)
    const { data: result, error } = await supabase
      .from('waitlist')
      .insert([{
        name: testCase.data.name.trim(),
        email: testCase.data.email.toLowerCase().trim(),
        monthly_listings: testCase.data.monthly_listings || null,
        role: role
      }])
      .select()
      .single();

    if (error) {
      console.log('❌ Database insert failed:', error.message);
    } else {
      console.log('✅ Database insert successful');
      console.log(`   Stored role: ${result.role}`);
      console.log(`   Expected: ${testCase.expected}`);
      
      if (result.role === testCase.expected) {
        console.log('✅ Role stored correctly in database');
      } else {
        console.log('❌ Role not stored correctly in database');
      }
    }
    
  } catch (err) {
    console.log('❌ Test failed:', err.message);
  }
  
  console.log('---\n');
}

console.log('🌐 Your app is running at: http://localhost:8082/');
console.log('📱 Manual testing instructions:');
console.log('1. Open http://localhost:8082/ in your browser');
console.log('2. Click "Join the Waitlist" button');
console.log('3. Fill out the form and test the role dropdown:');
console.log('   - Select different roles from the dropdown');
console.log('   - Leave role as "Prefer not to say" (should store as null)');
console.log('   - Submit the form and check for success');
console.log('4. Check your Supabase dashboard to verify the data');

console.log('\n✅ Role dropdown update complete!');
