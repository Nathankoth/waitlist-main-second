#!/usr/bin/env node
/**
 * Secure Waitlist Data Export Script
 * Exports current waitlist data to CSV format
 * Uses service role key for full database access
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get credentials from environment
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing required environment variables:');
  console.error('SUPABASE_URL:', !!SUPABASE_URL);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!SUPABASE_SERVICE_KEY);
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

async function exportWaitlistData() {
  try {
    console.log('🔄 Exporting waitlist data...');
    
    // Fetch all waitlist records
    const { data, error } = await supabase
      .from('waitlist')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('❌ Database error:', error);
      process.exit(1);
    }

    if (!data || data.length === 0) {
      console.log('ℹ️  No waitlist data found to export');
      return;
    }

    // Convert to CSV
    const headers = Object.keys(data[0]);
    const csvContent = [
      headers.join(','),
      ...data.map(row => 
        headers.map(header => {
          const value = row[header];
          // Escape CSV values
          if (value === null || value === undefined) return '';
          const stringValue = String(value);
          if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
            return `"${stringValue.replace(/"/g, '""')}"`;
          }
          return stringValue;
        }).join(',')
      )
    ].join('\n');

    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `waitlist-backup-${timestamp}.csv`;
    const filepath = path.join(__dirname, filename);
    
    fs.writeFileSync(filepath, csvContent);
    
    console.log(`✅ Backup created: ${filename}`);
    console.log(`📊 Records exported: ${data.length}`);
    console.log(`📁 Location: ${filepath}`);
    
    // Also create a summary
    const summary = {
      timestamp: new Date().toISOString(),
      recordCount: data.length,
      columns: headers,
      filename: filename
    };
    
    fs.writeFileSync(
      path.join(__dirname, `backup-summary-${timestamp}.json`), 
      JSON.stringify(summary, null, 2)
    );
    
  } catch (error) {
    console.error('❌ Export failed:', error);
    process.exit(1);
  }
}

exportWaitlistData();
