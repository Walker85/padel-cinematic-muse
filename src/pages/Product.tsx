import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/stores/cartStore";
import { toast } from "sonner";
import { ProductCard } from "@/components/ProductCard";
import { getProductByHandle, getAllProducts } from "@/data/products";

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [selectedVariantId, setSelectedVariantId] = useState<string>("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const addItem = useCartStore(state => state.addItem);

  const product = handle ? getProductByHandle(handle) : undefined;
  const relatedProducts = getAllProducts().filter(p => p.handle !== handle).slice(0, 4);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const firstVariant = product.variants[0];
  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || firstVariant;

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    const cartItem = {
      product: {
        node: {
          ...product,
          priceRange: {
            minVariantPrice: product.price
          },
          images: {
            edges: product.images.map(img => ({ node: img }))
          },
          variants: {
            edges: product.variants.map(v => ({ node: v }))
          }
        }
      },
      variantId: selectedVariant.id,
      variantTitle: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1,
      selectedOptions: selectedVariant.selectedOptions
    };
    
    addItem(cartItem);
    toast.success("Added to cart", {
      description: product.title,
    });
  };

  const mainImage = product.images[selectedImageIndex] || product.images[0];
  const thumbnails = product.images.slice(0, 5);

  return (
    <>
      <Header />
      <main className="bg-[#fefaf3]">
        {/* Hero Section with Cinematic Product Presentation */}
        <section className="relative pt-[100px] pb-20 md:pb-32 min-h-screen flex items-center">
          {/* Top Gradient - Separates from Header */}
          <div 
            className="absolute top-0 left-0 right-0 h-48 pointer-events-none z-10"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0) 80%)'
            }}
          ></div>

          <div className="container mx-auto px-6 md:px-12 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Image Gallery */}
              <div className="space-y-6 animate-fade-in">
                {/* Main Image with Vignette and Parallax */}
                <div className="relative">
                  <div 
                    className="aspect-[4/5] bg-[#fefaf3] relative overflow-hidden flex items-center justify-center group"
                    style={{
                      transform: `translateY(${scrollY * 0.08}px)`,
                      transition: 'transform 0.1s ease-out',
                      boxShadow: '0px 40px 80px rgba(0,0,0,0.08)'
                    }}
                  >
                    {/* Cinematic Vignette - Reduced opacity */}
                    <div 
                      className="absolute inset-0 z-[5] pointer-events-none opacity-15 mix-blend-multiply"
                      style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.45) 100%)'
                      }}
                    ></div>
                    
                    {mainImage && (
                      <img
                        src={mainImage.url}
                        alt={mainImage.altText || product.title}
                        className="relative z-10 w-full h-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-103"
                      />
                    )}
                  </div>
                </div>

                {/* Thumbnail Gallery */}
                {thumbnails.length > 1 && (
                  <div className="grid grid-cols-5 gap-4">
                    {thumbnails.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`aspect-square bg-[#fefaf3] overflow-hidden transition-all duration-300 hover:scale-105 border-2 ${
                          selectedImageIndex === idx 
                            ? 'border-[#D6C2A8]' 
                            : 'border-transparent opacity-60 hover:opacity-100 hover:border-[#D6C2A8]/40'
                        }`}
                        style={{
                          boxShadow: selectedImageIndex === idx ? '0 4px 12px rgba(214,194,168,0.3)' : 'none'
                        }}
                      >
                        <img
                          src={image.url}
                          alt={image.altText || product.title}
                          className="w-full h-full object-contain"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Product Info with Fade-up Animation */}
              <div 
                className="space-y-8 lg:pt-8 animate-fade-in"
                style={{
                  animationDelay: '0.5s',
                  opacity: 0,
                  animation: 'fade-in 0.8s ease-out 0.5s forwards'
                }}
              >
                <div className="space-y-4">
                  <h1 className="font-display font-extrabold text-4xl md:text-5xl lg:text-[2.5rem] uppercase tracking-tight text-[#000000]">
                    {product.title}
                  </h1>
                  
                  <div className="font-body text-3xl md:text-4xl text-[#D6C2A8] font-medium">
                    {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                  </div>

                  {/* Stock Availability */}
                  {selectedVariant?.availableForSale && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-[#3C3C3C]">In Stock</span>
                    </div>
                  )}
                </div>

                {product.description && (
                  <p className="font-body text-base leading-relaxed text-[#3C3C3C] max-w-xl">
                    {product.description}
                  </p>
                )}

                {/* Variant Selection */}
                {product.options.length > 0 && (
                  <div className="space-y-6">
                    {product.options.map((option) => (
                      <div key={option.name} className="space-y-3">
                        <label className="font-display text-sm uppercase tracking-wider text-[#000000]/90">
                          {option.name}
                        </label>
                        <div className="flex flex-wrap gap-3">
                          {option.values.map((value) => {
                            const variant = product.variants.find(v => 
                              v.selectedOptions.some(opt => opt.name === option.name && opt.value === value)
                            );
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
                    className="w-full font-display text-sm uppercase tracking-wider bg-[#D6C2A8] text-[#000000] hover:bg-[#000000] hover:text-[#D6C2A8] transition-all duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
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
        <section className="py-20 md:py-32 bg-[#fefaf3]">
          <div className="container mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="aspect-[4/3] bg-muted/10 overflow-hidden">
                {product.images[1] ? (
                  <img
                    src={product.images[1].url}
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
        <section className="py-20 md:py-32 bg-[#fefaf3]">
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
          <section className="py-20 md:py-32 bg-[#fefaf3]">
            <div className="mx-auto px-6 md:px-12" style={{ maxWidth: '1200px' }}>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl uppercase mb-12 text-center text-foreground relative inline-block left-1/2 -translate-x-1/2">
                You May Also Like
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-primary"></div>
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 md:gap-14 pt-8">
                {relatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={{ node: product }} index={index} />
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
