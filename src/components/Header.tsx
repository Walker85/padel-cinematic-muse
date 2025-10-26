import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { CartDrawer } from "./CartDrawer";
import logo from "@/assets/padel-ready-logo.png";

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-border/20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="Padel Ready" className="h-8 md:h-10 w-auto" />
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
                Shop
              </Link>
              <Link to="/#technology" className="text-sm font-medium hover:text-primary transition-colors">
                Technology
              </Link>
              <Link to="/#about" className="text-sm font-medium hover:text-primary transition-colors">
                About
              </Link>
            </nav>

            {/* Mobile: Hamburger + Cart */}
            <div className="flex md:hidden items-center gap-3">
              <CartDrawer />
              <button
                onClick={toggleMobileMenu}
                className="p-2 hover:text-primary transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Desktop Cart */}
            <div className="hidden md:block">
              <CartDrawer />
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
          className="absolute inset-0 bg-background/80 backdrop-blur-md"
          onClick={closeMobileMenu}
        />
        
        {/* Menu Content */}
        <div
          className={`absolute top-20 left-0 right-0 bg-background/95 backdrop-blur-lg border-b border-border/20 transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <nav className="container mx-auto px-4 py-8 flex flex-col gap-6">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="font-display text-2xl uppercase tracking-wide hover:text-primary transition-colors py-3"
            >
              Shop
            </Link>
            <Link
              to="/#technology"
              onClick={closeMobileMenu}
              className="font-display text-2xl uppercase tracking-wide hover:text-primary transition-colors py-3"
            >
              Technology
            </Link>
            <Link
              to="/#about"
              onClick={closeMobileMenu}
              className="font-display text-2xl uppercase tracking-wide hover:text-primary transition-colors py-3"
            >
              About
            </Link>
            <Link
              to="/#contact"
              onClick={closeMobileMenu}
              className="font-display text-2xl uppercase tracking-wide hover:text-primary transition-colors py-3"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>

    </>
  );
};
