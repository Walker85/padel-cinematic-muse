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
      <div className="text-center py-32">
        <h3 className="font-display text-3xl mb-4">No products found</h3>
        <p className="text-muted-foreground">
          Create a product by telling the chat what you want.
        </p>
      </div>
    );
  }

  return (
    <section id="products" className="py-40 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-24 animate-slide-up">
          <h2 className="font-display text-5xl md:text-7xl tracking-tighter mb-6">
            THE COLLECTION
          </h2>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-light">
            Premium rackets engineered for every playing style
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product, index) => (
            <div
              key={product.node.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s`, opacity: 0 }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
