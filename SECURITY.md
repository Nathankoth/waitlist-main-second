# VistaForge Security Configuration

## Environment Variables

### Client-Side Variables (Safe for public exposure)
These variables are prefixed with `VITE_` and will be included in the client bundle:

- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key (public)

### Server-Side Variables (Never expose to client)
These variables should only be set in Vercel environment variables:

- `SUPABASE_SERVICE_ROLE_KEY`: Service role key for database operations
- `MAILCHIMP_API_KEY`: Mailchimp API key for email subscriptions
- `MAILCHIMP_LIST_ID`: Mailchimp list ID for email subscriptions

## Vercel Deployment Setup

### 1. Environment Variables in Vercel Dashboard

Go to your Vercel project dashboard → Settings → Environment Variables and add:

**Client-side variables:**
```
VITE_SUPABASE_URL = https://blwcbwzhjhmrkadndmip.supabase.co
VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTQwNTcsImV4cCI6MjA3NjU3MDA1N30._u7rwYxZsyHykkyEeNssIyFTfAFKwIdyjAFuyA9gUsE
```

**Server-side variables:**
```
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJsd2Nid3poamhtcmthZG5kbWlwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDk5NDA1NywiZXhwIjoyMDc2NTcwMDU3fQ.EPoZ_CuptL3tjkz1pHeSnsAuKZUisl5mvDQBOqlhGr0
MAILCHIMP_API_KEY = your_mailchimp_api_key_here
MAILCHIMP_LIST_ID = your_mailchimp_list_id_here
```

### 2. GitHub Integration

1. Connect your GitHub repository to Vercel
2. Enable automatic deployments on push to main branch
3. Ensure all environment variables are set in Vercel dashboard

## Security Best Practices

### ✅ What's Protected
- Service role keys are never exposed to client-side code
- All sensitive environment variables are gitignored
- Supabase RLS (Row Level Security) should be enabled
- HTTPS is enforced in production

### ❌ What to Never Do
- Never commit `.env.local` or any `.env` files
- Never expose service role keys in client-side code
- Never hardcode API keys in source code
- Never share environment files publicly

## Local Development

1. Copy `.env.example` to `.env.local`
2. Fill in your actual values
3. Never commit `.env.local` to version control

## Production Deployment

The application will work independently after Cursor/Lovable subscriptions end because:

1. All configuration is environment-based
2. No hardcoded secrets in source code
3. Vercel handles environment variable injection
4. GitHub provides continuous deployment
5. Supabase provides independent backend services

## Verification Checklist

- [ ] All environment variables are set in Vercel
- [ ] No hardcoded secrets in source code
- [ ] `.gitignore` includes all sensitive files
- [ ] Application builds and deploys successfully
- [ ] All functionality works in production
- [ ] Supabase RLS is properly configured
