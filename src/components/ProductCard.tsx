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
      className="group block bg-card border border-border rounded overflow-hidden hover:border-primary transition-all duration-300"
    >
      <div className="aspect-square bg-muted relative overflow-hidden">
        {image && (
          <img
            src={image.url}
            alt={image.altText || node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </div>
      
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-display text-xl tracking-tight mb-2">
            {node.title}
          </h3>
          {node.description && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {node.description}
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold font-display">
            {node.priceRange.minVariantPrice.currencyCode} ${price.toFixed(2)}
          </span>
          
          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};
