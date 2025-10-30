-- Fix Supabase RLS policies for waitlist table
-- Run this in your Supabase SQL Editor

-- Enable RLS (if not already enabled)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS allow_insert_anonymous ON public.waitlist;
DROP POLICY IF EXISTS allow_select_anonymous ON public.waitlist;
DROP POLICY IF EXISTS "Allow server inserts" ON public.waitlist;

-- Create new policies for anonymous access
CREATE POLICY allow_insert_anonymous ON public.waitlist 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY allow_select_anonymous ON public.waitlist 
FOR SELECT 
USING (true);

-- Optional: Allow service role to insert (for server-side operations)
CREATE POLICY allow_service_insert ON public.waitlist 
FOR INSERT 
TO service_role 
WITH CHECK (true);
