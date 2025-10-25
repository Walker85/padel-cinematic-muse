import { Button } from "./ui/button";

export const Hero = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-tighter">
            PADEL, PERFECTED.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Precision engineering meets luxury minimalism. Every racket crafted for performance, designed for champions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display tracking-wide"
              onClick={scrollToProducts}
            >
              EXPLORE COLLECTION
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="font-display tracking-wide"
            >
              LEARN MORE
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-foreground/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-foreground/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
