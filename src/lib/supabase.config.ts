/**
 * ╔═══════════════════════════════════════════════════════════════════════╗
 * ║                    SUPABASE CONFIGURATION                             ║
 * ║                                                                       ║
 * ║  ⚠️  UPDATE THESE VALUES WITH YOUR SUPABASE CREDENTIALS             ║
 * ╚═══════════════════════════════════════════════════════════════════════╝
 * 
 * 🔐 Where to get your credentials:
 * 
 * 1. Go to: https://app.supabase.com
 * 2. Select your project (or create one if you haven't)
 * 3. Click "Settings" ⚙️  in the left sidebar
 * 4. Click "API" in the settings menu
 * 5. Copy these two values:
 *    - Project URL (looks like: https://xxxxx.supabase.co)
 *    - anon/public key (long string starting with eyJ...)
 * 
 * 📝 Then replace the placeholder values below with your actual credentials
 * 
 * ⏱️  Time to set up: ~2 minutes
 * 
 * 📚 For detailed instructions, see: /SETUP_INSTRUCTIONS.md
 */

// ╔═══════════════��═══════════════════════════════════════════════════════╗
// ║  👇 UPDATE THESE TWO VALUES BELOW 👇                                  ║
// ╚═══════════════════════════════════════════════════════════════════════╝

export const SUPABASE_CONFIG = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🌐 Your Supabase Project URL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ✅ CONFIGURED - Quant Edge Production
  // 
  url: 'https://vhgpqelboozsmsvsefht.supabase.co',
  
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 🔑 Your Supabase Anon/Public Key
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // ✅ CONFIGURED - Quant Edge Production
  // 
  // ⚠️  This is safe to use in the browser (it's public)
  // ⚠️  NEVER use the "service_role" key here!
  // 
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZoZ3BxZWxib296c21zdnNlZmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM0NDU3NjYsImV4cCI6MjA3OTAyMTc2Nn0.HmuaMgyMlTlQAk7uaQTYw2yPNh19hLgy_7_SWSXG41E',
};

// ============================================
// Helper function to check if configured
// ============================================
export function isSupabaseConfigured(): boolean {
  return (
    SUPABASE_CONFIG.url !== 'https://your-project-id.supabase.co' &&
    SUPABASE_CONFIG.anonKey !== 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-actual-key-here' &&
    SUPABASE_CONFIG.url.includes('supabase.co') &&
    SUPABASE_CONFIG.anonKey.startsWith('eyJ')
  );
}

/**
 * SETUP INSTRUCTIONS:
 * 
 * 1. Create Supabase Account
 *    - Go to https://supabase.com
 *    - Click "Start your project"
 *    - Sign up (free tier available)
 * 
 * 2. Create New Project
 *    - Click "New Project"
 *    - Name it (e.g., "Quant Edge")
 *    - Set database password
 *    - Choose region
 *    - Wait ~2 minutes for setup
 * 
 * 3. Get Credentials
 *    - In dashboard, click "Settings" > "API"
 *    - Copy "Project URL"
 *    - Copy "anon public" key
 * 
 * 4. Update This File
 *    - Replace the url above with your Project URL
 *    - Replace the anonKey above with your anon public key
 *    - Save the file
 * 
 * 5. Run Database Migration
 *    - In Supabase dashboard, go to SQL Editor
 *    - Copy all content from /supabase/schema.sql
 *    - Paste and click "Run"
 * 
 * 6. Configure Auth URLs
 *    - In Supabase, go to Authentication > URL Configuration
 *    - Site URL: http://localhost:3000
 *    - Redirect URLs: 
 *      - http://localhost:3000/auth/callback
 *      - http://localhost:3000/*
 * 
 * That's it! Your auth will work.
 */
