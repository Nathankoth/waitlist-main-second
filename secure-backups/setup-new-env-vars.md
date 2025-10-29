# New Environment Variables Setup Guide

## Required Environment Variables

You need to set these 3 environment variables in Vercel for your new Supabase project:

### 1. VITE_SUPABASE_URL
- **Type**: Environment Variable
- **Scope**: Production, Preview, Development
- **Value**: Your new Supabase project URL (e.g., `https://your-project-id.supabase.co`)

### 2. VITE_SUPABASE_ANON_KEY
- **Type**: Environment Variable  
- **Scope**: Production, Preview, Development
- **Value**: Your new Supabase anon/public key (starts with `eyJ...`)

### 3. SUPABASE_SERVICE_ROLE_KEY
- **Type**: Environment Variable
- **Scope**: Production only
- **Value**: Your new Supabase service role key (starts with `eyJ...`)

## Setup Commands

Run these commands to set up the environment variables:

```bash
# Set the project URL (replace with your actual URL)
vercel env add VITE_SUPABASE_URL production
# When prompted, enter: https://your-project-id.supabase.co

# Set the anon key (replace with your actual anon key)
vercel env add VITE_SUPABASE_ANON_KEY production
# When prompted, enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Set the service role key (replace with your actual service role key)
vercel env add SUPABASE_SERVICE_ROLE_KEY production
# When prompted, enter: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Database Schema Setup

1. Go to your new Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `./secure-backups/new-waitlist-schema.sql`
4. Execute the SQL script to create the new table

## Verification

After setting up the environment variables and database schema:

1. Deploy to production: `vercel --prod`
2. Test the waitlist form
3. Check that data appears in your Supabase `waitlist` table

## Security Notes

- ✅ No hardcoded secrets in codebase
- ✅ Service role key only available server-side
- ✅ Anon key safe for client-side use
- ✅ RLS policies configured for security
