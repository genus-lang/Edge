# 🔐 Supabase Authentication Integration - Complete Guide

## 📋 Overview

This guide provides complete Supabase authentication integration for your Quant Edge platform. All the core infrastructure has been created - you just need to update the UI pages to use the auth functions.

---

## ✅ What's Been Created

### 1. **Core Files**

- ✅ `/lib/supabase.ts` - Supabase client initialization
- ✅ `/lib/auth.ts` - All auth functions (signup, login, forgot password, etc.)
- ✅ `/hooks/useAuth.ts` - React hooks for auth state management
- ✅ `/supabase/schema.sql` - Database schema with RLS policies
- ✅ `/.env.example` - Environment variables template

### 2. **Features Implemented**

- ✅ Email/Password Signup with email verification
- ✅ Email/Password Login
- ✅ Forgot Password flow
- ✅ Reset Password flow
- ✅ Email Verification with resend
- ✅ OTP/2FA Support (TOTP)
- ✅ OAuth Support (Google, GitHub, Azure)
- ✅ Profile Management
- ✅ Onboarding completion tracking
- ✅ Session Management
- ✅ Auto profile creation on signup
- ✅ Row Level Security (RLS)

---

## 🚀 Setup Instructions

### Step 1: Install Supabase

```bash
npm install @supabase/supabase-js
# or
yarn add @supabase/supabase-js
```

### Step 2: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database to initialize (~2 minutes)

### Step 3: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Get your credentials from Supabase Dashboard:
   - Go to **Settings** > **API**
   - Copy **Project URL** → `VITE_SUPABASE_URL`
   - Copy **anon public** key → `VITE_SUPABASE_ANON_KEY`

3. Your `.env.local` should look like:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

### Step 4: Run Database Migration

1. Go to Supabase Dashboard > **SQL Editor**
2. Copy entire contents of `/supabase/schema.sql`
3. Paste and click **Run**
4. Verify `profiles` table was created in **Table Editor**

### Step 5: Configure Auth Settings

1. Go to **Authentication** > **URL Configuration**
2. Set **Site URL**: `http://localhost:3000` (or your production URL)
3. Add **Redirect URLs**:
   - `http://localhost:3000/auth/callback`
   - `http://localhost:3000/*` (for development)
   - Add production URLs when deploying

4. Go to **Authentication** > **Email Templates**
5. Customize email templates (optional):
   - Confirm Signup
   - Reset Password
   - Magic Link

6. Go to **Authentication** > **Providers**
7. Enable **Email** provider (should be enabled by default)
8. Optionally enable **OAuth providers** (Google, GitHub, etc.)

---

## 📝 How to Update Your Pages

All the auth logic is ready. Here's how to integrate it into your existing UI pages:

### **Signup Page** (`/pages/Signup.tsx`)

Replace the mock API call with real Supabase:

```typescript
import { signUp } from "../lib/auth";
import { useRedirectIfAuthenticated } from "../hooks/useAuth";
import { AlertCircle } from "lucide-react";

export function Signup() {
  // Add state
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useRedirectIfAuthenticated();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please accept the Terms & Conditions");
      return;
    }

    setIsLoading(true);

    // Call Supabase signup
    const result = await signUp({
      email: email.trim(),
      password,
      fullName: fullName.trim(),
    });

    if (!result.success) {
      setError(result.error || "Signup failed");
      setIsLoading(false);
      return;
    }

    // Store email for verification page
    sessionStorage.setItem('pendingVerificationEmail', email);
    
    // Navigate to email verification
    handleNavigation("email-verification");
  };

  // Bind inputs to state
  // <input value={fullName} onChange={(e) => setFullName(e.target.value)} />
  // <input value={email} onChange={(e) => setEmail(e.target.value)} />
  // etc...
}
```

### **Login Page** (`/pages/Login.tsx`)

