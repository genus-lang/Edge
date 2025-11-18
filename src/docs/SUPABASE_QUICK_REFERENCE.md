# 🚀 Supabase Auth - Quick Reference

## Installation

```bash
npm install @supabase/supabase-js
```

## Environment Setup

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Import in Any File

```typescript
import { signUp, signIn, signOut, sendPasswordResetEmail, updatePassword } from "../lib/auth";
import { useAuth, useRequireAuth, useRedirectIfAuthenticated } from "../hooks/useAuth";
```

---

## Common Auth Operations

### Signup
```typescript
const result = await signUp({
  email: "user@example.com",
  password: "password123",
  fullName: "John Doe"
});

if (result.success) {
  // Navigate to email verification
} else {
  // Show error: result.error
}
```

### Login
```typescript
const result = await signIn({
  email: "user@example.com",
  password: "password123"
});

if (result.success) {
  // Check 2FA: result.data.profile.is_2fa_enabled
  // Check onboarding: result.data.profile.has_seen_onboarding
} else {
  // Show error: result.error
}
```

### Logout
```typescript
const result = await signOut();
if (result.success) {
  // Redirect to login
}
```

### Forgot Password
```typescript
const result = await sendPasswordResetEmail("user@example.com");
// Always shows success (security)
```

### Reset Password
```typescript
const result = await updatePassword("newPassword123");
if (result.success) {
  // Redirect to login
}
```

### Resend Verification Email
```typescript
const result = await resendVerificationEmail("user@example.com");
```

---

## Using Auth Hooks

### Get Current Auth State
```typescript
function MyComponent() {
  const { user, profile, loading, isAuthenticated } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {profile?.full_name}</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

### Protect a Page (Require Auth)
```typescript
function Dashboard() {
  const { user, profile, loading } = useRequireAuth();
  // Automatically redirects to login if not authenticated

  if (loading) return <div>Loading...</div>;

  return <div>Protected content</div>;
}
```

### Redirect If Already Logged In
```typescript
function LoginPage() {
  useRedirectIfAuthenticated(); // Redirects to home if logged in

  return <div>Login form</div>;
}
```

---

## Profile Operations

### Get User Profile
```typescript
import { getUserProfile } from "../lib/auth";

const profile = await getUserProfile(userId);
```

### Update Profile
```typescript
import { updateUserProfile } from "../lib/auth";

await updateUserProfile(userId, {
  full_name: "New Name",
  has_seen_onboarding: true
});
```

### Complete Onboarding
```typescript
import { completeOnboarding } from "../lib/auth";

await completeOnboarding(userId);
```

---

## Session Management

### Get Current Session
```typescript
import { getSession, getCurrentUser, isAuthenticated } from "../lib/auth";

const session = await getSession();
const user = await getCurrentUser();
const authed = await isAuthenticated();
```

### Listen to Auth Changes
```typescript
import { onAuthStateChange } from "../lib/auth";

useEffect(() => {
  const { data: { subscription } } = onAuthStateChange((event, session) => {
    console.log('Auth event:', event);
    console.log('Session:', session);
  });

  return () => subscription.unsubscribe();
}, []);
```

---

## 2FA / OTP

### Enroll in 2FA
```typescript
import { enrollIn2FA, verifyEnrollmentOTP } from "../lib/auth";

// Step 1: Get QR code
const result = await enrollIn2FA();
if (result.success) {
  const { qrCode, secret, factorId } = result.data;
  // Show QR code to user
}

// Step 2: Verify code from authenticator app
const verified = await verifyEnrollmentOTP(factorId, "123456");
```

### Verify OTP on Login
```typescript
import { verifyLoginOTP, getMFAFactors } from "../lib/auth";

// Get factor ID
const factors = await getMFAFactors();
const factorId = factors.data[0].id;

// Verify OTP
const result = await verifyLoginOTP(factorId, "123456");
```

---

## OAuth Login

```typescript
import { signInWithOAuth } from "../lib/auth";

// Google
await signInWithOAuth('google');

// GitHub
await signInWithOAuth('github');

// Azure
await signInWithOAuth('azure');
```

---

## Error Handling Pattern

```typescript
const [error, setError] = useState("");

const handleAction = async () => {
  setError("");
  
  const result = await someAuthFunction();
  
  if (!result.success) {
    setError(result.error || "An error occurred");
    return;
  }
  
  // Success - proceed
};

// In UI:
{error && <div className="error">{error}</div>}
```

---

## Common Patterns

### Form Submission with Loading
```typescript
const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  const result = await signIn({ email, password });

  if (!result.success) {
    setError(result.error);
    setIsLoading(false);
    return;
  }

  // Navigate on success
  handleNavigation("home");
};
```

### Conditional Navigation Based on State
```typescript
const result = await signIn({ email, password });

if (result.success) {
  if (result.data.profile?.is_2fa_enabled) {
    handleNavigation("otp-verification");
  } else if (!result.data.profile?.has_seen_onboarding) {
    handleNavigation("onboarding");
  } else {
    handleNavigation("home");
  }
}
```

### Email Masking for Privacy
```typescript
const maskEmail = (email: string): string => {
  return email.replace(/(.{2})(.*)(?=@)/, '$1***');
};

// "john.doe@example.com" → "jo***@example.com"
```

---

## Supabase Dashboard Quick Links

- **SQL Editor**: Run migrations
- **Table Editor**: View/edit profiles table
- **Authentication**: Manage users
- **Auth > Users**: See all registered users
- **Auth > Providers**: Enable OAuth
- **Auth > Email Templates**: Customize emails
- **Auth > URL Configuration**: Set redirect URLs
- **Settings > API**: Get credentials

---

## Testing Commands

```bash
# Check if Supabase is connected
console.log(await supabase.auth.getSession());

# Create test user
await signUp({
  email: "test@example.com",
  password: "Test123!@#",
  fullName: "Test User"
});

# Check profile was created
const profile = await getUserProfile(userId);
console.log(profile);
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Invalid API key" | Check `.env.local` has correct anon key |
| "Email not confirmed" | Check spam folder, verify redirect URLs |
| "Profile not found" | Run schema.sql, check trigger |
| "Redirect URL not allowed" | Add URL to Supabase Auth settings |
| "Session not persisting" | Enable cookies, check client config |

---

## Production Checklist

- [ ] `.env` variables set in hosting platform
- [ ] Database schema deployed
- [ ] RLS policies enabled
- [ ] Production URLs in Supabase Auth settings
- [ ] Email templates customized
- [ ] Email verification required
- [ ] Rate limiting enabled
- [ ] Test all auth flows
- [ ] Error handling in place
- [ ] Monitoring configured

---

**For full documentation, see `/docs/SUPABASE_INTEGRATION_GUIDE.md`**
