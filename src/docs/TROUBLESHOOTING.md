# 🔧 Troubleshooting Guide

## Common Issues & Solutions

---

## Installation Issues

### ❌ "Cannot find module '@supabase/supabase-js'"

**Error:**
```
Module not found: Can't resolve '@supabase/supabase-js'
```

**Solution:**
```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

**Verify installation:**
```bash
npm list @supabase/supabase-js
```

---

### ❌ "Module not found: Can't resolve './lib/auth'"

**Error:**
```
Module not found: Can't resolve './lib/auth'
```

**Cause:** Missing auth infrastructure files

**Solution:** Ensure these files exist:
- `/lib/supabase.ts`
- `/lib/auth.ts`
- `/hooks/useAuth.ts`

---

## Environment Variable Issues

### ❌ "Invalid API key" or "Supabase URL is invalid"

**Error in Console:**
```
Error: Invalid API key
// or
Error: Invalid Supabase URL
```

**Solution:**

1. Check `.env.local` exists in project root
2. Verify variables are correctly named:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

3. **Important:** Must use `VITE_` prefix for Vite projects
4. Restart dev server after changing `.env.local`:
   ```bash
   # Stop server (Ctrl+C)
   npm run dev
   ```

5. Get correct values from Supabase:
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Go to **Settings** > **API**
   - Copy **Project URL** and **anon public** key

---

### ❌ Environment variables not loading

**Symptoms:** Variables are `undefined` in code

**Solutions:**

1. **Vite:** Use `import.meta.env.VITE_SUPABASE_URL`
2. **Create React App:** Use `process.env.REACT_APP_SUPABASE_URL`
3. Ensure `.env.local` is in project root (not in `/src`)
4. Restart dev server
5. Check `.gitignore` includes `.env.local`

---

## Signup Issues

### ❌ "User already registered"

**Error:**
```
Error: User already registered
```

**Solution:**

1. **If testing:** Delete user from Supabase dashboard:
   - Go to **Authentication** > **Users**
   - Find user and delete

2. **If production:** This is correct behavior - show user:
   ```
   "An account with this email already exists. Please log in."
   ```

3. Update your error handling:
   ```typescript
   if (result.error?.includes("already registered")) {
     setError("Account already exists. Try logging in instead.");
   }
   ```

---

### ❌ "Password is too weak"

**Error from Supabase:**
```
Error: Password must be at least 6 characters
```

**Solution:**

Update your validation:
```typescript
if (password.length < 8) {
  setError("Password must be at least 8 characters");
  return;
}

