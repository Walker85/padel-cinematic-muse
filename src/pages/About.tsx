import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function About() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToProducts = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.location.href = "/#products";
    }, 300);
  };

  return (
    <>
      <Helmet>
        <title>Padel Ready × Babington House – Minimalist Design Meets Performance</title>
        <meta 
          name="description" 
          content="Padel Ready × Babington House – A Somerset collaboration celebrating design, craft, and community." 
        />
        <meta 
          name="keywords" 
          content="Padel Ready Babington House, padel rackets, premium padel brand, Somerset design, minimalist sports design, Babington House, creative sports equipment, performance padel" 
        />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-background to-primary/10">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-primary/10 pointer-events-none"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-20">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-foreground tracking-tight leading-tight uppercase">
              Padel Ready
              <span className="block mt-4 relative">
                By Creatives, For Creatives.
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-primary rounded-full animate-fade-in" 
                      style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }} />
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
              Where Somerset craftsmanship meets modern design.<br />
              Born from the community at Babington House.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-muted animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="font-display text-4xl text-muted-foreground/30 uppercase tracking-wider">
                  Somerset Studio
                </p>
              </div>
            </div>
            
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <h2 className="font-display text-4xl md:text-5xl text-foreground tracking-tight leading-tight uppercase">
                Our Story
              </h2>
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Padel Ready began in Somerset, surrounded by designers, musicians, and makers who value balance over excess.
                </p>
                
                <p>
                  What started as a conversation at Babington House became a pursuit of precision — creating equipment that performs beautifully and looks timeless.
                </p>
                
                <p>
                  Each racket reflects that mindset: design-driven, purpose-built, and always refined.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Babington House Collaboration Hero with Parallax */}
      <section className="relative w-full h-[70vh] md:h-[90vh] flex items-center justify-center overflow-hidden animate-fade-in" style={{ animationDuration: "800ms" }}>
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(/images/soho-house-hero-new.png)`,
            transform: `translateY(${scrollY * 0.5}px)`,
            filter: 'brightness(0.85) saturate(1.08)',
          }}
        />
        
        {/* Warm Gold Tint Overlay */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.85))',
            mixBlendMode: 'multiply',
          }}
        />
        
        {/* Vignette Effect */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
          }}
        />
        
        {/* Bottom Gradient Transition */}
        <div 
          className="absolute inset-0" 
          style={{ 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0) 60%, #FEFAF3 100%)',
          }}
        />
        
        {/* Content */}
        <div className="relative z-10 text-center px-4 space-y-4 animate-fade-in" style={{ animationDuration: "800ms" }}>
          <h2 className="font-display text-6xl lg:text-7xl tracking-wider leading-tight uppercase" style={{ color: '#D6C2A8' }}>
            Padel Ready × Babington House
          </h2>
          <p className="text-lg md:text-xl font-light leading-relaxed mt-4" style={{ color: 'rgba(255,255,255,0.85)' }}>
            Where design, sport, and community converge.
          </p>
        </div>
      </section>

      {/* Brand Story: By Creatives, For Creatives */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="font-display text-5xl md:text-6xl text-foreground tracking-tight leading-tight uppercase">
              By Creatives, For Creatives
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-muted-foreground leading-relaxed">
              <p>
                Padel Ready was born from a simple belief: sport should inspire the same care and creativity as art.
              </p>
              
              <p>
                We're not athletes. We're designers, artists, and makers who found padel — and decided to build something different.
              </p>
              
              <p>
                Every racket is designed with the same intention we bring to our work: precision, purpose, and a refusal to settle for ordinary.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Babington House Collaboration */}
      <section className="py-32 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl text-primary tracking-tight leading-tight uppercase">
              In Collaboration with Babington House
            </h2>
            
            <div className="space-y-6 text-lg md:text-xl text-background/90 leading-relaxed italic">
              <p>
                More than a location — a philosophy.
              </p>
              
              <p>
                Padel Ready shares Babington House's belief that creativity thrives in simplicity.
              </p>
              
              <p>
                Together, we've built a space where design, sport, and community converge.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Design Philosophy */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-center text-foreground tracking-tight leading-tight uppercase mb-16 animate-fade-in">
              Design Philosophy
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Engineering First",
                  description: "Designed through iteration, tested through performance.",
                  delay: "0s"
                },
                {
                  title: "Minimalism as Craft",
                  description: "Every line serves purpose. Nothing else.",
                  delay: "0.1s"
                },
                {
                  title: "Designed in Somerset",
                  description: "Created near Babington House, inspired by the creative community.",
                  delay: "0.2s"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="border border-border rounded-xl bg-card p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] animate-fade-in"
                  style={{ animationDelay: item.delay }}
                >
                  <h3 className="font-display text-2xl text-foreground uppercase tracking-wide mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brand Manifesto Section */}
      <section className="py-32 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="font-display text-3xl md:text-4xl lg:text-5xl text-background uppercase tracking-wide leading-[1.4] space-y-4">
              <p>We build for people who think differently.</p>
              <p>Designers. Artists. Players. Makers.</p>
              <p>Padel Ready is for those who treat the court like a canvas.</p>
              <p className="text-primary animate-pulse" style={{ letterSpacing: "0.05em" }}>
                By creatives, for creatives.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-40 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-8 animate-fade-in">
            <h2 className="font-display text-5xl md:text-6xl text-foreground tracking-tight leading-tight uppercase">
              Play with Purpose
            </h2>
            
            <Button
              onClick={scrollToProducts}
              size="lg"
              className="bg-foreground text-background hover:bg-primary hover:text-secondary transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,194,168,0.4)] px-12 hover:-translate-y-1"
            >
              Explore Collection
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
