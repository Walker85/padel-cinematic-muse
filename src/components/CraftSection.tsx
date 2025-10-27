import craftImage from "@/assets/background_1.png";

export const CraftSection = () => {
  return (
    <section className="py-40 bg-primary relative overflow-hidden" data-nav-theme="dark">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-background">
              Engineered for Balance.
            </h2>
            <p className="text-xl text-background/80 font-light leading-relaxed">
              Every racket is refined for precision and control using carbon fibre construction. 
              Meticulously crafted to deliver the perfect balance of power and finesse.
            </p>
            <p className="text-lg text-background/60 font-light leading-relaxed">
              Premium materials meet expert craftsmanship. Each detail considered. 
              Each element purposeful. Performance elevated.
            </p>
          </div>
          
          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s', opacity: 0 }}>
            <div className="aspect-square relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent rounded-lg"></div>
              <img 
                src={craftImage} 
                alt="Padel Ready rackets with tennis ball - precision equipment" 
                className="w-full h-full object-contain transition-all duration-700 ease-out hover:scale-105 hover:brightness-110 relative z-10"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
