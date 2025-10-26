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
// New sections
import FitFinder from "@/components/sections/FitFinder";
import OfferBenefits from "@/components/sections/OfferBenefits";
import Testimonials from "@/components/sections/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <Hero />
        
        {/* Benefits Section */}
        <OfferBenefits />
        
        {/* Product Showcase */}
        <ProductGrid />
        
        {/* Fit Finder */}
        <FitFinder />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Partners Section */}
        <PartnersSection />
        
        {/* Additional existing sections */}
        <CraftSection />
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
