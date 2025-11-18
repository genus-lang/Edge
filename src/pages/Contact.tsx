import { Navigation } from "../components/Navigation";
import { ContactHeader } from "../components/contact/ContactHeader";
import { ContactForm } from "../components/contact/ContactForm";
import { DirectSupport } from "../components/contact/DirectSupport";
import { OfficeLocation } from "../components/contact/OfficeLocation";
import { SocialConnect } from "../components/contact/SocialConnect";
import { HelpCenterCTA } from "../components/contact/HelpCenterCTA";
import { Footer } from "../components/Footer";

export function Contact() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <ContactHeader />
      <ContactForm />
      <DirectSupport />
      <OfficeLocation />
      <SocialConnect />
      <HelpCenterCTA />
      <Footer />
    </div>
  );
}
