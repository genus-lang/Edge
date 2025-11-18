# ⚡ Quick Setup - Supabase Authentication

## ⚠️ You're Seeing This Warning

```
╔════════════════════════════════════════════════════════════════════════╗
║                   ⚠️  SUPABASE NOT CONFIGURED                         ║
╚════════════════════════════════════════════════════════════════════════╝
```

**This is normal!** Your auth system is installed but needs your Supabase credentials.

---

## ✅ How to Fix (2 Minutes)

### 1️⃣ Create Supabase Account

- Go to **[supabase.com](https://supabase.com)**
- Click "Start your project"
- Sign up (free tier is perfect!)

### 2️⃣ Create Project

- Click "New Project"
- Name: `Quant Edge` (or anything)
- Set database password
- Choose region
- Click "Create"
- ⏱️ **Wait 2 minutes** for setup

### 3️⃣ Get Credentials

In your Supabase dashboard:
1. Click **Settings** (⚙️ gear icon)
2. Click **API**
3. You'll see:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGciOi...` (very long)

📋 **Copy both values!**

### 4️⃣ Update Config File ⭐

**This is the important step!**

1. Open this file in your project:
   ```
   /lib/supabase.config.ts
   ```

2. Find these lines:
   ```typescript
   export const SUPABASE_CONFIG = {
     url: 'https://your-project-id.supabase.co',
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here',
   };
   ```

3. Replace with YOUR credentials:
   ```typescript
   export const SUPABASE_CONFIG = {
     url: 'https://abcdefg123456.supabase.co',  // ← Your URL here
     anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...',  // ← Your key here
   };
   ```

4. **Save the file**

### 5️⃣ Verify It Works

**The warning should disappear immediately!** 

If you still see it:
- Make sure you **saved** the file
- Check for **typos** in the values
- Refresh your browser

---

## 🎉 That's It!

Once you update `/lib/supabase.config.ts`, the warning disappears and auth works!

---

## 📋 Next Steps (Optional)

To make auth fully functional:

### A. Run Database Migration (1 minute)

1. In Supabase dashboard → **SQL Editor**
2. Click "New Query"
3. Copy all content from `/supabase/schema.sql` in your project
4. Paste into SQL Editor
5. Click **Run**
6. Verify: Go to **Table Editor** → you should see `profiles` table

### B. Configure Auth URLs (30 seconds)

1. In Supabase → **Authentication** → **URL Configuration**
2. Set:
   - **Site URL**: `http://localhost:3000`
   - **Redirect URLs**: Add these:
     ```
     http://localhost:3000/auth/callback
     http://localhost:3000/*
     ```
3. Click **Save**

### C. Test Signup (1 minute)

1. Go to your app
2. Click **Sign Up**
3. Fill in the form
4. Submit
5. Check your email for verification link
6. Click the link
7. You're logged in! 🎉

---

## 🐛 Troubleshooting

### "Warning still shows after updating config"

**Checklist:**
- [ ] Did you save `/lib/supabase.config.ts`?
- [ ] Is your URL in format `https://xxxxx.supabase.co`?
- [ ] Does your key start with `eyJ`?
- [ ] No typos in either value?
- [ ] Try refreshing the browser

### "How do I know it's working?"

When configured correctly:
- ✅ Warning disappears
- ✅ No console errors about Supabase
- ✅ Signup form accepts submissions
- ✅ Login form works

### "Where exactly is the config file?"

```
your-project/
└── lib/
    └── supabase.config.ts  ← HERE!
```

Full path: `/lib/supabase.config.ts`

---

## 📚 More Help

| Document | What It's For |
|----------|--------------|
| **`SETUP_INSTRUCTIONS.md`** | 👈 You are here - Quick fix |
| `/README_SETUP.md` | Detailed setup guide |
| `/IMPLEMENTATION_STEPS.md` | Complete walkthrough |
| `/docs/TROUBLESHOOTING.md` | Common issues & solutions |

---

## 🎯 Summary

**Problem:** Warning message about Supabase not configured

**Solution:** 
1. Create Supabase account & project (2 min)
2. Copy URL & anon key from Settings > API
3. Update `/lib/supabase.config.ts` with your credentials
4. Save file

**Result:** Warning disappears, auth works! ✅

---

**Need help?** Check `/docs/TROUBLESHOOTING.md`

**Ready to test?** Run database migration and configure auth URLs above!

---

Made with 🔒 for **Quant Edge**  
Auth system by Supabase  
Setup time: **2 minutes**
