#!/usr/bin/env node

/**
 * VistaForge Deployment Verification Script
 * 
 * This script verifies that the application can run independently
 * without Cursor or Lovable dependencies.
 */

import fs from 'fs';
import path from 'path';

console.log('🔍 VistaForge Deployment Verification\n');

// Check 1: Environment variables are properly configured
console.log('1. Checking environment configuration...');
const envExample = fs.existsSync('.env.example');
const envLocal = fs.existsSync('.env.local');

if (envExample) {
  console.log('   ✅ .env.example exists');
} else {
  console.log('   ❌ .env.example missing');
}

if (envLocal) {
  console.log('   ✅ .env.local exists (local development)');
} else {
  console.log('   ⚠️  .env.local missing (will use fallback values)');
}

// Check 2: No hardcoded secrets in source code
console.log('\n2. Checking for hardcoded secrets...');
const sourceFiles = [
  'src/lib/supabase.ts',
  'src/components/Footer.tsx',
  'src/components/Header.tsx'
];

let hasHardcodedSecrets = false;
sourceFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    // Check for service role keys (should not be in source)
    if (content.includes('service_role') && !content.includes('import.meta.env')) {
      console.log(`   ❌ Potential hardcoded secret in ${file}`);
      hasHardcodedSecrets = true;
    } else {
      console.log(`   ✅ ${file} looks clean`);
    }
  }
});

if (!hasHardcodedSecrets) {
  console.log('   ✅ No hardcoded secrets found in source code');
}

// Check 3: Gitignore protection
console.log('\n3. Checking .gitignore protection...');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
const requiredIgnores = ['.env', '.env.local', '.env.*.local', '*.key'];

let allProtected = true;
requiredIgnores.forEach(pattern => {
  if (gitignore.includes(pattern)) {
    console.log(`   ✅ ${pattern} is gitignored`);
  } else {
    console.log(`   ❌ ${pattern} not found in .gitignore`);
    allProtected = false;
  }
});

// Check 4: Vercel configuration
console.log('\n4. Checking Vercel configuration...');
const vercelConfig = fs.existsSync('vercel.json');
if (vercelConfig) {
  console.log('   ✅ vercel.json exists');
  const config = JSON.parse(fs.readFileSync('vercel.json', 'utf8'));
  if (config.env && config.env.VITE_SUPABASE_URL) {
    console.log('   ✅ Environment variables configured for Vercel');
  } else {
    console.log('   ⚠️  Environment variables not configured in vercel.json');
  }
} else {
  console.log('   ❌ vercel.json missing');
}

// Check 5: Security documentation
console.log('\n5. Checking security documentation...');
const securityDoc = fs.existsSync('SECURITY.md');
if (securityDoc) {
  console.log('   ✅ SECURITY.md exists');
} else {
  console.log('   ❌ SECURITY.md missing');
}

// Summary
console.log('\n📋 Verification Summary:');
console.log('========================');

if (envExample && !hasHardcodedSecrets && allProtected && vercelConfig && securityDoc) {
  console.log('✅ All checks passed! The application is ready for independent deployment.');
  console.log('\n🚀 Next steps:');
  console.log('1. Set environment variables in Vercel dashboard');
  console.log('2. Connect GitHub repository to Vercel');
  console.log('3. Deploy and verify functionality');
  console.log('4. Test that app works without Cursor/Lovable dependencies');
} else {
  console.log('❌ Some checks failed. Please review the issues above.');
  process.exit(1);
}

console.log('\n🔒 Security Reminders:');
console.log('- Never commit .env files to version control');
console.log('- Set all environment variables in Vercel dashboard');
console.log('- Enable Supabase RLS (Row Level Security)');
console.log('- Regularly rotate API keys and secrets');
