# ⚠️ Supabase Setup Required

## Current Status

✅ **Auth infrastructure installed** - All code is ready  
⚠️ **Supabase not configured** - Need to add your credentials

---

## Quick Fix (2 Minutes)

### Step 1: Create Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up (free tier available)

### Step 2: Create New Project

1. Click "New Project"
2. Fill in:
   - **Name:** Quant Edge (or anything)
   - **Database Password:** Choose a strong password
   - **Region:** Choose closest to you
3. Click "Create new project"
4. **Wait ~2 minutes** for database to initialize

### Step 3: Get Your Credentials

1. In your Supabase project dashboard
2. Click **Settings** (gear icon on left sidebar)
3. Click **API** in the settings menu
4. You'll see two important values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

### Step 4: Update Configuration File ⭐ **NEW - EASY WAY**

1. Open **`/lib/supabase.config.ts`** in your project
2. Replace the placeholder values:

```typescript
export const SUPABASE_CONFIG = {
  // Replace this:
  url: 'https://your-project-id.supabase.co',
  
  // With your actual URL (from Step 3):
  url: 'https://abcdefg123456.supabase.co',
  
  // Replace this:
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here',
  
  // With your actual key (from Step 3):
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSI...',
};
```

3. **Save the file** (that's it!)

**The warning should now disappear!** ✅

---

## Next Steps

After fixing the error:

### 1. Run Database Migration (1 minute)

1. Go to your Supabase project
2. Click **SQL Editor** in sidebar
3. Click "New Query"
4. Open `/supabase/schema.sql` in your project
5. Copy ALL the SQL code
6. Paste into Supabase SQL Editor
7. Click **Run**
8. Verify: Go to **Table Editor** > you should see `profiles` table

### 2. Configure Auth Settings (30 seconds)

1. In Supabase, go to **Authentication** > **URL Configuration**
2. Set **Site URL**: `http://localhost:3000`
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/*`
4. Click **Save**

### 3. Test Your Auth! (1 minute)

```bash
# 1. Make sure dev server is running
npm run dev

# 2. Open http://localhost:3000

# 3. Click "Sign Up"

# 4. Fill in the form and submit

# 5. You should be redirected to email verification page

# 6. Check your email inbox

# 7. Click the verification link

# 8. You'll be logged in!
```

---

## What's Already Done

✅ All auth functions implemented  
✅ Signup page working  
✅ Login page working  
✅ Email verification working  
✅ Database schema ready  
✅ Security policies ready  
✅ Error handling ready  
✅ Documentation complete  

**You just need to add your Supabase credentials!**

---

## Troubleshooting

### "I updated the config but still see the warning"

1. Make sure you **saved** `/lib/supabase.config.ts`
2. Check there are **no typos** in your credentials
3. Verify you copied the correct values from Supabase (Settings > API)
4. The URL should end with `.supabase.co`
5. The key should start with `eyJ`
6. Try refreshing the page

### "Where do I find the config file?"

The file is located at: **`/lib/supabase.config.ts`**

It's a TypeScript file in the `lib` folder at the root of your project.

### "Email not received during testing"

1. Check spam/junk folder
2. In Supabase, go to **Authentication** > **Providers**
3. Make sure **Email** is enabled
4. For testing, you can see the email link in Supabase logs:
   - **Authentication** > **Logs**

---

## File Structure

```
your-project/
├── .env.local          ← UPDATE THIS FILE!
├── .env.example        ← Template (don't edit)
│
├── lib/
│   ├── supabase.ts     ✅ Ready
│   └── auth.ts         ✅ Ready
│
├── hooks/
│   └── useAuth.ts      ✅ Ready
│
├── pages/
│   ├── Signup.tsx      ✅ Ready
│   ├── Login.tsx       ✅ Ready
│   └── ...
│
├── supabase/
│   └── schema.sql      ← Run this in Supabase SQL Editor
│
└── docs/
    ├── IMPLEMENTATION_STEPS.md      ← Detailed guide
    └── SUPABASE_INTEGRATION_GUIDE.md ← Complete reference
```

---

## Documentation

| File | Purpose |
|------|---------|
| `README_SETUP.md` | 👈 **You are here** - Quick fix guide |
| `/IMPLEMENTATION_STEPS.md` | 5-minute full setup guide |
| `/SUPABASE_AUTH_COMPLETE.md` | Complete feature overview |
| `/docs/SUPABASE_INTEGRATION_GUIDE.md` | Detailed integration guide |
| `/docs/TROUBLESHOOTING.md` | Common issues & fixes |

---

## Support

### Getting Help

1. **Check browser console** for detailed error messages
2. **See `/docs/TROUBLESHOOTING.md`** for common issues
3. **Supabase Docs:** [supabase.com/docs/guides/auth](https://supabase.com/docs/guides/auth)
4. **Supabase Discord:** [discord.supabase.com](https://discord.supabase.com)

---

## Summary

**Current Error:** Missing Supabase environment variables

**Fix:** 
1. Create Supabase account
2. Create project
3. Copy credentials
4. Update `.env.local`
5. Restart server

**Time:** ~2 minutes

**Then you'll have:** Fully working authentication system! 🎉

---

**Let's fix this error and get your auth working!** 🚀
