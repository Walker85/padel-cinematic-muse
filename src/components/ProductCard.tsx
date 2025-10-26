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
}

export const ProductCard = ({ product, index }: ProductCardProps) => {
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
      className="group block w-[85%] mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
        opacity: 0
      }}
    >
      <div className="bg-background border border-transparent hover:border-primary transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        {/* Image Container - 4:5 ratio */}
        <div className="aspect-[4/5] bg-muted/10 relative overflow-hidden">
          {primaryImage && (
            <img
              src={primaryImage.url}
              alt={primaryImage.altText || node.title}
              className={`w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isHovered && secondaryImage ? 'opacity-0' : 'opacity-100'
              } ${isHovered ? 'scale-105' : 'scale-100'}`}
            />
          )}
          
          {/* Secondary image on hover */}
          {secondaryImage && (
            <img
              src={secondaryImage.url}
              alt={secondaryImage.altText || node.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </div>
        
        {/* Content - More breathing room */}
        <div className="px-4 py-6 space-y-4 text-center">
          {/* Product Title - Mollen Medium */}
          <h3 className="font-display font-medium text-sm md:text-base uppercase tracking-[0.04em] text-muted-foreground group-hover:text-primary transition-colors duration-300">
            {node.title}
          </h3>
          
          {/* Price - SA Triumph, gold, weight 500 */}
          <div className="font-body text-lg font-medium text-primary">
            {node.price.currencyCode} {price.toFixed(2)}
          </div>
          
          {/* Add to Cart - Smaller, lighter gray */}
          <button
            onClick={handleAddToCart}
            className="font-body text-xs uppercase tracking-wider transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:text-primary"
            style={{ color: '#777' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
};
