// Manual test script for Supabase connection
// Run this in your browser console after updating RLS policies

(async () => {
  const SUPABASE_URL = 'https://smpzgfuajzsjkdwjylie.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtcHpnZnVhanpzamtkd2p5bGllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzE4MDAsImV4cCI6MjA3NzM0NzgwMH0.zlDuFZRq3UYkaihKTIMdTNhaymY1OK2ScPcI9iZ1d18';
  
  // Import Supabase client
  const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  console.log('Testing Supabase connection...');
  
  try {
    const { data, error } = await supabase.from('waitlist').insert([
      { 
        full_name: 'Test User Manual', 
        email: 'test-manual@example.com', 
        role: 'architect', 
        years_experience: '5-10', 
        monthly_listings: '10-15' 
      }
    ]);
    
    if (error) {
      console.error('❌ Test failed:', error);
    } else {
      console.log('✅ Test successful:', data);
    }
  } catch (err) {
    console.error('❌ Test error:', err);
  }
})();
