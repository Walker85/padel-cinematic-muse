import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { CraftSection } from "@/components/CraftSection";
import { ProductGrid } from "@/components/ProductGrid";
import { PartnersSection } from "@/components/PartnersSection";
import { CollaborationsSection } from "@/components/CollaborationsSection";
import { PressMentions } from "@/components/PressMentions";
import { BrandStory } from "@/components/BrandStory";
import { PlayWithUsCTA } from "@/components/PlayWithUsCTA";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <CraftSection />
        <ProductGrid />
        <PartnersSection />
        <CollaborationsSection />
        <PressMentions />
        <BrandStory />
        <PlayWithUsCTA />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
