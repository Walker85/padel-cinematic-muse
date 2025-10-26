import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const PlayWithUsCTA = () => {
  return (
    <section 
      data-nav-theme="dark"
      className="py-40 bg-secondary relative overflow-hidden"
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="font-display font-extrabold text-display-2xl tracking-tight text-secondary-foreground leading-snug">
            Play With Us
          </h2>
          
          <p className="font-body text-body-lg leading-relaxed text-secondary-foreground/80">
            Partner with us to bring premium padel experiences worldwide
          </p>

          <div className="pt-6">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary hover:text-secondary transition-all duration-300 hover:shadow-[0_0_30px_rgba(214,194,168,0.4)] px-12"
            >
              <Link to="/partner">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};