import { ProductCard } from "./ProductCard";
import { getAllProducts } from "@/data/products";

export const ProductGrid = () => {
  const products = getAllProducts();

  return (
    <section id="products" className="relative py-20 md:py-32 bg-background">
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
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={{ node: product }} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};
