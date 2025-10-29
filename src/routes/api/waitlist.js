import { supabase } from '../../lib/supabaseClient.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { full_name, email, role, years_experience, monthly_listings } = req.body;
    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ full_name, email, role, years_experience, monthly_listings }]);

    if (error) throw error;
    return res.status(200).json({ success: true, message: 'Successfully joined waitlist' });
  } catch (err) {
    console.error('Waitlist submission error:', err);
    return res.status(500).json({ error: 'Failed to join waitlist. Please try again later.' });
  }
}
