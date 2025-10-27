#!/usr/bin/env node

/**
 * VistaForge Security Enforcement Script
 * 
 * This script enforces strict security policies and prevents
 * any exposure of sensitive data in the codebase.
 */

import fs from 'fs';
import { execSync } from 'child_process';

console.log('🔒 VistaForge Security Enforcement\n');

// Security patterns to detect
const SECRET_PATTERNS = [
  /eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9/g, // JWT tokens
  /sk_[a-zA-Z0-9]{24,}/g, // Stripe secret keys
  /pk_[a-zA-Z0-9]{24,}/g, // Stripe publishable keys
  /[a-zA-Z0-9]{32,}/g, // Generic long keys
  /SUPABASE_SERVICE_ROLE_KEY\s*=\s*['"][^'"]+['"]/g, // Service role keys
  /API_KEY\s*=\s*['"][^'"]+['"]/g, // API keys
  /SECRET_KEY\s*=\s*['"][^'"]+['"]/g, // Secret keys
  /PRIVATE_KEY\s*=\s*['"][^'"]+['"]/g, // Private keys
];

// Files to scan
const SCAN_PATHS = [
  'src/',
  'public/',
  'components/',
  'pages/',
  'lib/',
  'hooks/',
  'contexts/',
];

// Files to exclude from scanning
const EXCLUDE_FILES = [
  'scripts/security-enforcement.js',
  'scripts/verify-deployment.js',
];

let violations = [];

console.log('🔍 Scanning for security violations...\n');

// Scan each path
SCAN_PATHS.forEach(path => {
  if (fs.existsSync(path)) {
    try {
      const files = execSync(`find ${path} -type f -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx"`, { encoding: 'utf8' }).trim().split('\n');
      
      files.forEach(file => {
        if (file && fs.existsSync(file) && !EXCLUDE_FILES.includes(file)) {
          const content = fs.readFileSync(file, 'utf8');
          
          SECRET_PATTERNS.forEach(pattern => {
            const matches = content.match(pattern);
            if (matches) {
              matches.forEach(match => {
                // Check if it's not just a variable name
                if (match.length > 20) {
                  violations.push({
                    file,
                    pattern: pattern.toString(),
                    match: match.substring(0, 20) + '...'
                  });
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(`   ⚠️  Could not scan ${path}: ${error.message}`);
    }
  }
});

// Report violations
if (violations.length > 0) {
  console.log('❌ SECURITY VIOLATIONS DETECTED:\n');
  violations.forEach(violation => {
    console.log(`   File: ${violation.file}`);
    console.log(`   Pattern: ${violation.pattern}`);
    console.log(`   Match: ${violation.match}`);
    console.log('');
  });
  
  console.log('🚨 IMMEDIATE ACTION REQUIRED:');
  console.log('1. Remove all hardcoded secrets from source code');
  console.log('2. Move secrets to environment variables');
  console.log('3. Update .gitignore to prevent future commits');
  console.log('4. Rotate any exposed keys immediately\n');
  
  process.exit(1);
} else {
  console.log('✅ No security violations detected');
}

// Check .gitignore protection
console.log('\n🛡️  Checking .gitignore protection...');
const gitignore = fs.readFileSync('.gitignore', 'utf8');
const requiredPatterns = ['.env', '.env.*', '*.key', 'secrets.json'];

let allProtected = true;
requiredPatterns.forEach(pattern => {
  if (gitignore.includes(pattern)) {
    console.log(`   ✅ ${pattern} is protected`);
  } else {
    console.log(`   ❌ ${pattern} not found in .gitignore`);
    allProtected = false;
  }
});

if (!allProtected) {
  console.log('\n❌ .gitignore protection incomplete');
  process.exit(1);
}

// Check environment files
console.log('\n🔐 Checking environment file security...');
const envFiles = ['.env', '.env.local', '.env.production', '.env.development'];
let envFilesFound = [];

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    envFilesFound.push(file);
  }
});

if (envFilesFound.length > 0) {
  console.log('   ⚠️  Environment files found:');
  envFilesFound.forEach(file => {
    console.log(`      ${file}`);
  });
  console.log('   Make sure these are gitignored and never committed');
}

console.log('\n✅ Security enforcement checks completed');
console.log('\n🔒 Security Reminders:');
console.log('- Never hardcode secrets in source code');
console.log('- Always use environment variables');
console.log('- Keep .env files gitignored');
console.log('- Rotate keys if exposed');
console.log('- Use Vercel environment variables for production');
