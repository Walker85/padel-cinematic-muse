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
      className="py-20 md:py-28 bg-background border-t border-primary/20"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <h2 className="font-display text-4xl md:text-5xl tracking-tight mb-4">
            Trusted by Leading Clubs and Partners
          </h2>
          <p className="text-muted-foreground text-lg font-light">
            Collaborating with the world's most prestigious venues and brands
          </p>
        </div>

        {/* Partner Logos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-4 md:gap-x-8 md:gap-y-5 lg:gap-x-10 lg:gap-y-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <div
              key={partner.name}
              className={`flex items-center justify-center transition-all duration-700 motion-reduce:transition-none ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="group relative w-full flex items-center justify-center">
                <img 
                  src={partner.logo} 
                  alt={`${partner.name} logo`}
                  loading="lazy"
                  className="
                    max-h-[80px] md:max-h-[108px] lg:max-h-[124px]
                    w-auto object-contain mx-auto
                    grayscale opacity-90
                    hover:grayscale-0 hover:opacity-100
                    transition-all duration-500 ease-out
                    motion-reduce:transition-none
                    hover:scale-[1.05]
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                  "
                  tabIndex={0}
                  role="img"
                  aria-label={`${partner.name} - Official Partner`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};