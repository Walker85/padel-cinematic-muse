import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/lib/shopify";
import { ProductCard } from "./ProductCard";
import { Loader2 } from "lucide-react";
import racketImage from "@/assets/pr-racket-black.png";

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

  // Demo product for preview when no real products exist
  const demoProduct = {
    node: {
      id: 'demo-1',
      title: 'RDY Pro Racket',
      description: 'Premium carbon fiber padel racket',
      handle: 'rdy-pro-racket',
      priceRange: {
        minVariantPrice: {
          amount: '249.00',
          currencyCode: 'USD'
        }
      },
      images: {
        edges: [
          {
            node: {
              url: racketImage,
              altText: 'RDY Pro Racket - Black'
            }
          }
        ]
      },
      variants: {
        edges: [
          {
            node: {
              id: 'demo-variant-1',
              title: 'Default',
              price: {
                amount: '249.00',
                currencyCode: 'USD'
              },
              availableForSale: true,
              selectedOptions: []
            }
          }
        ]
      },
      options: []
    }
  };

  const displayProducts = products && products.length > 0 ? products : [demoProduct, demoProduct, demoProduct, demoProduct];

  return (
    <section id="products" className="py-20 md:py-32 bg-background relative">
      {/* Subtle gold divider line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      {/* Container with max-width and extra padding */}
      <div className="mx-auto px-6 md:px-12" style={{ maxWidth: '1200px' }}>
        {/* Section Title */}
        <div className="text-center mb-10 md:mb-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground inline-block relative">
            SHOP OUR BEST SELLERS
            {/* Thin gold underline - 60px width, 2px height */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[60px] h-[2px] bg-primary"></div>
          </h2>
        </div>

        {/* Product Grid - 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-14">
          {displayProducts.map((product, index) => (
            <ProductCard key={product.node.id} product={product} index={index} />
          ))}
        </div>
        
        {(!products || products.length === 0) && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground/60 font-body text-sm">
              Demo cards shown above. Connect your Shopify products to see real inventory.
            </p>
          </div>
        )}
      </div>
      
      {/* Bottom divider line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </section>
  );
};
