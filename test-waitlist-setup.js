#!/usr/bin/env node
/**
 * Test script for waitlist setup verification
 * Tests the API endpoint and form submission
 */

const testData = {
  full_name: 'Test User',
  email: 'test@example.com',
  role: 'Architect',
  years_experience: 5,
  monthly_listings: '5–10'
};

async function testWaitlistAPI() {
  console.log('🧪 Testing waitlist API endpoint...\n');
  
  try {
    const response = await fetch('https://waitlist-main-second-bhzkixery-nathankoths-projects.vercel.app/api/waitlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const data = await response.json();
    
    console.log(`Status: ${response.status}`);
    console.log(`Response:`, data);
    
    if (response.ok && data.success) {
      console.log('✅ API endpoint working correctly!');
    } else {
      console.log('❌ API endpoint error:', data.error);
    }
    
  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

async function testEnvironmentVariables() {
  console.log('\n🔧 Testing environment variables...\n');
  
  // Test if the environment variables are accessible
  const envVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  console.log('Environment variables should be set in Vercel:');
  envVars.forEach(envVar => {
    console.log(`  ${envVar}: ${process.env[envVar] ? '✅ Set' : '❌ Missing'}`);
  });
}

console.log('🚀 VistaForge Waitlist Setup Test\n');
console.log('Production URL: https://waitlist-main-second-bhzkixery-nathankoths-projects.vercel.app\n');

testEnvironmentVariables();
testWaitlistAPI();

console.log('\n📋 Next steps:');
console.log('1. Visit the production URL and test the waitlist form');
console.log('2. Check your Supabase dashboard for new entries');
console.log('3. Verify all form fields work correctly');
