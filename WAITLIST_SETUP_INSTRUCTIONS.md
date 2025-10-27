# 🎯 VistaForge Join Waitlist Setup Instructions

## 📁 Files Created

✅ **components/join_waitlist_complete.jsx** - Complete React component for the waitlist form
✅ **lib/supabaseClient.js** - Supabase client configuration
✅ **.env.local.template** - Environment variables template
✅ **.gitignore** - Updated to ignore sensitive files

## 🚀 Setup Steps

### 1. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 2. Configure Environment Variables
```bash
# Copy the template
cp .env.local.template .env.local

# Edit .env.local and replace placeholders with your actual values
```

**Replace these placeholders in `.env.local`:**
```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

**Get your values from:**
- Supabase Dashboard → Project Settings → API
- Copy the Project URL and anon public key

### 3. Import and Use the Component

**In your main page or component:**
```jsx
import JoinWaitlistComplete from './components/join_waitlist_complete';

function App() {
  return (
    <div>
      <h1>Join the VistaForge Waitlist</h1>
      <JoinWaitlistComplete />
    </div>
  );
}
```

### 4. Database Setup

**Ensure your Supabase table has this schema:**
```sql
CREATE TABLE waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  monthly_user text,
  role text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow public inserts
CREATE POLICY "Allow public waitlist signup" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);
```

### 5. Test the Form

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Open your browser** and navigate to your app

3. **Fill out the form:**
   - Full name (required)
   - Email address (required)
   - Monthly listings (optional)
   - Role (optional)

4. **Submit the form** and check for success message

5. **Verify in Supabase:**
   - Go to your Supabase dashboard
   - Check the `waitlist` table
   - Confirm the new entry appears

## 🔒 Security Notes

- ✅ Only public anon key is used (safe for frontend)
- ✅ Service role key is NOT included (server-side only)
- ✅ Environment variables are gitignored
- ✅ No hardcoded secrets in the code

## 🎨 Customization

**The component accepts a `className` prop for styling:**
```jsx
<JoinWaitlistComplete className="my-custom-styles" />
```

**Form fields can be customized by editing the component:**
- Change field labels
- Modify validation rules
- Update styling
- Add/remove fields

## 🚨 Troubleshooting

**If the form doesn't work:**

1. **Check environment variables:**
   ```bash
   echo $NEXT_PUBLIC_SUPABASE_URL
   echo $NEXT_PUBLIC_SUPABASE_ANON_KEY
   ```

2. **Check browser console** for errors

3. **Verify Supabase connection:**
   - Go to Supabase dashboard
   - Check if the table exists
   - Verify RLS policies

4. **Check network tab** for failed requests

## ✅ Success Indicators

- Form submits without errors
- Success message appears
- New row appears in Supabase `waitlist` table
- No console errors

**Your Join Waitlist form is now ready for production!** 🎉
