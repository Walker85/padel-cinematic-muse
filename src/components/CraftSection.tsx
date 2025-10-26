import craftImage from "@/assets/PR_racket_black_1.png";

export const CraftSection = () => {
  return (
    <section className="py-40 bg-muted/10 relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tight leading-tight">
              Engineered for Balance.
            </h2>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              Every racket is refined for precision and control using carbon fibre construction. 
              Meticulously crafted to deliver the perfect balance of power and finesse.
            </p>
            <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
              Premium materials meet expert craftsmanship. Each detail considered. 
              Each element purposeful. Performance elevated.
            </p>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)] bg-muted/5">
              <img 
                src={craftImage} 
                alt="Padel Ready RDY black carbon fiber racket" 
                className="w-full h-full object-contain p-8 transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