```typescript
import { signIn } from "../lib/auth";
import { useRedirectIfAuthenticated } from "../hooks/useAuth";
import { AlertCircle } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useRedirectIfAuthenticated();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Call Supabase login
    const result = await signIn({
      email: email.trim(),
      password,
    });

    if (!result.success) {
      setError(result.error || "Login failed");
      setIsLoading(false);
      return;
    }

    // Check if 2FA is enabled
    if (result.data.profile?.is_2fa_enabled) {
      // Navigate to OTP page
      handleNavigation("otp-verification");
      return;
    }

    // Check if user needs onboarding
    if (!result.data.profile?.has_seen_onboarding) {
      handleNavigation("onboarding");
      return;
    }

    // Navigate to dashboard
    handleNavigation("home");
  };

  // Add error display in UI
  {error && (
    <div className="mb-4 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
      <AlertCircle size={20} className="text-red-500" />
      <p className="text-sm text-red-400">{error}</p>
    </div>
  )}
}
```

### **Forgot Password Page** (`/pages/ForgotPassword.tsx`)

Replace the mock API call:

```typescript
import { sendPasswordResetEmail } from "../lib/auth";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateEmail(email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  setIsLoading(true);

  // Call Supabase forgot password
  const result = await sendPasswordResetEmail(email.trim());

  setIsLoading(false);

  // Always show success (security - don't reveal if email exists)
  setIsSubmitted(true);
};
```

### **Reset Password Page** (`/pages/ResetPassword.tsx`)

```typescript
import { updatePassword } from "../lib/auth";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validation
  if (passwordStrength.strength < 100) {
    setPasswordError("Password is not strong enough");
    return;
  }

  if (password !== confirmPassword) {
    setConfirmError("Passwords do not match");
    return;
  }

  setIsLoading(true);

  // Call Supabase update password
  const result = await updatePassword(password);

  if (!result.success) {
    setPasswordError(result.error || "Failed to reset password");
    setIsLoading(false);
    return;
  }

  setIsLoading(false);
  setIsSuccess(true);
};
```

### **Email Verification Page** (`/pages/EmailVerification.tsx`)

```typescript
import { resendVerificationEmail } from "../lib/auth";
import { useState, useEffect } from "react";

export function EmailVerification() {
  const [email, setEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    // Get email from sessionStorage (set during signup)
    const pendingEmail = sessionStorage.getItem('pendingVerificationEmail');
    if (pendingEmail) {
      setEmail(pendingEmail);
    }
  }, []);

  const handleResend = async () => {
    setIsResending(true);

    const result = await resendVerificationEmail(email);

    setIsResending(false);

    if (result.success) {
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  // Display masked email
  const maskedEmail = email ? email.replace(/(.{2})(.*)(?=@)/, '$1***') : '';
}
```

### **OTP Verification Page** (`/pages/OTPVerification.tsx`)

```typescript
import { verifyLoginOTP, getMFAFactors } from "../lib/auth";
import { useState, useEffect } from "react";

export function OTPVerification() {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [factorId, setFactorId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Get MFA factors
    const loadFactors = async () => {
      const result = await getMFAFactors();
      if (result.success && result.data.length > 0) {
        setFactorId(result.data[0].id);
      }
    };
    loadFactors();
  }, []);

  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    const result = await verifyLoginOTP(factorId, otpValue);

    if (!result.success) {
      setError(result.error || "Invalid code");
      setIsLoading(false);
      // Shake animation + clear OTP
      setOtp(["", "", "", "", "", ""]);
      return;
    }

    // OTP verified - navigate based on onboarding status
    // (Check profile.has_seen_onboarding)
    handleNavigation("onboarding"); // or "home"
  };
}
```

### **Onboarding Page** (`/pages/Onboarding.tsx`)

```typescript
import { completeOnboarding } from "../lib/auth";
import { useAuth } from "../hooks/useAuth";

export function Onboarding() {
  const { user, profile } = useAuth();

  const handleComplete = async () => {
    if (user) {
      // Mark onboarding as complete
      await completeOnboarding(user.id);

      // Navigate to dashboard
      handleNavigation("home");
    }
  };

  // Call handleComplete when user finishes onboarding
}
```

### **Protected Pages** (Dashboard, Features, etc.)

Add auth check to any protected page:

```typescript
import { useRequireAuth } from "../hooks/useAuth";

export function Dashboard() {
  // This will redirect to login if not authenticated
  const { user, profile, loading } = useRequireAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {profile?.full_name || user?.email}</h1>
      {/* Your dashboard content */}
    </div>
  );
}
```

