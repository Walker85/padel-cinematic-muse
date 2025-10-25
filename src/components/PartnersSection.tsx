import { useEffect, useRef, useState } from "react";

const partners = [
  { name: "Soho House", width: 140 },
  { name: "Babington House", width: 160 },
  { name: "The Padel Club", width: 150 },
  { name: "Wilson Elite Program", width: 180 },
  { name: "Royal Padel Centre", width: 170 },
];

export const PartnersSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-32 bg-background border-t border-primary/20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            Trusted by Leading Clubs and Partners
          </h2>
          <p className="text-muted-foreground text-lg font-light max-w-2xl mx-auto">
            Collaborating with the world's most prestigious venues and brands
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12 items-center justify-items-center">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
              }}
            >
              <div className="group relative">
                {/* Placeholder logo - will be replaced with actual logos */}
                <div 
                  className="flex items-center justify-center h-20 px-6 bg-secondary/5 rounded-lg border border-secondary/10 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-primary/5"
                  style={{ width: `${partner.width}px` }}
                >
                  <span className="font-display text-xs tracking-wider text-secondary/60 group-hover:text-primary transition-colors duration-300 text-center">
                    {partner.name}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};