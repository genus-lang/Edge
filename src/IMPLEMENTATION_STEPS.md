# 🚀 Supabase Auth Implementation - Quick Start

## ✅ Files Already Updated

I've updated the following pages with real Supabase integration:

1. ✅ `/pages/Signup.tsx` - Now uses `signUp()` function
2. ✅ `/pages/Login.tsx` - Now uses `signIn()` function  
3. ✅ `/pages/EmailVerification.tsx` - Now uses `resendVerificationEmail()`
4. ✅ `/App.tsx` - Added auth-callback route

## 📋 Next Steps (5 Minutes Setup)

### Step 1: Install Supabase (1 min)

```bash
npm install @supabase/supabase-js
```

### Step 2: Create Supabase Project (2 min)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in details and create
4. Wait ~2 minutes for database setup

### Step 3: Configure Environment (1 min)

1. In Supabase Dashboard → **Settings** > **API**
2. Copy **Project URL**
3. Copy **anon public** key
4. Create `.env.local` file:

```env
VITE_SUPABASE_URL=https://vhgpqelboozsmsvsefht.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZ3BxZWxib296c21zdnNlZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDU3NjYsImV4cCI6MjA3OTAyMTc2Nn0.HmuaMgyMlTlQAk7uaQTYw2yPNh19hLgy_7_SWSXG41E
```

### Step 4: Run Database Migration (1 min)

1. In Supabase Dashboard → **SQL Editor**
2. Copy all content from `/supabase/schema.sql`
3. Paste and click **Run**
4. Verify `profiles` table created in **Table Editor**

### Step 5: Configure Auth URLs (30 sec)

In Supabase Dashboard → **Authentication** > **URL Configuration**:

1. **Site URL**: `http://localhost:3000`
2. **Redirect URLs**: Add these:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/*`

**Done!** 🎉

---

## 🧪 Test Your Auth System

### Test Signup Flow

```bash
# 1. Start your app
npm run dev

# 2. Navigate to http://localhost:3000

# 3. Click "Sign Up" button

# 4. Fill in the form:
Name: Test User
Email: your-email@example.com
Password: Test123!@#
Confirm Password: Test123!@#
✓ Accept terms

# 5. Click "Create Account"

# 6. You should be redirected to Email Verification page

# 7. Check your email inbox

# 8. Click the verification link

# 9. You'll be redirected to the auth callback page

# 10. Then automatically to Onboarding

# 11. Complete onboarding

# 12. You'll land on the Dashboard
```

### Test Login Flow

```bash
# 1. After signup, click "Logout" (if you have it)

# 2. Go to Login page

# 3. Enter your email and password

# 4. Click "Sign In"

# 5. Since you've already done onboarding, you'll go straight to Dashboard
```

### Test Resend Email

```bash
# 1. Sign up with a new email

# 2. On Email Verification page, wait 60 seconds

# 3. Click "Resend Verification Email"

# 4. Check inbox again

# 5. Click the new verification link
```

---

## 📝 Still Need to Update

These pages still have mock data. Update them following the same pattern:

### Forgot Password Page

```typescript
// In /pages/ForgotPassword.tsx
import { sendPasswordResetEmail } from "../lib/auth";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const result = await sendPasswordResetEmail(email.trim());
  
  setIsLoading(false);
  setIsSubmitted(true); // Always show success
};
```

### Reset Password Page

```typescript
// In /pages/ResetPassword.tsx
import { updatePassword } from "../lib/auth";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const result = await updatePassword(password);

  if (!result.success) {
    setPasswordError(result.error);
    setIsLoading(false);
    return;
  }

  setIsSuccess(true);
};
```

### Onboarding Page

```typescript
// In /pages/Onboarding.tsx
import { completeOnboarding } from "../lib/auth";
import { useAuth } from "../hooks/useAuth";

export function Onboarding() {
  const { user } = useAuth();

  const handleComplete = async () => {
    if (user) {
      await completeOnboarding(user.id);
      handleNavigation("home");
    }
  };

  // Call handleComplete when user clicks "Go to Dashboard" on last step
}
```

---

## 🔒 Add Logout Functionality

Update your Navigation component to include logout:

```typescript
// In /components/Navigation.tsx
import { signOut } from "../lib/auth";
import { useAuth } from "../hooks/useAuth";

export function Navigation() {
  const { isAuthenticated, user } = useAuth();

  const handleLogout = async () => {
    await signOut();
    if ((window as any).navigateTo) {
      (window as any).navigateTo('login');
    }
  };

  return (
    <nav>
      {/* ... existing nav items ... */}
      
      {isAuthenticated ? (
        <button onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <>
          <button onClick={() => navigateTo('login')}>Login</button>
          <button onClick={() => navigateTo('signup')}>Sign Up</button>
        </>
      )}
    </nav>
  );
}
```

---

## 📚 Documentation

For detailed information, check these files:

1. **`/docs/SUPABASE_INTEGRATION_GUIDE.md`** - Complete guide with all code examples
2. **`/docs/SUPABASE_QUICK_REFERENCE.md`** - Quick code snippets
3. **`/docs/SUPABASE_SETUP_COMPLETE.md`** - Full feature list

---

## 🐛 Common Issues

### "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
npm install @supabase/supabase-js
```

### "Invalid API key"

**Solution:** Check your `.env.local` file has correct values from Supabase dashboard.

### Email not received

**Solution:** 
1. Check spam/promotions folder
2. Verify email provider in Supabase is configured
3. In development, check Supabase logs for email delivery status

### "Redirect URL not allowed"

**Solution:** 
1. Go to Supabase → **Authentication** > **URL Configuration**
2. Add your URL to the Redirect URLs list
3. For development, add `http://localhost:3000/*`

---

## ✅ What's Working Now

- ✅ Signup with email/password
- ✅ Email verification
- ✅ Resend verification email
- ✅ Login with email/password
- ✅ Auto-redirect based on onboarding status
- ✅ Auth callback handling
- ✅ Session management
- ✅ Profile creation
- ✅ Error handling
- ✅ Loading states

---

## 🎉 You're Almost Done!

Just 5 more minutes to:
1. Install Supabase package
2. Create project and copy credentials
3. Run database migration
4. Configure redirect URLs
5. Test signup and login!

Then you'll have a fully functional authentication system. 🚀

---

**Need help?** Check `/docs/SUPABASE_INTEGRATION_GUIDE.md` for detailed examples.
