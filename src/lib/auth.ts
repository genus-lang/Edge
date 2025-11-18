import { supabase, Profile } from './supabase';
import { isSupabaseConfigured } from './supabase.config';
import { AuthError, Session, User } from '@supabase/supabase-js';

/**
 * Authentication utility functions
 * All auth operations should go through these functions
 */

const SETUP_ERROR = 'Supabase is not configured. Please update /lib/supabase.config.ts with your credentials. See /README_SETUP.md for details.';

// ============================================
// SIGNUP
// ============================================

export interface SignupData {
  email: string;
  password: string;
  fullName: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  data?: any;
}

/**
 * Sign up a new user with email/password
 * Creates both auth user and profile record
 * Sends verification email automatically
 */
export async function signUp({ email, password, fullName }: SignupData): Promise<AuthResult> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return { success: false, error: SETUP_ERROR };
  }

  try {
    // Sign up the user - Supabase will send verification email automatically
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect URL after email confirmation
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    // If signup successful, create profile record
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email: email,
          full_name: fullName,
          is_2fa_enabled: false,
          has_seen_onboarding: false,
        });

      if (profileError) {
        console.error('Error creating profile:', profileError);
        // Continue anyway - profile can be created later via trigger
      }
    }

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
        needsEmailVerification: !data.session, // No session means email not verified
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during signup' };
  }
}

// ============================================
// LOGIN
// ============================================

export interface LoginData {
  email: string;
  password: string;
}

/**
 * Sign in with email and password
 * Returns user, session, and profile data
 */
export async function signIn({ email, password }: LoginData): Promise<AuthResult> {
  // Check if Supabase is configured
  if (!isSupabaseConfigured()) {
    return { success: false, error: SETUP_ERROR };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    if (!data.session) {
      return { success: false, error: 'No session created. Please verify your email.' };
    }

    // Fetch user profile
    const profile = await getUserProfile(data.user.id);

    return {
      success: true,
      data: {
        user: data.user,
        session: data.session,
        profile,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during login' };
  }
}

// ============================================
// LOGOUT
// ============================================

/**
 * Sign out the current user
 */
export async function signOut(): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during logout' };
  }
}

// ============================================
// FORGOT PASSWORD
// ============================================

/**
 * Send password reset email
 * Does NOT reveal if email exists (security best practice)
 */
export async function sendPasswordResetEmail(email: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    // IMPORTANT: Always return success even if email doesn't exist
    // This prevents email enumeration attacks
    if (error && !error.message.includes('not found')) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: 'An error occurred. Please try again.' };
  }
}

// ============================================
// RESET PASSWORD
// ============================================

/**
 * Update user password (called from reset password page)
 * User must have valid reset token from email
 */
export async function updatePassword(newPassword: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred while resetting password' };
  }
}

// ============================================
// EMAIL VERIFICATION
// ============================================

/**
 * Resend verification email
 */
export async function resendVerificationEmail(email: string): Promise<AuthResult> {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred while resending email' };
  }
}

// ============================================
// OTP / 2FA
// ============================================

/**
 * Enroll user in 2FA (generates QR code for authenticator app)
 */
export async function enrollIn2FA(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: 'totp',
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return {
      success: true,
      data: {
        qrCode: data.totp.qr_code,
        secret: data.totp.secret,
        factorId: data.id,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during 2FA enrollment' };
  }
}

/**
 * Verify OTP code during 2FA enrollment
 */
export async function verifyEnrollmentOTP(factorId: string, code: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code,
    });

    if (error) {
      return { success: false, error: 'Invalid code. Please try again.' };
    }

    // Update profile to mark 2FA as enabled
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ is_2fa_enabled: true })
        .eq('id', user.id);
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during OTP verification' };
  }
}

/**
 * Verify OTP code during login (for users with 2FA enabled)
 */
export async function verifyLoginOTP(factorId: string, code: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.mfa.challengeAndVerify({
      factorId,
      code,
    });

    if (error) {
      return { success: false, error: 'Invalid code. Please try again.' };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during OTP verification' };
  }
}

/**
 * Challenge 2FA (sends OTP to user)
 */
export async function challenge2FA(factorId: string): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.mfa.challenge({
      factorId,
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during 2FA challenge' };
  }
}

/**
 * Get all MFA factors for current user
 */
export async function getMFAFactors(): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.mfa.listFactors();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data: data.totp };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred while fetching MFA factors' };
  }
}

// ============================================
// SESSION MANAGEMENT
// ============================================

/**
 * Get current session
 */
export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

// ============================================
// PROFILE MANAGEMENT
// ============================================

/**
 * Get user profile from database
 */
export async function getUserProfile(userId: string): Promise<Profile | null> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  userId: string,
  updates: Partial<Profile>
): Promise<AuthResult> {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred while updating profile' };
  }
}

/**
 * Mark onboarding as completed
 */
export async function completeOnboarding(userId: string): Promise<AuthResult> {
  return updateUserProfile(userId, { has_seen_onboarding: true });
}

// ============================================
// OAUTH (OPTIONAL)
// ============================================

/**
 * Sign in with OAuth provider (Google, GitHub, etc.)
 */
export async function signInWithOAuth(provider: 'google' | 'github' | 'azure'): Promise<AuthResult> {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'An error occurred during OAuth login' };
  }
}

// ============================================
// AUTH STATE LISTENER
// ============================================

/**
 * Subscribe to auth state changes
 * Call this once in your App component
 */
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange(callback);
}
