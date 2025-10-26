import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";

export const ProductGrid = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(20),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body text-lg mb-4">No products found</p>
            <p className="text-muted-foreground/60 font-body text-sm">
              Create your first product by describing what you want to sell.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20 md:py-32 bg-background relative">
      {/* Subtle gold divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4 lg:px-8">
        {/* Section Title */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground inline-block relative">
            SHOP OUR BEST SELLERS
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-primary"></div>
          </h2>
        </div>

        {/* Product Grid - 2 cols mobile, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {products.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
      </div>
      
      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  );
};
