import { Link } from "react-router-dom";
import { Instagram, Youtube, Linkedin } from "lucide-react";
import logo from "@/assets/padel-ready-logo.png";

export const Footer = () => {
  return (
    <footer 
      data-nav-theme="dark"
      className="bg-secondary text-secondary-foreground"
    >
      <div className="container mx-auto px-4 lg:px-8 py-20">
        {/* Top border with gold accent */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-16"></div>
        
        <div className="grid md:grid-cols-4 gap-12 lg:gap-16 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="block">
              <img src={logo} alt="Padel Ready" className="h-12 w-auto mb-4" />
            </Link>
            <p className="text-sm text-secondary-foreground/70 font-light leading-relaxed">
              Precision. Purpose. Padel Ready.
            </p>
          </div>
          
          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider text-secondary-foreground/90">
              Navigation
            </h4>
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light"
              >
                Home
              </Link>
              <Link 
                to="/#products" 
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light"
              >
                Shop
              </Link>
              <Link 
                to="/#about" 
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light"
              >
                About
              </Link>
              <Link 
                to="/partner" 
                className="text-sm text-secondary-foreground/60 hover:text-primary transition-colors duration-300 font-light"
              >
                Contact
              </Link>
            </nav>
          </div>
          
          {/* Partners Column */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider text-secondary-foreground/90">
              Partners
            </h4>
            <nav className="flex flex-col space-y-3">
              <span className="text-sm text-secondary-foreground/60 font-light">
                Soho House
              </span>
              <span className="text-sm text-secondary-foreground/60 font-light">
                Babington House
              </span>
              <span className="text-sm text-secondary-foreground/60 font-light">
                The Padel Club
              </span>
            </nav>
          </div>
          
          {/* Social Column */}
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider text-secondary-foreground/90">
              Connect
            </h4>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-secondary-foreground/60 hover:text-primary transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom border with gold accent */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mb-8"></div>
        
        <div className="text-center">
          <p className="text-xs text-secondary-foreground/40 font-light">
            © {new Date().getFullYear()} Padel Ready. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
