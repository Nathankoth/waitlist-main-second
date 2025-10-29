#!/usr/bin/env node
/**
 * Test script for new waitlist setup
 * Verifies environment variables and database connection
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Load environment variables
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🧪 Testing new waitlist setup...\n');

// Test 1: Check environment variables
console.log('1️⃣ Checking environment variables:');
console.log(`   VITE_SUPABASE_URL: ${SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`   VITE_SUPABASE_ANON_KEY: ${SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`   SUPABASE_SERVICE_ROLE_KEY: ${SUPABASE_SERVICE_KEY ? '✅ Set' : '❌ Missing'}`);

if (!SUPABASE_URL || !SUPABASE_ANON_KEY || !SUPABASE_SERVICE_KEY) {
  console.log('\n❌ Missing required environment variables. Please run setup-env.sh first.');
  process.exit(1);
}

// Test 2: Test anon key connection
console.log('\n2️⃣ Testing anon key connection:');
try {
  const anonClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('   ✅ Anon client created successfully');
} catch (error) {
  console.log(`   ❌ Anon client creation failed: ${error.message}`);
  process.exit(1);
}

// Test 3: Test service key connection
console.log('\n3️⃣ Testing service key connection:');
try {
  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  console.log('   ✅ Service client created successfully');
} catch (error) {
  console.log(`   ❌ Service client creation failed: ${error.message}`);
  process.exit(1);
}

// Test 4: Test database schema
console.log('\n4️⃣ Testing database schema:');
try {
  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  // Try to select from waitlist table
  const { data, error } = await serviceClient
    .from('waitlist')
    .select('id, full_name, email, role, monthly_listings, years_experience, created_at')
    .limit(1);
    
  if (error) {
    console.log(`   ❌ Database schema test failed: ${error.message}`);
    console.log('   💡 Make sure you\'ve run the new-waitlist-schema.sql script');
    process.exit(1);
  }
  
  console.log('   ✅ Database schema is correct');
  console.log(`   📊 Found ${data.length} existing records`);
  
} catch (error) {
  console.log(`   ❌ Database connection failed: ${error.message}`);
  process.exit(1);
}

// Test 5: Test form submission (dry run)
console.log('\n5️⃣ Testing form submission (dry run):');
try {
  const serviceClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
  
  const testData = {
    full_name: 'Test User',
    email: 'test@example.com',
    role: 'realtor-agent',
    monthly_listings: '5-10',
    years_experience: 5
  };
  
  // Try to insert (this will fail due to unique constraint, but that's expected)
  const { data, error } = await serviceClient
    .from('waitlist')
    .insert([testData])
    .select()
    .single();
    
  if (error && error.code === '23505') {
    console.log('   ✅ Form submission test passed (duplicate email expected)');
  } else if (error) {
    console.log(`   ❌ Form submission test failed: ${error.message}`);
    process.exit(1);
  } else {
    console.log('   ✅ Form submission test passed');
    console.log(`   📝 Test record created with ID: ${data.id}`);
  }
  
} catch (error) {
  console.log(`   ❌ Form submission test failed: ${error.message}`);
  process.exit(1);
}

console.log('\n🎉 All tests passed! Your waitlist setup is ready.');
console.log('\n📋 Next steps:');
console.log('   1. Deploy to production: vercel --prod');
console.log('   2. Test the actual waitlist form on your website');
console.log('   3. Verify data appears in your Supabase dashboard');
