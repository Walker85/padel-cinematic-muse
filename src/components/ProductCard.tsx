import { Link } from "react-router-dom";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: {
    node: Product;
  };
  index: number;
  tag?: "NEW" | "LIMITED";
}

export const ProductCard = ({ product, index, tag }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;

  const primaryImage = node.images[0];
  const secondaryImage = node.images[1];
  const price = parseFloat(node.price.amount);
  const firstVariant = node.variants[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!firstVariant) {
      toast.error("This product is unavailable");
      return;
    }

    const cartItem = {
      product: {
        node: {
          ...node,
          priceRange: {
            minVariantPrice: node.price
          },
          images: {
            edges: node.images.map(img => ({ node: img }))
          },
          variants: {
            edges: node.variants.map(v => ({ node: v }))
          }
        }
      },
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: firstVariant.price,
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
      position: "top-center",
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
        opacity: 0
      }}
    >
      {/* Card Container with Dark Mode Support */}
      <div 
        className="relative overflow-hidden border border-transparent bg-background dark:bg-black transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:border-primary group-hover:-translate-y-1"
        style={{
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.08)' : '0 4px 20px rgba(0,0,0,0.04)'
        }}
      >
        
        {/* Optional Tag */}
        {tag && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1 bg-black/40 dark:bg-white/10 backdrop-blur-sm rounded-full">
            <span className="font-display text-[0.7rem] uppercase tracking-wider text-primary">
              {tag}
            </span>
          </div>
        )}

        {/* Image Container - 4:5 ratio, Clean & Evenly Lit */}
        <div className="aspect-[4/5] bg-background dark:bg-foreground relative overflow-hidden flex items-center justify-center">
          {/* Hover Gradient Overlay */}
          <div className={`absolute inset-0 bg-primary/8 dark:bg-primary/15 z-20 transition-opacity duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}></div>
          
          {primaryImage && (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || node.title}
              className={`relative z-10 w-full h-full object-contain object-center transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
              }`}
              style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
            />
          )}
          
          {/* Secondary image on hover */}
          {secondaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.altText || node.title}
              className={`absolute inset-0 z-10 w-full h-full object-contain object-center transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ transform: isHovered ? 'scale(1.03)' : 'scale(1)' }}
            />
          )}
        </div>
        
        {/* Content - Left Aligned with Hover Animation */}
        <div 
          className="px-5 py-6 space-y-3 transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
          style={{ transform: isHovered ? 'translateY(-4px)' : 'translateY(0)' }}
        >
          {/* Product Title - Mollen, Left Aligned */}
          <h3 className="font-display text-sm md:text-base uppercase tracking-[0.03em] text-muted-foreground dark:text-background transition-colors duration-300">
            {node.title}
          </h3>
          
          {/* Optional Subtext */}
          <p className="font-body text-xs text-muted-foreground/60 dark:text-background/60 leading-relaxed">
            Premium Carbon Fiber
          </p>
          
          {/* Price - SA Triumph, Gold */}
          <div className="font-body text-lg font-medium text-primary">
            {node.price.currencyCode} {price.toFixed(2)}
          </div>
          
          {/* CTA Button - Appears on Hover */}
          <div className={`pt-2 transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)] ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <button
              onClick={handleAddToCart}
              className="w-full font-display text-xs uppercase tracking-wider py-3 border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};
