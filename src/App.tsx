import { useState } from "react";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Features } from "./pages/Features";
import { Pricing } from "./pages/Pricing";
import { FAQs } from "./pages/FAQs";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Testimonials } from "./pages/Testimonials";
import { Careers } from "./pages/Careers";
import { TermsAndConditions } from "./pages/TermsAndConditions";
import { PrivacyPolicy } from "./pages/PrivacyPolicy";
import { RefundPolicy } from "./pages/RefundPolicy";
import { SupportHelpCenter } from "./pages/SupportHelpCenter";
import { LegalCompliance } from "./pages/LegalCompliance";
import { Security } from "./pages/Security";
import { ApiDocs } from "./pages/ApiDocs";
import { ReleaseNotes } from "./pages/ReleaseNotes";
import { Roadmap } from "./pages/Roadmap";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { OTPVerification } from "./pages/OTPVerification";
import { EmailVerification } from "./pages/EmailVerification";
import { Onboarding } from "./pages/Onboarding";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { AuthCallback } from "./pages/AuthCallback";
import { Dashboard } from "./pages/Dashboard";
import { SupabaseSetupWarning } from "./components/SupabaseSetupWarning";

type PageType = "home" | "about" | "contact" | "features" | "pricing" | "faqs" | "blog" | "testimonials" | "careers" | "terms" | "privacy" | "refund" | "support" | "compliance" | "security" | "api-docs" | "release-notes" | "roadmap" | "login" | "signup" | "forgot-password" | "reset-password" | "otp-verification" | "email-verification" | "onboarding" | "search-results" | "auth-callback" | "dashboard";

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | null>(null);

  // Make page setter available globally
  (window as any).navigateTo = (page: PageType) => {
    setCurrentPage(page);
    setCurrentBlogPostId(null);
  };

  // Make blog post navigation available globally
  (window as any).navigateToBlogPost = (postId: string) => {
    setCurrentPage("blog");
    setCurrentBlogPostId(postId);
  };

  // If we have a blog post ID, show the blog post page
  if (currentPage === "blog" && currentBlogPostId) {
    return <BlogPost postId={currentBlogPostId} />;
  }

  return (
    <>
      {currentPage === "home" && <Home />}
      {currentPage === "about" && <About />}
      {currentPage === "contact" && <Contact />}
      {currentPage === "features" && <Features />}
      {currentPage === "pricing" && <Pricing />}
      {currentPage === "faqs" && <FAQs />}
      {currentPage === "blog" && <Blog />}
      {currentPage === "testimonials" && <Testimonials />}
      {currentPage === "careers" && <Careers />}
      {currentPage === "terms" && <TermsAndConditions />}
      {currentPage === "privacy" && <PrivacyPolicy />}
      {currentPage === "refund" && <RefundPolicy />}
      {currentPage === "support" && <SupportHelpCenter />}
      {currentPage === "compliance" && <LegalCompliance />}
      {currentPage === "security" && <Security />}
      {currentPage === "api-docs" && <ApiDocs />}
      {currentPage === "release-notes" && <ReleaseNotes />}
      {currentPage === "roadmap" && <Roadmap />}
      {currentPage === "login" && <Login />}
      {currentPage === "signup" && <Signup />}
      {currentPage === "forgot-password" && <ForgotPassword />}
      {currentPage === "reset-password" && <ResetPassword />}
      {currentPage === "otp-verification" && <OTPVerification />}
      {currentPage === "email-verification" && <EmailVerification />}
      {currentPage === "onboarding" && <Onboarding />}
      {currentPage === "auth-callback" && <AuthCallback />}
      {currentPage === "search-results" && <SearchResultsPage />}
      {currentPage === "dashboard" && <Dashboard />}
      
      {/* Supabase Setup Warning - shows when not configured */}
      <SupabaseSetupWarning />
    </>
  );
}