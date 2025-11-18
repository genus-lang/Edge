import { Youtube, Twitter, Linkedin, Github } from "lucide-react";
import { SITE_CONFIG } from "../config/site";

export function Footer() {
  const handleNavigation = (page: "home" | "about" | "contact" | "features" | "pricing" | "faqs" | "blog" | "testimonials" | "careers" | "terms" | "privacy" | "refund" | "support" | "compliance" | "security" | "api-docs" | "release-notes" | "roadmap") => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
    }
  };

  const footerLinks = {
    Product: [
      {
        name: "Features",
        href: "#features",
        onClick: () => handleNavigation("features"),
      },
      {
        name: "Pricing",
        href: "#pricing",
        onClick: () => handleNavigation("pricing"),
      },
      { name: "Roadmap", href: "#roadmap", onClick: () => handleNavigation("roadmap") },
      { name: "Release Notes", href: "#release-notes", onClick: () => handleNavigation("release-notes") },
    ],
    Company: [
      {
        name: "About Us",
        href: "#about",
        onClick: () => handleNavigation("about"),
      },
      { name: "Careers", href: "#careers", onClick: () => handleNavigation("careers") },
      {
        name: "Contact Us",
        href: "#contact",
        onClick: () => handleNavigation("contact"),
      },
      { name: "Blog", href: "#blog", onClick: () => handleNavigation("blog") },
      { name: "Testimonials", href: "#testimonials", onClick: () => handleNavigation("testimonials") },
    ],
    Support: [
      { name: "FAQs", href: "#faqs", onClick: () => handleNavigation("faqs") },
      { name: "Support / Help Center", href: "#support", onClick: () => handleNavigation("support") },
      { name: "API Documentation", href: "#api-docs", onClick: () => handleNavigation("api-docs") },
    ],
    Legal: [
      { name: "Terms & Conditions", href: "#terms", onClick: () => handleNavigation("terms") },
      { name: "Privacy Policy", href: "#privacy", onClick: () => handleNavigation("privacy") },
      { name: "Refund Policy", href: "#refund", onClick: () => handleNavigation("refund") },
      { name: "Security", href: "#security", onClick: () => handleNavigation("security") },
      { name: "Legal & Compliance", href: "#compliance", onClick: () => handleNavigation("compliance") },
    ],
  };

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#twitter" },
    { name: "LinkedIn", icon: Linkedin, href: "#linkedin" },
    { name: "GitHub", icon: Github, href: "#github" },
    { name: "YouTube", icon: Youtube, href: "#youtube" },
  ];

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-black to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Logo & Description Column */}
          <div className="col-span-2 md:col-span-1">
            <button
              onClick={() => handleNavigation("home")}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-black">Q</span>
              </div>
              <span className="text-xl">{SITE_CONFIG.name}</span>
            </button>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              {SITE_CONFIG.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-white/5 hover:bg-gradient-to-br hover:from-[#00FF88]/20 hover:to-[#00C8FF]/20 border border-white/10 hover:border-[#00FF88]/50 flex items-center justify-center transition-all duration-300 group"
                  aria-label={social.name}
                >
                  <social.icon size={18} className="text-gray-400 group-hover:text-[#00FF88]" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-sm uppercase tracking-wider text-white/90">
                {category}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    {link.onClick ? (
                      <button
                        onClick={link.onClick}
                        className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors duration-200 text-left"
                      >
                        {link.name}
                      </button>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-gray-400 hover:text-[#00FF88] transition-colors duration-200 block"
                      >
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {SITE_CONFIG.currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>

            {/* Additional Links */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <a href="#sitemap" className="hover:text-[#00FF88] transition-colors">
                Sitemap
              </a>
              <a href="#status" className="hover:text-[#00FF88] transition-colors">
                Status
              </a>
              <div className="flex items-center gap-2">
                <span>🌐</span>
                <select className="bg-transparent border border-white/10 rounded px-2 py-1 text-sm text-gray-400 hover:border-[#00FF88]/50 transition-colors cursor-pointer">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle gradient accent */}
      <div className="h-1 bg-gradient-to-r from-transparent via-[#00FF88]/30 to-transparent" />
    </footer>
  );
}