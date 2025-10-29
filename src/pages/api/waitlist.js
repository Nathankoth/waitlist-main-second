import { supabase } from '../../lib/supabaseClient';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { full_name, email, role, years_experience, monthly_listings } = req.body;

    if (!full_name || !email || !role || !years_experience || !monthly_listings) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const { data, error } = await supabase.from('waitlist').insert([
      { full_name, email, role, years_experience, monthly_listings }
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ message: 'Failed to join waitlist.' });
    }

    return res.status(200).json({ message: 'Successfully joined waitlist!', data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ message: 'A server error occurred.' });
  }
}
