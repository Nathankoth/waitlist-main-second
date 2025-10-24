# VistaForge Waitlist Backend

This directory contains the serverless backend implementation for the VistaForge waitlist functionality.

## Files

- `serverless/waitlist-handler.js` - Supabase Edge Function for handling waitlist submissions
- `README.md` - This documentation file

## Environment Variables Required

Set these environment variables in your Supabase project or deployment platform:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Mailchimp Integration (Optional)
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
MAILCHIMP_SERVER_PREFIX=us1  # or us2, eu1, etc.

# Slack Notifications (Optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

## Database Setup

Run the following SQL in your Supabase SQL editor to create the waitlist table:

```sql
  Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  role VARCHAR(100),
  company VARCHAR(255),
  monthly_listings INTEGER,
  how_heard VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

  Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_role ON waitlist(role);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at);

  Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

  Create policy for service role
CREATE POLICY "Service role can manage waitlist" ON waitlist
  FOR ALL USING (auth.role() = 'service_role');
```

## Deployment

### Supabase Edge Functions

1. Install Supabase CLI: `npm install -g supabase`
2. Login: `supabase login`
3. Link your project: `supabase link  project-ref your-project-ref`
4. Deploy: `supabase functions deploy waitlist`

### Vercel/Netlify

1. Copy the handler code to your serverless functions directory
2. Set environment variables in your deployment platform
3. Deploy your application

## Testing

### Test with curl

```bash
# Test successful submission
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "role": "realtor",
    "company": "Test Realty",
    "monthly_listings": 10,
    "how_heard": "social-media"
  }'

# Test validation errors
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "email": "invalid-email",
    "role": "invalid-role"
  }'
```

### Test with ngrok (local development)

1. Start your local server: `npm run dev`
2. In another terminal: `ngrok http 3000`
3. Use the ngrok URL in your frontend environment variables
4. Test the form submission

## API Endpoints

### POST /api/waitlist

**Request Body:**
```json
{
  "email": "user@example.com",
  "role": "realtor",
  "company": "Company Name (optional)",
  "monthly_listings": 10,
  "how_heard": "social-media (optional)"
}
```

**Response (Success):**
```json
{
  "success": true,
  "id": "uuid-here",
  "message": "Successfully joined the waitlist"
}
```

**Response (Error):**
```json
{
  "error": "Error message here"
}
```

## Features

- ✅ Email validation
- ✅ Role validation
- ✅ Duplicate email prevention
- ✅ Database insertion with error handling
- ✅ Mailchimp subscription (optional)
- ✅ Slack notifications (optional)
- ✅ CORS support
- ✅ Comprehensive error handling

## Security Notes

- Never commit real API keys to version control
- Use environment variables for all sensitive data
- The service role key has elevated permissions - keep it secure
- Consider implementing rate limiting for production use
