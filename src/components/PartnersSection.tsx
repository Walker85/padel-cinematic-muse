import { useEffect, useRef, useState } from "react";
import sohoHouseLogo from "@/assets/soho-house-logo.jpg";
import racketGardenLogo from "@/assets/racket-garden-logo.avif";

const partners = [
  { name: "Soho House", logo: sohoHouseLogo },
  { name: "Racket Garden", logo: racketGardenLogo },
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

        <div className="flex flex-wrap gap-12 lg:gap-16 items-center justify-center">
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
                <div className="flex items-center justify-center h-24 px-8 transition-all duration-300 grayscale hover:grayscale-0 opacity-60 hover:opacity-100">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="h-full w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};