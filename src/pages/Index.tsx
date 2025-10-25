import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CraftSection } from "@/components/CraftSection";
import { ProductGrid } from "@/components/ProductGrid";
import { BrandStory } from "@/components/BrandStory";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CraftSection />
        <ProductGrid />
        <BrandStory />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
