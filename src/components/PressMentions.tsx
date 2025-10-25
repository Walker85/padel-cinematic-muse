import { useEffect, useRef, useState } from "react";

const pressOutlets = [
  "Men's Health",
  "GQ",
  "Esquire",
  "The Times",
];

export const PressMentions = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-muted/10 border-y border-primary/10"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h3 className="font-display text-2xl md:text-3xl tracking-tight text-muted-foreground/70 mb-2">
            As Featured In
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16 lg:gap-20">
          {pressOutlets.map((outlet, index) => (
            <div
              key={outlet}
              className={`transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Placeholder - will be replaced with actual logos */}
              <div className="flex items-center justify-center h-12 px-8 bg-secondary/5 rounded border border-secondary/10">
                <span className="font-display text-sm tracking-wider text-secondary/50">
                  {outlet}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};