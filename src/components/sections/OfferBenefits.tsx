import { Award, Rocket, Shield, Heart } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Premium Craftsmanship",
    description: "Handcrafted in Somerset with meticulous attention to detail and luxury materials."
  },
  {
    icon: Rocket,
    title: "Elite Performance",
    description: "Designed for competitive play with advanced carbon fiber construction and precision engineering."
  },
  {
    icon: Shield,
    title: "Uncompromising Quality",
    description: "Rigorous testing and quality assurance ensure every racket meets our exacting standards."
  },
  {
    icon: Heart,
    title: "Designed for Creatives",
    description: "By artists and craftspeople who understand the intersection of design, sport, and culture."
  }
];

const OfferBenefits = () => {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-foreground">
              Why Padel Ready?
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Experience the perfect fusion of luxury design and uncompromising performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-8 hover:shadow-lg transition-all duration-300 group border border-border hover:border-primary"
                >
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-8 h-8 text-primary group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl mb-3 text-foreground group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center bg-muted/30 rounded-2xl p-12">
            <h3 className="font-display text-3xl md:text-4xl uppercase mb-4 text-foreground">
              Ready to Elevate Your Game?
            </h3>
            <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join the Padel Ready community and experience the difference that premium craftsmanship makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-foreground hover:bg-primary/90 font-display uppercase text-sm tracking-wider transition-all duration-300 shadow-lg">
                Shop Collection
              </button>
              <button className="px-8 py-4 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background font-display uppercase text-sm tracking-wider transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBenefits;
