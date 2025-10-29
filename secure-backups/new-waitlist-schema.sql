-- New Waitlist Schema for VistaForge
-- Created: 2024-10-29
-- Purpose: Fresh schema with required fields for waitlist signups

-- Drop existing table if it exists (DESTRUCTIVE)
DROP TABLE IF EXISTS public.waitlist;

-- Create new waitlist table with required fields
CREATE TABLE public.waitlist (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name text NOT NULL,
  email text NOT NULL UNIQUE,
  role text NOT NULL,
  monthly_listings text NOT NULL,
  years_experience integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create index on email for quick lookups and uniqueness enforcement
CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist (email);

-- Create index on created_at for sorting
CREATE INDEX idx_waitlist_created_at ON public.waitlist (created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for server-side inserts (using service role key)
-- This allows server API routes to insert data
CREATE POLICY "Allow server inserts" ON public.waitlist
  FOR INSERT USING (auth.role() = 'service_role');

-- Optional: Create policy for authenticated user inserts (if needed)
-- CREATE POLICY "Allow authenticated inserts" ON public.waitlist
--   FOR INSERT USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON public.waitlist TO authenticated;
GRANT ALL ON public.waitlist TO service_role;

-- Comments for documentation
COMMENT ON TABLE public.waitlist IS 'VistaForge waitlist signups with user details and experience';
COMMENT ON COLUMN public.waitlist.full_name IS 'User full name';
COMMENT ON COLUMN public.waitlist.email IS 'User email address (unique)';
COMMENT ON COLUMN public.waitlist.role IS 'User role (realtor-agent, homeowner-buyer, investor, lawyer, surveyor, architect)';
COMMENT ON COLUMN public.waitlist.monthly_listings IS 'Monthly listings range (0-5, 5-10, 10-15, 20-40, 40+)';
COMMENT ON COLUMN public.waitlist.years_experience IS 'Years of experience in real estate (integer)';
COMMENT ON COLUMN public.waitlist.created_at IS 'Timestamp when user joined waitlist';
