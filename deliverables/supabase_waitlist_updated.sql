-- VistaForge Waitlist Table - Updated Schema
-- This table stores waitlist signups with user details and preferences
-- Updated to use TEXT for monthly_listings to support dropdown values

-- First, alter the existing table if it exists
ALTER TABLE IF EXISTS waitlist 
ALTER COLUMN monthly_listings TYPE text;

-- If table doesn't exist, create it
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text,
  company text,
  monthly_listings text, -- Changed from int to text for dropdown values
  how_heard text,
  created_at timestamptz DEFAULT now(),
  
  -- Add constraint to validate email format
  CONSTRAINT valid_email CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$')
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Create index on role for filtering
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist(role);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from anyone (for waitlist signup)
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow service role to manage waitlist
CREATE POLICY "Allow service role to manage waitlist" ON waitlist
  FOR ALL
  TO service_role
  USING (true);

-- Create policy to allow admins to view all waitlist entries
-- Note: You'll need to set up proper admin roles in your auth system
CREATE POLICY "Allow admin to view waitlist" ON waitlist
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email IN ('admin@vistaforge.com') -- Replace with your admin email
    )
  );

-- Optional: Create a view for analytics (count by role)
CREATE OR REPLACE VIEW waitlist_stats AS
SELECT 
  role,
  COUNT(*) as count,
  monthly_listings,
  COUNT(*) as listings_count
FROM waitlist
WHERE role IS NOT NULL
GROUP BY role, monthly_listings
ORDER BY count DESC;

-- Grant access to the view
GRANT SELECT ON waitlist_stats TO authenticated;

-- Insert example data (remove in production)
-- INSERT INTO waitlist (email, role, company, monthly_listings, how_heard) VALUES
-- ('example@realtor.com', 'realtor', 'Acme Realty', '10–20 listings', 'LinkedIn'),
-- ('investor@example.com', 'investor', 'Investment Group LLC', '20–40 listings', 'Referral');
