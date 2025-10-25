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
      className="group block bg-card border border-border/50 rounded-sm overflow-hidden transition-smooth hover-glow hover:border-primary"
    >
      <div className="aspect-square bg-muted/30 relative overflow-hidden">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover transition-smooth group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
      </div>
      
      <div className="p-8 space-y-4">
        <div>
          <h3 className="font-display text-2xl tracking-tight mb-2 group-hover:text-primary transition-colors">
            {node.title}
          </h3>
          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 font-light">
              {node.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-4">
          <span className="text-3xl font-display tracking-tight">
            {node.priceRange.minVariantPrice.currencyCode} {price.toFixed(2)}
          </span>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-smooth"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </Link>
  );
};