---

## 🔄 Auth Callback Page

Create a callback handler for email confirmations and OAuth:

```typescript
// /pages/AuthCallback.tsx
import { useEffect } from "react";
import { supabase } from "../lib/supabase";

export function AuthCallback() {
  useEffect(() => {
    // Handle the auth callback
    const handleCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Error handling auth callback:', error);
        // Navigate to login with error
        if ((window as any).navigateTo) {
          (window as any).navigateTo('login');
        }
        return;
      }

      if (session) {
        // Check if user needs onboarding
        const { data: profile } = await supabase
          .from('profiles')
          .select('has_seen_onboarding')
          .eq('id', session.user.id)
          .single();

        if (!profile?.has_seen_onboarding) {
          if ((window as any).navigateTo) {
            (window as any).navigateTo('onboarding');
          }
        } else {
          if ((window as any).navigateTo) {
            (window as any).navigateTo('home');
          }
        }
      }
    };

    handleCallback();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#00FF88]/30 border-t-[#00FF88] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Verifying your email...</p>
      </div>
    </div>
  );
}
```

Don't forget to add the route in `App.tsx`:

```typescript
type PageType = "home" | ... | "auth-callback";

// In the return statement:
{currentPage === "auth-callback" && <AuthCallback />}
```

---

## 🔐 Logout Functionality

Add logout to your Navigation or user menu:

```typescript
import { signOut } from "../lib/auth";

const handleLogout = async () => {
  const result = await signOut();
  
  if (result.success) {
    // Clear any local state
    sessionStorage.clear();
    
    // Navigate to login
    handleNavigation("login");
  }
};

// In your UI:
<button onClick={handleLogout}>Logout</button>
```

---

## 📊 Using Auth State Globally

In your `App.tsx`, you can manage auth state:

```typescript
import { useAuth } from "./hooks/useAuth";

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const { user, profile, loading, isAuthenticated } = useAuth();

  // Make navigation function globally available
  useEffect(() => {
    (window as any).navigateTo = (page: PageType) => {
      setCurrentPage(page);
    };
  }, []);

  // Protect routes
  useEffect(() => {
    if (!loading) {
      const protectedPages: PageType[] = ["home", "pricing", "features"];
      
      if (protectedPages.includes(currentPage) && !isAuthenticated) {
        setCurrentPage("login");
      }

      // Redirect authenticated users away from auth pages
      const authPages: PageType[] = ["login", "signup", "forgot-password"];
      if (authPages.includes(currentPage) && isAuthenticated) {
        if (profile && !profile.has_seen_onboarding) {
          setCurrentPage("onboarding");
        } else {
          setCurrentPage("home");
        }
      }
    }
  }, [currentPage, isAuthenticated, loading, profile]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Your existing page rendering */}
    </>
  );
}
```

---

## 🎨 Error Handling UI Component

Create a reusable error display:

```typescript
// /components/ErrorAlert.tsx
import { AlertCircle, X } from "lucide-react";

interface ErrorAlertProps {
  message: string;
  onClose?: () => void;
}

export function ErrorAlert({ message, onClose }: ErrorAlertProps) {
  if (!message) return null;

  return (
    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-start gap-3">
      <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
      <p className="text-sm text-red-400 flex-1">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="text-red-400 hover:text-red-300 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}

// Usage in any form:
<ErrorAlert message={error} onClose={() => setError("")} />
```

---

## 🧪 Testing the Flow

### Test 1: Complete Signup Flow
```
1. Go to Signup page
2. Fill in: name, email, password
3. Accept terms
4. Click "Create Account"
5. Should redirect to Email Verification page
6. Check your email inbox
7. Click verification link
8. Should redirect to Login or Onboarding
9. Login if needed
10. Complete onboarding
11. Land on Dashboard
```

### Test 2: Login Flow
```
1. Go to Login page
2. Enter email/password
3. Click "Sign In"
4. If first login → Onboarding
5. Else → Dashboard
```