// Add more checks
if (!/[A-Z]/.test(password)) {
  setError("Password must contain an uppercase letter");
  return;
}
```

---

## Email Verification Issues

### ❌ "Email not received"

**Symptoms:** User doesn't receive verification email

**Solutions:**

1. **Check spam/junk folder**
2. **Check Supabase email logs:**
   - Dashboard > **Authentication** > **Settings** > **Email**
   - Look for delivery status

3. **Verify email provider is configured:**
   - Dashboard > **Authentication** > **Providers**
   - Ensure **Email** is enabled

4. **Check email rate limits:**
   - Supabase has rate limits on free tier
   - Wait a few minutes and try resend

5. **Development mode:**
   - In development, check Supabase logs for email link
   - Dashboard > **Authentication** > **Logs**

---

### ❌ "Email already confirmed"

**Error when resending:**
```
Error: Email already confirmed
```

**Solution:**
```typescript
if (result.error?.includes("already confirmed")) {
  setError("Email is already verified. You can log in now.");
  // Optionally redirect to login
  setTimeout(() => handleNavigation("login"), 2000);
}
```

---

### ❌ "Confirmation link expired"

**Error when clicking old link:**
```
Error: Token has expired
```

**Solution:**

1. Show user message to request new link
2. Redirect to email verification page with resend option
3. Update token expiration in Supabase:
   - Dashboard > **Authentication** > **Settings**
   - Adjust **Email Verification Expiry**

---

## Login Issues

### ❌ "Invalid login credentials"

**Error:**
```
Error: Invalid login credentials
```

**Causes & Solutions:**

1. **Email not verified:**
   - Check Supabase settings: **Email confirmation required**
   - If enabled, user must verify email first
   - Show message: "Please verify your email before logging in"

2. **Wrong password:**
   - This is correct - don't reveal specifics
   - Show: "Invalid email or password"

3. **Account doesn't exist:**
   - Show: "Invalid email or password"
   - Provide "Sign up" link

---

### ❌ "Session not persisting" / User logged out on refresh

**Symptoms:** User is logged out when page refreshes

**Solutions:**

1. **Check Supabase client config:**
   ```typescript
   export const supabase = createClient(url, key, {
     auth: {
       autoRefreshToken: true,    // ✓ Enable
       persistSession: true,       // ✓ Enable
       detectSessionInUrl: true,   // ✓ Enable
     },
   });
   ```

2. **Check browser settings:**
   - Cookies must be enabled
   - Not in incognito/private mode (for testing)

3. **Check localStorage:**
   - Open DevTools > Application > Local Storage
   - Look for `supabase.auth.token`

---

## Redirect Issues

### ❌ "Redirect URL not allowed"

**Error after clicking email link:**
```
Error: Redirect URL is not allowed
```

**Solution:**

1. Go to Supabase Dashboard
2. **Authentication** > **URL Configuration**
3. Add your URLs to **Redirect URLs**:
   ```
   http://localhost:3000/auth/callback
   http://localhost:3000/*
   https://yourdomain.com/auth/callback
   https://yourdomain.com/*
   ```

4. **Site URL** should be:
   ```
   http://localhost:3000 (development)
   https://yourdomain.com (production)
   ```

---

### ❌ Redirect loops (keeps redirecting)

**Symptoms:** Page keeps redirecting back and forth

**Cause:** Both auth pages and main pages redirecting simultaneously

**Solution:**

Check your redirect logic:
```typescript
// ❌ BAD - Can cause loops
useEffect(() => {
  if (isAuthenticated) {
    navigate("home");
  }
}, [isAuthenticated]);

// ✅ GOOD - Includes loading check
useEffect(() => {
  if (!loading && isAuthenticated) {
    navigate("home");
  }
}, [loading, isAuthenticated]);
```

---

## Database Issues

### ❌ "Profile not found"

**Error:**
```
Error: Profile not found for user
```

**Causes & Solutions:**

1. **Schema not deployed:**
   - Run `/supabase/schema.sql` in SQL Editor

2. **Trigger not working:**
   - Check trigger exists:
     ```sql
     SELECT * FROM pg_trigger 
     WHERE tgname = 'on_auth_user_created';
     ```

3. **Manual fix - Create profile:**
   ```sql
   INSERT INTO profiles (id, email, full_name)
   VALUES (
     'user-uuid-here',
     'user@example.com',
     'Full Name'
   );
   ```

---

### ❌ "Permission denied for table profiles"

**Error:**
```
Error: permission denied for table profiles
```

**Cause:** RLS policy not configured correctly

**Solution:**

1. Check RLS is enabled:
   ```sql
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ```

2. Verify policies exist:
   ```sql
   SELECT * FROM pg_policies 
   WHERE tablename = 'profiles';
   ```

3. Re-run the RLS policies from `/supabase/schema.sql`

---

## 2FA/OTP Issues

### ❌ "Factor not found"

**Error when verifying OTP:**
```
Error: MFA factor not found
```

**Solution:**

1. Ensure user enrolled in 2FA first
2. Check factor ID is correct
3. Verify factor exists:
   ```typescript
   const { data } = await supabase.auth.mfa.listFactors();
   console.log(data.totp); // Should show factors
   ```

---

### ❌ "Invalid OTP code"

**Error:**
```
Error: Invalid code
```

**Solutions:**

1. **Time sync issue:**
   - Ensure device time is correct
   - TOTP codes are time-based

2. **Code already used:**
   - Each code can only be used once
   - Wait for new code (30 seconds)

3. **Wrong factor:**
   - Verify using correct factor ID

---

## Network Issues

### ❌ "Network request failed"

**Error:**
```
TypeError: Failed to fetch
```

**Solutions:**

1. **Check internet connection**

2. **CORS issues:**
   - Check Supabase URL is correct
   - Verify no typos in `.env.local`

3. **Firewall/VPN:**
   - Disable temporarily to test
   - Add Supabase domains to allowlist

4. **Check Supabase status:**
   - Visit [status.supabase.com](https://status.supabase.com)

---

## TypeScript Issues

### ❌ "Property does not exist on type"

**Error:**
```
Property 'user' does not exist on type 'AuthState'
```

**Solution:**

1. Ensure types are imported:
   ```typescript
   import { User, Session } from '@supabase/supabase-js';
   import { Profile } from '../lib/supabase';
   ```

2. Check interface definitions match

3. Restart TypeScript server:
   - VS Code: `Cmd/Ctrl + Shift + P` > "Restart TS Server"

---

## Production Issues

### ❌ "Works locally but not in production"

**Solutions:**

1. **Environment variables:**
   - Set in hosting platform (Vercel, Netlify, etc.)
   - Use production Supabase URL/key

2. **Redirect URLs:**
   - Add production URLs in Supabase Auth settings
   - Example: `https://yourdomain.com/*`

