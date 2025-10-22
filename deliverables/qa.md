# VistaForge Waitlist QA Testing Guide

This document provides comprehensive testing procedures for the VistaForge waitlist functionality.

## Prerequisites

Before testing, ensure you have:

1. **Environment Variables Configured:**
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_ROLE_KEY`: Service role key
   - `MAILCHIMP_API_KEY`: Mailchimp API key (optional for basic tests)
   - `MAILCHIMP_LIST_ID`: Mailchimp list ID (optional)
   - `MAILCHIMP_SERVER_PREFIX`: e.g., 'us1', 'us2' (optional)
   - `SLACK_WEBHOOK_URL`: Slack webhook URL (optional)

2. **Database Setup:**
   - Run `deliverables/supabase_waitlist.sql` in your Supabase SQL editor
   - Verify the `waitlist` table was created successfully

3. **Edge Function Deployed:**
   - Deploy the `waitlist-handler.js` as a Supabase Edge Function
   - Name it `waitlist`

## Manual Testing Checklist

### Frontend Tests

#### 1. Waitlist Form Display
- [ ] Hero section displays "Join the Waitlist" button
- [ ] Button opens modal dialog on click
- [ ] Modal displays all required fields (email, role)
- [ ] Modal displays optional fields (company, monthly_listings, how_heard)
- [ ] Form is keyboard accessible (Tab navigation works)
- [ ] Close button/overlay dismisses modal

#### 2. Form Validation
- [ ] Submitting empty form shows "Email is required" error
- [ ] Invalid email format shows "Please enter a valid email" error
- [ ] Valid email removes error message
- [ ] Role dropdown is required (shows error if not selected)
- [ ] Optional fields don't show errors when empty
- [ ] Error messages appear inline below respective fields

#### 3. Form Submission - Success
- [ ] Valid submission shows loading spinner
- [ ] Success modal appears after submission
- [ ] Success modal displays confirmation message
- [ ] Social share buttons are functional
- [ ] Copy link button copies URL to clipboard
- [ ] Toast notification confirms successful signup

#### 4. Form Submission - Errors
- [ ] Duplicate email shows "Email already registered" error
- [ ] Network errors show appropriate error message
- [ ] Form can be resubmitted after fixing errors
- [ ] Submit button is disabled during submission

#### 5. Mobile Experience
- [ ] Sticky CTA appears after scrolling 300px on mobile
- [ ] Sticky CTA opens same waitlist form
- [ ] Form is fully functional on mobile devices
- [ ] Touch interactions work smoothly
- [ ] Modal is responsive on small screens

#### 6. Accessibility
- [ ] All form inputs have proper labels
- [ ] Modal has ARIA roles
- [ ] Keyboard navigation works throughout
- [ ] Focus management is correct
- [ ] Color contrast meets WCAG AA standards

### Backend Tests (curl commands)

#### Test 1: Valid Submission - Minimal Data
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "role": "realtor"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "id": "uuid-here",
  "message": "Successfully joined the waitlist"
}
```

#### Test 2: Valid Submission - Full Data
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "investor@example.com",
    "role": "investor",
    "company": "Real Estate Investments LLC",
    "monthly_listings": 50,
    "how_heard": "LinkedIn"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "id": "uuid-here",
  "message": "Successfully joined the waitlist"
}
```

#### Test 3: Invalid Email
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "not-an-email",
    "role": "realtor"
  }'
```

**Expected Response:**
```json
{
  "error": "Invalid email address"
}
```
**Expected Status Code:** 400

#### Test 4: Missing Required Fields
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "company": "Test Company"
  }'
```

**Expected Response:**
```json
{
  "error": "Invalid email address"
}
```
**Expected Status Code:** 400

#### Test 5: Duplicate Email
```bash
# First submission
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "duplicate@example.com",
    "role": "realtor"
  }'

# Second submission (should fail)
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "duplicate@example.com",
    "role": "investor"
  }'
```

**Expected Response (second call):**
```json
{
  "error": "Email already registered"
}
```
**Expected Status Code:** 500

#### Test 6: Invalid Role
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test2@example.com",
    "role": "invalid_role"
  }'
```

**Expected Response:**
```json
{
  "error": "Invalid role"
}
```
**Expected Status Code:** 400

#### Test 7: CORS Preflight
```bash
curl -X OPTIONS \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Access-Control-Request-Method: POST' \
  -H 'Access-Control-Request-Headers: content-type'
```

