import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// Debug logging
console.log('Environment check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlLength: supabaseUrl?.length || 0,
  keyLength: supabaseAnonKey?.length || 0
});

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check environment variables first
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Missing Supabase environment variables');
    return res.status(500).json({ 
      message: 'Server configuration error. Please try again later.',
      error: 'Missing environment variables'
    });
  }

  try {
    const { full_name, email, role, years_experience, monthly_listings } = req.body;

    if (!full_name || !email || !role || !years_experience || !monthly_listings) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    console.log('Attempting to insert:', { full_name, email, role, years_experience, monthly_listings });

    const { data, error } = await supabase.from('waitlist').insert([
      { full_name, email, role, years_experience, monthly_listings }
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(400).json({ error: error.message });
    }

    console.log('Successfully inserted:', data);
    return res.status(200).json({ success: true, data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ 
      error: 'Unexpected server error', 
      details: err.message 
    });
  }
}
