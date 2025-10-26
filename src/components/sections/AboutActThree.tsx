import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AboutActThree = () => {
  const navigate = useNavigate();

  const handleExploreCollection = () => {
    navigate("/");
    setTimeout(() => {
      const productsSection = document.getElementById("products");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <section className="relative bg-foreground text-center py-32 md:py-40">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="font-display text-5xl md:text-6xl tracking-tight text-primary animate-fade-in uppercase">
          Where the Game Evolves
        </h2>
        <p className="mt-6 text-lg md:text-xl text-background/80 leading-relaxed animate-fade-in delay-200">
          We build for those shaping the next chapter of the sport. Every
          collection refines the dialogue between design and performance.
        </p>
        <div className="mt-10 border-t border-primary/30 pt-10">
          <Button
            onClick={handleExploreCollection}
            variant="ghost"
            className="text-lg md:text-xl text-primary hover:text-background transition-colors duration-300"
          >
            Explore the Collection
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AboutActThree;
