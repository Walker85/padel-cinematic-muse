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
    <section 
      data-nav-theme="dark"
      className="relative py-40 px-6 text-center bg-gradient-to-t from-black via-[#0a0a0a] to-background/0" 
      style={{ backgroundColor: 'hsl(var(--foreground))' }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-display tracking-tight text-primary animate-fade-in uppercase">
          Where the Game Evolves
        </h2>
        <p className="mt-6 text-lg md:text-xl text-background/70 leading-relaxed animate-fade-in delay-200">
          We build for those shaping the next chapter of the sport. Every
          collection refines the dialogue between design and performance.
        </p>
        <div className="mt-12 animate-fade-in delay-300">
          <button
            onClick={handleExploreCollection}
            className="text-lg md:text-xl text-primary hover:text-background transition-colors duration-300 gold-underline"
          >
            Explore the Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutActThree;
