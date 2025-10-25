import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { ShopifyProduct } from "@/lib/shopify";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: ShopifyProduct;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const addItem = useCartStore(state => state.addItem);
  const { node } = product;
  
  const firstVariant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;
  const price = parseFloat(node.priceRange.minVariantPrice.amount);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!firstVariant) {
      toast.error("This product is unavailable");
      return;
    }

    const cartItem = {
      product,
      variantId: firstVariant.id,
      variantTitle: firstVariant.title,
      price: {
        amount: firstVariant.price.amount,
        currencyCode: firstVariant.price.currencyCode,
      },
      quantity: 1,
      selectedOptions: firstVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: node.title,
    });
  };

  return (
    <Link 
      to={`/product/${node.handle}`}
      className="group block bg-background/95 backdrop-blur-sm rounded-2xl overflow-hidden transition-all duration-300 ease-out hover:-translate-y-1 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-border/50 hover:border-primary/40"
    >
      <div className="aspect-[3/4] bg-muted/20 relative overflow-hidden">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* View Details Button - Fades in on hover */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out transform translate-y-2 group-hover:translate-y-0">
          <div className="px-6 py-2 border border-primary/80 rounded-full text-sm font-display tracking-wide text-primary bg-background/90 backdrop-blur-sm">
            VIEW DETAILS
          </div>
        </div>
      </div>
      
      <div className="p-6 space-y-3">
        <h3 className="font-display text-xl tracking-tight group-hover:text-primary transition-colors duration-300">
          {node.title}
        </h3>
        
        {node.description && (
          <p className="text-sm text-muted-foreground/80 line-clamp-2 font-light leading-relaxed group-hover:text-muted-foreground transition-colors duration-300">
            {node.description}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-display tracking-tight">
            {node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
          </span>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="ghost"
            className="opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Link>
  );
};
