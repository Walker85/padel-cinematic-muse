import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductByHandle, getProducts } from "@/lib/shopify";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', handle],
    queryFn: () => getProductByHandle(handle!),
    enabled: !!handle,
  });

  const { data: relatedProducts } = useQuery({
    queryKey: ['related-products'],
    queryFn: () => getProducts(4),
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const mainImage = product.images.edges[selectedImageIndex]?.node || product.images.edges[0]?.node;
  const thumbnails = product.images.edges.slice(0, 5);

  return (
    <>
      <Header />
      <main className="pt-20 bg-background">
        {/* Hero Section with Image Gallery */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: Image Gallery */}
              <div className="space-y-6">
                {/* Main Image with Parallax */}
                <div 
                  className="aspect-[4/5] bg-muted/10 overflow-hidden relative group"
                  style={{
                    transform: `translateY(${scrollY * 0.1}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {mainImage && (
                    <img
                      src={mainImage.url}
                      alt={mainImage.altText || product.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {thumbnails.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {thumbnails.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`aspect-square bg-muted/10 overflow-hidden transition-all duration-300 hover:scale-105 ${
                          selectedImageIndex === idx ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image.node.url}
                          alt={image.node.altText || product.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info */}
              <div className="space-y-8 lg:pt-8">
                <div className="space-y-4">
                  <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[2.5rem] uppercase tracking-tight text-foreground">
                    {product.title}
                  </h1>
                  
                  <div className="font-body text-3xl md:text-4xl text-primary font-medium">
                    {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                  </div>

                  {/* Stock Availability */}
                  {selectedVariant?.availableForSale && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-foreground/70">In Stock</span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <p className="font-body text-base leading-relaxed text-foreground/70 max-w-xl">
                    {product.description}
                  </p>
                )}

                {/* Variant Selection */}
                {product.options.length > 0 && (
                  <div className="space-y-6">
                    {product.options.map((option) => (
                      <div key={option.name} className="space-y-3">
                        <label className="font-display text-sm uppercase tracking-wider text-foreground/90">
                          {option.name}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {option.values.map((value) => {
                            const variant = product.variants.edges.find(v => 
                              v.node.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                            )?.node;
                            const isSelected = selectedVariant?.selectedOptions.some(
                              opt => opt.name === option.name && opt.value === value
                            );
                            
                            return (
                              <Button
                                key={value}
                                variant={isSelected ? "default" : "outline"}
                                onClick={() => variant && setSelectedVariantId(variant.id)}
                                disabled={!variant?.availableForSale}
                                className="min-w-[80px] font-body uppercase text-xs tracking-wider"
                              >
                                {value}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4 pt-4">
                  <Button
                    size="lg"
                    className="w-full font-display text-sm uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
                    onClick={handleAddToCart}
                    disabled={!selectedVariant?.availableForSale}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Story Section */}
        <section className="py-20 md:py-32 bg-muted/5">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-[4/3] bg-muted/10 overflow-hidden">
                {product.images.edges[1]?.node ? (
                  <img
                    src={product.images.edges[1].node.url}
                    alt="Product lifestyle"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Lifestyle Image
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-3 text-foreground relative inline-block">
                    The Story
                    <div className="absolute -bottom-2 left-0 w-16 h-[2px] bg-primary"></div>
                  </h2>
                </div>
                <div className="space-y-4 font-body text-base leading-relaxed text-foreground/70 max-w-xl">
                  <p>
                    Crafted for players who demand precision and performance, this racket represents 
                    the pinnacle of padel engineering. Every detail has been refined to deliver 
                    exceptional control and power.
                  </p>
                  <p>
                    From the premium materials to the innovative balance design, this is more than 
                    equipment—it's an extension of your game.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specs Section */}
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-12 text-center text-foreground relative inline-block left-1/2 -translate-x-1/2">
                Technical Specs
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Material</dt>
                  <dd className="font-body text-lg text-foreground">Premium Carbon Fiber</dd>
                </div>
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Balance</dt>
                  <dd className="font-body text-lg text-foreground">Medium (265mm)</dd>
                </div>
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Weight</dt>
                  <dd className="font-body text-lg text-foreground">365g ± 10g</dd>
                </div>
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Grip Size</dt>
                  <dd className="font-body text-lg text-foreground">Standard (38mm)</dd>
                </div>
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Shape</dt>
                  <dd className="font-body text-lg text-foreground">Diamond</dd>
                </div>
                <div className="space-y-3 pb-6 border-b border-border/20">
                  <dt className="font-display text-sm uppercase tracking-wider text-foreground/60">Core</dt>
                  <dd className="font-body text-lg text-foreground">EVA Soft</dd>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* You May Also Like Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-20 md:py-32 bg-muted/5">
            <div className="mx-auto px-6 md:px-12" style={{ maxWidth: '1200px' }}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-12 text-center text-foreground relative inline-block left-1/2 -translate-x-1/2">
                You May Also Like
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary"></div>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-14 pt-8">
                {relatedProducts.filter(p => p.node.handle !== handle).slice(0, 4).map((product, index) => (
                  <ProductCard key={product.node.id} product={product} index={index} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
};

export default Product;
