import craftImage from "@/assets/craft-detail.jpg";

export const CraftSection = () => {
  return (
    <section className="py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6 animate-fade-in">
            <h2 className="font-display text-5xl md:text-6xl tracking-tight">
              Engineered for Balance.
            </h2>
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              Every racket is refined for precision and control using carbon fibre construction. 
              Meticulously crafted to deliver the perfect balance of power and finesse.
            </p>
            <p className="text-muted-foreground font-light leading-relaxed">
              Premium materials meet expert craftsmanship. Each detail considered. 
              Each element purposeful. Performance elevated.
            </p>
          </div>
          
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
            <div className="aspect-square rounded-sm overflow-hidden">
              <img 
                src={craftImage} 
                alt="Carbon fiber racket detail" 
                className="w-full h-full object-cover transition-smooth hover:scale-105"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-primary/10 rounded-sm -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