**Expected Response:**
- Status Code: 200
- Headers should include CORS headers

### Database Verification

After submitting test data, verify in Supabase:

```sql
-- View all waitlist entries
SELECT * FROM waitlist ORDER BY created_at DESC;

-- Check for specific email
SELECT * FROM waitlist WHERE email = 'test@example.com';

-- View role statistics
SELECT role, COUNT(*) as count 
FROM waitlist 
GROUP BY role 
ORDER BY count DESC;

-- View waitlist stats view
SELECT * FROM waitlist_stats;

-- Test RLS policies
-- As anonymous user (should only be able to insert)
-- As authenticated admin (should be able to select)
```

### Integration Tests

#### Mailchimp Integration
1. Submit a test signup through the form
2. Check Mailchimp audience for new subscriber
3. Verify merge fields are populated correctly:
   - ROLE field matches submitted role
   - COMPANY field matches submitted company
   - LISTINGS field matches monthly_listings
4. Verify tags are applied: 'waitlist', 'vistaforge'

#### Slack Integration
1. Submit a test signup through the form
2. Check configured Slack channel for notification
3. Verify notification includes:
   - Email
   - Role
   - Company
   - Monthly listings
   - How heard
   - Timestamp

## Performance Testing

### Load Testing
```bash
# Test concurrent submissions
for i in {1..10}; do
  curl -X POST \
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
    -H 'Content-Type: application/json' \
    -d "{
      \"email\": \"load-test-$i@example.com\",
      \"role\": \"realtor\"
    }" &
done
wait
```

**Expected:**
- All requests should succeed
- Response time should be < 2 seconds
- No database deadlocks or errors

### Rate Limiting
Test if rate limiting is needed:
```bash
# Send 100 requests rapidly
for i in {1..100}; do
  curl -X POST \
    'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
    -H 'Content-Type: application/json' \
    -d "{
      \"email\": \"rate-test-$i@example.com\",
      \"role\": \"realtor\"
    }"
done
```

## Security Testing

### SQL Injection Tests
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com'\'' OR 1=1--",
    "role": "realtor"
  }'
```

**Expected:** Should be safely handled and not cause database errors

### XSS Tests
```bash
curl -X POST \
  'https://YOUR_PROJECT_ID.supabase.co/functions/v1/waitlist' \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "test@example.com",
    "role": "realtor",
    "company": "<script>alert(\"xss\")</script>"
  }'
```

**Expected:** Data should be stored safely without executing scripts

## Cleanup

After testing, clean up test data:

```sql
-- Delete test entries
DELETE FROM waitlist 
WHERE email LIKE '%@example.com' 
   OR email LIKE 'test%@%' 
   OR email LIKE 'load-test%@%'
   OR email LIKE 'rate-test%@%';

-- Verify cleanup
SELECT COUNT(*) FROM waitlist;
```

## Troubleshooting

### Common Issues

1. **"Supabase configuration missing" error:**
   - Verify `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set
   - Check Edge Function has access to environment variables

2. **"Email already registered" on new emails:**
   - Check if email exists in database: `SELECT * FROM waitlist WHERE email = 'email@example.com';`
   - Delete test data if needed

3. **CORS errors in browser:**
   - Verify `corsHeaders` are returned in all responses
   - Check OPTIONS method handler is working

4. **Mailchimp subscription fails silently:**
   - Check Edge Function logs for Mailchimp errors
   - Verify API key and list ID are correct
   - Check server prefix matches your Mailchimp account

5. **Slack notifications not appearing:**
   - Verify webhook URL is correct
   - Check webhook is enabled in Slack
   - Review Edge Function logs for errors

## Success Criteria

All tests pass if:
- ✅ Form validation works correctly
- ✅ Valid submissions are stored in database
- ✅ Duplicate emails are rejected
- ✅ Mailchimp integration works (if configured)
- ✅ Slack notifications work (if configured)
- ✅ Error handling is graceful
- ✅ Mobile experience is smooth
- ✅ Accessibility standards are met
- ✅ Security tests pass without vulnerabilities

## Next Steps

After QA testing:
1. Set up monitoring for Edge Function errors
2. Configure production environment variables
3. Set up email notification for new signups
4. Create admin dashboard for viewing waitlist
5. Plan launch campaign for collecting signups