### Test 3: Forgot Password
```
1. Go to Login page
2. Click "Forgot password?"
3. Enter email
4. Click "Send Reset Link"
5. Check email
6. Click reset link
7. Enter new password
8. Click "Reset Password"
9. Redirect to Login
10. Login with new password
```

### Test 4: Email Resend
```
1. Sign up with new email
2. On Email Verification page
3. Wait 60 seconds
4. Click "Resend Verification Email"
5. Check inbox again
6. Click new link
```

---

## 🔒 Security Best Practices

### ✅ Already Implemented

1. **Row Level Security (RLS)** - Users can only access their own data
2. **Email enumeration protection** - Forgot password doesn't reveal if email exists
3. **Password requirements** - Enforced in UI and Supabase
4. **Secure session storage** - Handled by Supabase
5. **HTTPS redirects** - Configured in Supabase settings
6. **No service role key in client** - Only anon key exposed

### 🔐 Additional Recommendations

1. **Rate Limiting** - Enable in Supabase dashboard
2. **Email verification required** - Enable in Auth settings
3. **Password history** - Prevent password reuse (Supabase feature)
4. **Session timeout** - Configure in Supabase settings
5. **IP restrictions** - For admin actions
6. **Audit logging** - Track auth events

---

## 🐛 Common Issues & Solutions

### Issue: "Invalid API key"
**Solution:** Check `.env.local` has correct `VITE_SUPABASE_ANON_KEY`

### Issue: "Email not confirmed"
**Solution:** 
1. Check email spam folder
2. Verify redirect URL in Supabase settings
3. Try resend verification

### Issue: "Profile not found"
**Solution:** 
1. Check `profiles` table exists
2. Verify trigger `on_auth_user_created` is working
3. Manually insert profile if needed

### Issue: "Redirect URL not allowed"
**Solution:**
1. Go to Auth > URL Configuration
2. Add your URL to Redirect URLs list
3. Include wildcards for development: `http://localhost:3000/*`

### Issue: "Session not persisting"
**Solution:**
1. Check browser cookies are enabled
2. Verify `detectSessionInUrl: true` in supabase client config
3. Clear browser cache and try again

---

## 📈 Next Steps

### Phase 1: Basic Auth (Current)
- ✅ Email/password signup
- ✅ Email verification
- ✅ Login/logout
- ✅ Forgot/reset password
- ✅ Profile management
- ✅ Onboarding tracking

### Phase 2: Enhanced Security
- ⏳ Enable 2FA for all users
- ⏳ Add CAPTCHA on signup
- ⏳ Implement session timeout
- ⏳ Add password history
- ⏳ Enable audit logging

### Phase 3: OAuth & Social Login
- ⏳ Google OAuth
- ⏳ GitHub OAuth
- ⏳ Azure AD OAuth
- ⏳ LinkedIn OAuth

### Phase 4: Advanced Features
- ⏳ Magic link authentication
- ⏳ Phone number verification
- ⏳ Biometric authentication
- ⏳ Multi-device management
- ⏳ Security notifications

---

## 📞 Support & Resources

### Official Documentation
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript)
- [RLS Policies](https://supabase.com/docs/guides/auth/row-level-security)

### Community
- [Supabase Discord](https://discord.supabase.com)
- [GitHub Discussions](https://github.com/supabase/supabase/discussions)

### Your Files
- `/lib/auth.ts` - All auth functions
- `/hooks/useAuth.ts` - Auth state management
- `/supabase/schema.sql` - Database schema
- This file - Complete integration guide

---

## ✅ Checklist

Before going to production:

- [ ] Environment variables set in production
- [ ] Database schema deployed
- [ ] RLS policies enabled
- [ ] Email templates customized
- [ ] Redirect URLs configured for production
- [ ] Rate limiting enabled
- [ ] Email verification required
- [ ] Password requirements enforced
- [ ] Error handling tested
- [ ] All auth flows tested
- [ ] Session management working
- [ ] Logout functional
- [ ] Protected routes working
- [ ] OAuth configured (if needed)
- [ ] 2FA tested (if enabled)
- [ ] Monitoring set up

---

**Your Supabase auth infrastructure is ready! Just update the UI pages with the code snippets above.** 🚀

For questions or issues, check the Supabase docs or contact support@quantedge.com.
