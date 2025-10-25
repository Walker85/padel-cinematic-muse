import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground border-t border-primary/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl tracking-tight">PADEL READY</h3>
            <p className="text-sm text-secondary-foreground/70 font-light">
              Precision engineering meets luxury minimalism.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider">Shop</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                All Products
              </Link>
              <Link to="/" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                New Arrivals
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider">About</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/#about" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Our Story
              </Link>
              <Link to="/#technology" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Technology
              </Link>
            </nav>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-display text-sm uppercase tracking-wider">Connect</h4>
            <nav className="flex flex-col space-y-2">
              <a href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Instagram
              </a>
              <a href="#" className="text-sm text-secondary-foreground/70 hover:text-primary transition-colors">
                Contact
              </a>
            </nav>
          </div>
        </div>
        
        <div className="pt-8 border-t border-primary/20">
          <p className="text-sm text-secondary-foreground/50 text-center font-light">
            © {new Date().getFullYear()} Padel Ready. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