3. **HTTPS required:**
   - Supabase requires HTTPS in production
   - Ensure SSL certificate is valid

4. **Check build logs:**
   - Look for build errors
   - Verify all files are included

---

## Testing Tips

### 🧪 Test in Incognito Mode

Always test auth flows in incognito/private window to:
- Avoid cached sessions
- See fresh user experience
- Test logout properly

### 🧪 Clear Browser Data

If issues persist:
1. Open DevTools (F12)
2. **Application** tab
3. **Clear site data**
4. Refresh page

### 🧪 Check Supabase Logs

Dashboard > **Authentication** > **Logs**
- Shows all auth events
- Email delivery status
- Error messages

### 🧪 Use Console Logging

Add temporary logging:
```typescript
console.log('Auth state:', { user, profile, loading });
console.log('Signup result:', result);
```

---

## Getting Help

### 📚 Documentation

1. **Your Docs:**
   - `/docs/SUPABASE_INTEGRATION_GUIDE.md`
   - `/docs/SUPABASE_QUICK_REFERENCE.md`

2. **Official Docs:**
   - [Supabase Auth](https://supabase.com/docs/guides/auth)
   - [JavaScript Client](https://supabase.com/docs/reference/javascript)

### 💬 Community Support

1. **Supabase Discord:** [discord.supabase.com](https://discord.supabase.com)
2. **GitHub Discussions:** [github.com/supabase/supabase/discussions](https://github.com/supabase/supabase/discussions)
3. **Stack Overflow:** Tag with `supabase`

### 🐛 Report Bugs

If you find a bug in Supabase:
1. Check [GitHub Issues](https://github.com/supabase/supabase/issues)
2. Search for similar issues
3. Create new issue with reproduction steps

---

## Debug Checklist

When something doesn't work, check:

- [ ] Supabase package installed
- [ ] `.env.local` file exists
- [ ] Environment variables correct
- [ ] Dev server restarted after env changes
- [ ] Database schema deployed
- [ ] RLS policies enabled
- [ ] Redirect URLs configured
- [ ] Email provider enabled
- [ ] Browser cookies enabled
- [ ] Internet connection working
- [ ] Supabase project active
- [ ] No typos in code
- [ ] All files imported correctly
- [ ] Console shows no errors

---

**Most issues can be solved by checking environment variables and Supabase dashboard settings!**

For more help, see `/docs/SUPABASE_INTEGRATION_GUIDE.md`
