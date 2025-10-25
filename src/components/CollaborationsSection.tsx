import { Button } from "@/components/ui/button";

export const CollaborationsSection = () => {
  return (
    <section className="relative py-40 bg-secondary overflow-hidden">
      {/* Cinematic overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-slow">
          <div className="space-y-4">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary tracking-tight leading-tight">
              Padel Ready × Soho House
            </h2>
            
            <p className="text-xl md:text-2xl text-secondary-foreground/90 font-light leading-relaxed max-w-2xl mx-auto">
              An exclusive collaboration blending design and performance
            </p>
          </div>

          <div className="pt-8">
            <Button 
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,194,168,0.3)]"
            >
              Discover More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};