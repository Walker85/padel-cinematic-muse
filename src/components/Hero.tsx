import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-padel-court.jpg";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 parallax"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background z-10"></div>
        <img 
          src={heroImage} 
          alt="Luxury padel court at sunset" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 py-32 relative z-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 
            className="font-display text-6xl md:text-8xl lg:text-9xl text-white animate-fade-in"
            style={{ 
              letterSpacing: '0.04em',
              textShadow: '0 4px 20px rgba(0,0,0,0.3)' 
            }}
          >
            PADEL, PERFECTED.
          </h1>
          
          <p 
            className="text-xl md:text-2xl text-primary max-w-2xl mx-auto font-body animate-fade-in"
            style={{ 
              animationDelay: '0.3s',
              opacity: 0,
              letterSpacing: '0.04em',
              textShadow: '0 2px 10px rgba(0,0,0,0.3)'
            }}
          >
            Precision. Purpose. Padel Ready.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in"
            style={{ animationDelay: '0.6s', opacity: 0 }}
          >
            <Button 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-display tracking-wide hover-glow border-none"
              onClick={scrollToProducts}
            >
              EXPLORE COLLECTION
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
