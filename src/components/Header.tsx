import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/padel-ready-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Get all sections that might have dark backgrounds
      const darkSections = document.querySelectorAll('[data-nav-theme="dark"]');
      const header = document.querySelector('header');
      
      if (!header) return;
      
      const headerRect = header.getBoundingClientRect();
      const headerCenter = headerRect.top + (headerRect.height / 2);
      
      // Check if header center overlaps with any dark section
      let isOverDark = false;
      
      darkSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Check if header center is within this dark section
        if (rect.top <= headerCenter && rect.bottom >= headerCenter) {
          isOverDark = true;
        }
      });
      
      // Fallback: check if we're at the very top of the page (hero section)
      if (window.scrollY < 100) {
        isOverDark = true;
      }
      
      setIsDarkMode(isOverDark);
    };

    // Initial check with a small delay to ensure DOM is ready
    setTimeout(handleScroll, 100);
    
    // Add scroll listener with throttling for performance
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', scrollListener);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location.pathname]);

  const navLinkClass = `text-sm font-medium transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] ${
    isDarkMode 
      ? 'text-[#D6C2A8] hover:text-white/90' 
      : 'text-[#000000] hover:text-[#D6C2A8]'
  }`;

  const mobileLinkClass = `font-display text-2xl uppercase tracking-wide transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] py-3 ${
    isDarkMode
      ? 'text-[#D6C2A8] hover:text-white/90'
      : 'text-[#000000] hover:text-[#D6C2A8]'
  }`;

  const iconColor = isDarkMode ? '#D6C2A8' : '#000000';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-border/20 transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center transition-opacity duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:opacity-80">
              <img 
                src={logo} 
                alt="Padel Ready" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className={navLinkClass}>
                Shop
              </Link>
              <Link to="/about" className={navLinkClass}>
                About
              </Link>
              <Link to="/#events" className={navLinkClass}>
                Events
              </Link>
            </nav>

            {/* Mobile: Hamburger + Cart */}
            <div className="flex md:hidden items-center gap-3">
              <CartDrawer isDarkMode={isDarkMode} />
              <button
                onClick={toggleMobileMenu}
                className="p-2 transition-all duration-300"
                style={{ color: iconColor }}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Cart */}
            <div className="hidden md:block">
              <CartDrawer isDarkMode={isDarkMode} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop with blur */}
        <div
          className={`absolute inset-0 backdrop-blur-md transition-colors duration-300 ${
            isDarkMode ? 'bg-black/80' : 'bg-background/80'
          }`}
          onClick={closeMobileMenu}
        />
        
        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 backdrop-blur-lg border-b border-border/20 transition-all duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          } ${isDarkMode ? 'bg-black/95' : 'bg-background/95'}`}
        >
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              Shop
            </Link>
            <Link
              to="/about"
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              About
            </Link>
            <Link
              to="/#events"
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              Events
            </Link>
            <Link
              to="/#contact"
              onClick={closeMobileMenu}
              className={mobileLinkClass}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

    </>
  );
};
