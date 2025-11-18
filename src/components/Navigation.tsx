import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import { SITE_CONFIG } from "../config/site";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsResourcesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (page: "home" | "about" | "features" | "pricing" | "contact" | "faqs" | "blog" | "testimonials" | "support" | "api-docs" | "release-notes" | "roadmap" | "login" | "signup") => {
    if ((window as any).navigateTo) {
      (window as any).navigateTo(page);
      window.scrollTo(0, 0);
      setIsMobileMenuOpen(false);
      setIsResourcesOpen(false);
    }
  };

  const resourcesItems = [
    { name: "Blog", onClick: () => handleNavigation("blog"), description: "Latest updates and insights" },
    { name: "Testimonials", onClick: () => handleNavigation("testimonials"), description: "What our users say" },
    { name: "FAQs", onClick: () => handleNavigation("faqs"), description: "Common questions answered" },
    {
      name: "Support / Help Center",
      onClick: () => handleNavigation("support"),
      description: "Get help when you need it",
    },
    { name: "API Docs", onClick: () => handleNavigation("api-docs"), description: "Developer documentation" },
    { name: "Release Notes", onClick: () => handleNavigation("release-notes"), description: `What's new in ${SITE_CONFIG.name}` },
    { name: "Roadmap", onClick: () => handleNavigation("roadmap"), description: "Our product vision" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-black/95 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavigation("home")}
              className="flex items-center gap-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#00FF88] to-[#00C8FF] rounded-lg flex items-center justify-center transition-transform group-hover:scale-110">
                <span className="text-black">Q</span>
              </div>
              <span className="text-xl">{SITE_CONFIG.name}</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <button
              onClick={() => handleNavigation("home")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavigation("features")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              Features
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavigation("pricing")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              Pricing
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>

            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                onMouseEnter={() => setIsResourcesOpen(true)}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group flex items-center gap-1"
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${
                    isResourcesOpen ? "rotate-180" : ""
                  }`}
                />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
              </button>

              {/* Dropdown Menu */}
              {isResourcesOpen && (
                <div
                  onMouseLeave={() => setIsResourcesOpen(false)}
                  className="absolute top-full left-0 mt-2 w-72 bg-black/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl shadow-black/50 py-2 animate-in fade-in slide-in-from-top-2 duration-200"
                >
                  {resourcesItems.map((item, index) => (
                    item.onClick ? (
                      <button
                        key={index}
                        onClick={item.onClick}
                        className="block w-full px-6 py-3 hover:bg-[#00FF88]/10 transition-colors group text-left"
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-white group-hover:text-[#00FF88] transition-colors">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {item.description}
                          </span>
                        </div>
                      </button>
                    ) : (
                      <a
                        key={index}
                        href={item.href}
                        className="block px-6 py-3 hover:bg-[#00FF88]/10 transition-colors group"
                        onClick={() => setIsResourcesOpen(false)}
                      >
                        <div className="flex flex-col">
                          <span className="text-sm text-white group-hover:text-[#00FF88] transition-colors">
                            {item.name}
                          </span>
                          <span className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                            {item.description}
                          </span>
                        </div>
                      </a>
                    )
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavigation("about")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              About
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavigation("contact")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>

            <button
              onClick={() => handleNavigation("login")}
              className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#00FF88] group-hover:w-full transition-all duration-300" />
            </button>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:block">
            <Button 
              onClick={() => handleNavigation("signup")}
              className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#00FF88]/20"
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavigation("home")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left"
              >
                Home
              </button>

              <button
                onClick={() => handleNavigation("features")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left"
              >
                Features
              </button>

              <button
                onClick={() => handleNavigation("pricing")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left"
              >
                Pricing
              </button>

              {/* Mobile Resources Accordion */}
              <div>
                <button
                  onClick={() => setIsMobileResourcesOpen(!isMobileResourcesOpen)}
                  className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left flex items-center gap-2 w-full"
                >
                  Resources
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-300 ${
                      isMobileResourcesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileResourcesOpen && (
                  <div className="ml-4 mt-3 space-y-3 border-l-2 border-[#00FF88]/20 pl-4">
                    {resourcesItems.map((item, index) => (
                      item.onClick ? (
                        <button
                          key={index}
                          onClick={item.onClick}
                          className="block text-sm text-gray-400 hover:text-[#00FF88] transition-colors text-left w-full"
                        >
                          {item.name}
                        </button>
                      ) : (
                        <a
                          key={index}
                          href={item.href}
                          className="block text-sm text-gray-400 hover:text-[#00FF88] transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.name}
                        </a>
                      )
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => handleNavigation("about")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left"
              >
                About
              </button>

              <button
                onClick={() => handleNavigation("contact")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors text-left"
              >
                Contact
              </button>

              <button
                onClick={() => handleNavigation("login")}
                className="text-sm text-gray-300 hover:text-[#00FF88] transition-colors"
              >
                Login
              </button>

              <Button 
                onClick={() => handleNavigation("signup")}
                className="bg-gradient-to-r from-[#00FF88] to-[#00C8FF] text-black hover:opacity-90 transition-opacity w-full"
              >
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}