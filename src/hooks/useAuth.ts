import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, Profile } from '../lib/supabase';
import { getCurrentUser, getUserProfile, onAuthStateChange } from '../lib/auth';

interface AuthState {
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

/**
 * Custom hook for managing authentication state
 * Use this in components that need auth information
 */
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    // Check current session on mount
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const profile = await getUserProfile(session.user.id);
          setAuthState({
            user: session.user,
            profile,
            session,
            loading: false,
            isAuthenticated: true,
          });
        } else {
          setAuthState({
            user: null,
            profile: null,
            session: null,
            loading: false,
            isAuthenticated: false,
          });
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState({
          user: null,
          profile: null,
          session: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event);

      if (session?.user) {
        const profile = await getUserProfile(session.user.id);
        setAuthState({
          user: session.user,
          profile,
          session,
          loading: false,
          isAuthenticated: true,
        });
      } else {
        setAuthState({
          user: null,
          profile: null,
          session: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    });

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return authState;
}

/**
 * Hook to require authentication
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo: string = 'login') {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && !auth.isAuthenticated) {
      if ((window as any).navigateTo) {
        (window as any).navigateTo(redirectTo);
      }
    }
  }, [auth.loading, auth.isAuthenticated, redirectTo]);

  return auth;
}

/**
 * Hook to redirect if already authenticated
 * Use on login/signup pages
 */
export function useRedirectIfAuthenticated(redirectTo: string = 'home') {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.loading && auth.isAuthenticated) {
      // Check if user has seen onboarding
      if (auth.profile && !auth.profile.has_seen_onboarding) {
        if ((window as any).navigateTo) {
          (window as any).navigateTo('onboarding');
        }
      } else {
        if ((window as any).navigateTo) {
          (window as any).navigateTo(redirectTo);
        }
      }
    }
  }, [auth.loading, auth.isAuthenticated, auth.profile, redirectTo]);

  return auth;
}
