import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const addItem = useCartStore(state => state.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">Product not found</h1>
            <p className="text-muted-foreground">This product doesn't exist.</p>
          </div>
        </div>
      </>
    );
  }

  const firstVariant = product.variants.edges[0]?.node;
  const selectedVariant = product.variants.edges.find(v => v.node.id === selectedVariantId)?.node || firstVariant;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product: { node: product },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: {
        amount: selectedVariant.price.amount,
        currencyCode: selectedVariant.price.currencyCode,
      },
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions || []
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: product.title,
    });
  };

  return (
    <>
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded overflow-hidden">
                {product.images.edges[0]?.node && (
                  <img
                    src={product.images.edges[0].node.url}
                    alt={product.images.edges[0].node.altText || product.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {product.images.edges.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.edges.slice(1, 5).map((image, idx) => (
                    <div key={idx} className="aspect-square bg-muted rounded overflow-hidden">
                      <img
                        src={image.node.url}
                        alt={image.node.altText || product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="font-display text-5xl md:text-6xl tracking-tighter mb-4">
                  {product.title}
                </h1>
                <p className="text-3xl font-bold font-display">
                  {selectedVariant?.price.currencyCode} ${parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </p>
              </div>

              {product.description && (
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Variant Selection */}
              {product.variants.edges.length > 1 && (
                <div className="space-y-4">
                  <label className="text-sm font-medium">Select Variant</label>
                  <div className="grid grid-cols-2 gap-2">
                    {product.variants.edges.map((variant) => (
                      <Button
                        key={variant.node.id}
                        variant={selectedVariantId === variant.node.id ? "default" : "outline"}
                        onClick={() => setSelectedVariantId(variant.node.id)}
                        disabled={!variant.node.availableForSale}
                        className="justify-start"
                      >
                        {variant.node.title}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              <Button
                size="lg"
                className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-display tracking-wide"
                onClick={handleAddToCart}
                disabled={!selectedVariant?.availableForSale}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {selectedVariant?.availableForSale ? 'ADD TO CART' : 'OUT OF STOCK'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Product;
