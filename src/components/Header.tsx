import { Link } from "react-router-dom";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b border-border/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="font-display text-2xl tracking-tight">
            PADEL READY
          </Link>
          
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

          <CartDrawer />
        </div>
      </div>
    </header>
  );
};
