-- VistaForge Waitlist Table - Final Schema
-- This table stores waitlist signups with user details and preferences
-- Updated to match frontend form fields exactly

-- First, alter the existing table if it exists
ALTER TABLE IF EXISTS waitlist 
ALTER COLUMN monthly_listings TYPE text;

-- Rename monthly_listings to monthly_lists to match frontend
ALTER TABLE IF EXISTS waitlist 
RENAME COLUMN monthly_listings TO monthly_lists;

-- If table doesn't exist, create it with the correct schema
CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role text NOT NULL,
  monthly_lists text NOT NULL,
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
  monthly_lists,
  COUNT(*) as listings_count
FROM waitlist
WHERE role IS NOT NULL
GROUP BY role, monthly_lists
ORDER BY count DESC;

-- Grant access to the view
GRANT SELECT ON waitlist_stats TO authenticated;

-- Insert example data (remove in production)
-- INSERT INTO waitlist (name, email, role, monthly_lists) VALUES
-- ('John Doe', 'john@realtor.com', 'Realtor / Agent', '5 - 10'),
-- ('Jane Smith', 'jane@investor.com', 'Investor', '20 - 40');
