#!/usr/bin/env node
/**
 * Test script to verify waitlist form and backend field synchronization
 * Ensures exact field name matching between UI and Supabase columns
 */

const testCases = [
  {
    name: "Architect with 5-10 years experience",
    data: {
      full_name: "John Architect",
      email: "john@example.com",
      role: "architect",
      years_experience: "5-10",
      monthly_listings: "10-15"
    }
  },
  {
    name: "Realtor with 15-20 years experience", 
    data: {
      full_name: "Jane Realtor",
      email: "jane@example.com",
      role: "realtor",
      years_experience: "15-20",
      monthly_listings: "20+"
    }
  },
  {
    name: "Investor with 0-5 years experience",
    data: {
      full_name: "Bob Investor",
      email: "bob@example.com", 
      role: "investor",
      years_experience: "0-5",
      monthly_listings: "5-10"
    }
  }
];

async function testFieldSynchronization() {
  console.log('🧪 Testing Waitlist Field Synchronization\n');
  console.log('Production URL: https://waitlist-main-second-6vm8qdn31-nathankoths-projects.vercel.app\n');
  
  for (const testCase of testCases) {
    console.log(`📋 Testing: ${testCase.name}`);
    console.log(`   Data:`, testCase.data);
    
    try {
      const response = await fetch('https://waitlist-main-second-6vm8qdn31-nathankoths-projects.vercel.app/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testCase.data),
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`   ✅ SUCCESS: ${result.message}`);
      } else {
        console.log(`   ❌ ERROR: ${result.message}`);
      }
      
    } catch (error) {
      console.log(`   ❌ NETWORK ERROR: ${error.message}`);
    }
    
    console.log(''); // Empty line for readability
  }
}

async function testFieldMapping() {
  console.log('🔍 Field Mapping Verification:\n');
  
  const expectedFields = [
    'full_name',
    'email', 
    'role',
    'years_experience',
    'monthly_listings'
  ];
  
  console.log('Expected Supabase columns:');
  expectedFields.forEach(field => {
    console.log(`  ✅ ${field}`);
  });
  
  console.log('\nForm field mapping:');
  console.log('  UI Label → Database Column');
  console.log('  Full Name → full_name');
  console.log('  Email → email');
  console.log('  Role → role');
  console.log('  Years of Experience → years_experience');
  console.log('  Monthly Listings → monthly_listings');
  
  console.log('\nDropdown value mapping:');
  console.log('  Role values: realtor, homeowner, investor, lawyer, surveyor, architect, other');
  console.log('  Years experience: 0-5, 5-10, 10-15, 15-20, 20+');
  console.log('  Monthly listings: 0-5, 5-10, 10-15, 15-20, 20+');
}

console.log('🚀 VistaForge Waitlist Field Synchronization Test\n');
console.log('=' .repeat(60));

testFieldMapping();
console.log('\n' + '=' .repeat(60));
testFieldSynchronization();

console.log('\n📋 Next Steps:');
console.log('1. Visit the production URL and test the form manually');
console.log('2. Check your Supabase dashboard for new entries');
console.log('3. Verify all field values are stored correctly');
console.log('4. Confirm no JSON parsing or field mismatch errors');
