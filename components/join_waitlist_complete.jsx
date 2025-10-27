/**
 * components/join_waitlist_complete.jsx
 * All-in-one React component for Join Waitlist form.
 * Replace env placeholders before deploying.
 */

import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function JoinWaitlistComplete({ className = '' }) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(null);
    setMessage('');
    setLoading(true);

    const form = e.target;
    const name = (form.name?.value || '').trim();
    const email = (form.email?.value || '').trim().toLowerCase();
    const monthly_user = form.monthly_user?.value || null;
    const role = (form.role?.value && form.role.value !== '') ? form.role.value : null;

    if (!name) { setStatus('error'); setMessage('Please enter your full name.'); setLoading(false); return; }
    if (!email || !/\S+@\S+\.\S+/.test(email)) { setStatus('error'); setMessage('Please enter a valid email.'); setLoading(false); return; }

    try {
      const payload = { name, email, monthly_user, role };
      const { data, error } = await supabase.from('waitlist').insert([payload]);
      if (error) { console.error('Supabase insert error:', error); setStatus('error'); setMessage(error.message || 'Insert failed'); }
      else { setStatus('success'); setMessage("Thanks — you're on the waitlist!"); form.reset(); }
    } catch (err) { console.error(err); setStatus('error'); setMessage('Unexpected error'); }
    finally { setLoading(false); }
  }

  return (
    <div className={`join-waitlist-shell ${className}`} style={{ maxWidth: 720 }}>
      <form onSubmit={handleSubmit} aria-live="polite">
        <div style={{ display: 'grid', gap: 12 }}>
          <label>
            <div style={{ fontSize: 13, marginBottom: 6 }}>Full name</div>
            <input name="name" type="text" placeholder="Jane Doe" required style={{ width: '100%', padding: '10px', borderRadius: 8 }} />
          </label>

          <label>
            <div style={{ fontSize: 13, marginBottom: 6 }}>Email address</div>
            <input name="email" type="email" placeholder="you@example.com" required style={{ width: '100%', padding: '10px', borderRadius: 8 }} />
          </label>

          <label>
            <div style={{ fontSize: 13, marginBottom: 6 }}>Monthly listings (optional)</div>
            <select name="monthly_user" defaultValue="" style={{ width: '100%', padding: '10px', borderRadius: 8 }}>
              <option value="">Prefer not to say</option>
              <option value="0-5">0–5</option>
              <option value="5-10">5–10</option>
              <option value="10-20">10–20</option>
              <option value="20-40">20–40</option>
              <option value="40+">40+</option>
            </select>
          </label>

          <label>
            <div style={{ fontSize: 13, marginBottom: 6 }}>Role (optional)</div>
            <select name="role" defaultValue="" style={{ width: '100%', padding: '10px', borderRadius: 8 }}>
              <option value="">Prefer not to say</option>
              <option value="Homeowner / Buyer">Homeowner / Buyer</option>
              <option value="Investor">Investor</option>
              <option value="Real Estate Agent / Realtor">Real Estate Agent / Realtor</option>
              <option value="Architect">Architect</option>
              <option value="Surveyor">Surveyor</option>
              <option value="Lawyer">Lawyer</option>
            </select>
          </label>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <button type="submit" disabled={loading} style={{ padding: '10px 18px', borderRadius: 10, background: '#0b74ff', color: '#fff', fontWeight: 600 }}>
              {loading ? 'Joining…' : 'Join Waitlist'}
            </button>
            {status === 'success' && <div style={{ color: 'green', fontWeight: 600 }}>{message}</div>}
            {status === 'error' && <div style={{ color: 'crimson', fontWeight: 600 }}>{message}</div>}
          </div>
        </div>
      </form>
    </div>
  );
}
