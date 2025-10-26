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
      <main>
        {/* Hero Section - Centered Product Image */}
        <section className="bg-[#fefaf3] pt-[120px] pb-20 md:pb-32">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            {/* Centered Product Image */}
            <div 
              className="flex items-center justify-center mb-12 animate-fade-in"
              style={{
                maxHeight: '70vh',
              }}
            >
              <div 
                className="relative w-full max-w-2xl"
                style={{
                  transform: `translateY(${scrollY * 0.08}px)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                {mainImage && (
                  <img
                    src={mainImage.url}
                    alt={mainImage.altText || product.title}
                    className="w-full h-auto max-h-[70vh] md:max-h-[70vh] object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105"
                    style={{
                      maxHeight: '60vh'
                    }}
                  />
                )}
              </div>
            </div>

            {/* Brand Tagline */}
            <div className="text-center space-y-3 mb-16 animate-fade-in" style={{ animationDelay: '150ms' }}>
              <h1 className="font-display font-extrabold text-3xl md:text-5xl uppercase tracking-tight text-[#000000] mb-2">
                {product.title}
              </h1>
              <p className="font-body text-base md:text-lg text-[#3C3C3C] italic">
                Precision. Purpose. Padel Ready.
              </p>
              <div className="w-16 h-[2px] bg-[#D6C2A8] mx-auto"></div>
            </div>

            {/* Product Summary Info */}
            <div className="max-w-3xl mx-auto space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {/* Price */}
              <div className="text-center">
                <div className="font-body text-2xl md:text-3xl font-bold text-[#D6C2A8] mb-2">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-[#E0DED9] max-w-md mx-auto"></div>

              {/* Description */}
              {product.description && (
                <p className="font-body text-base md:text-lg leading-relaxed text-[#3C3C3C] text-center max-w-2xl mx-auto">
                  {product.description}
                </p>
              )}

              {/* Variant Selection */}
              {product.options.length > 0 && (
                <div className="space-y-6 max-w-md mx-auto">
                  {product.options.map((option) => (
                    <div key={option.name} className="space-y-3">
                      <label className="font-display text-sm uppercase tracking-wider text-[#000000] block text-center">
                        {option.name}
                      </label>
                      <div className="flex flex-wrap gap-3 justify-center">
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
                              variant={isSelected ? "default" : "secondary"}
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

              {/* Add to Cart Button */}
              <div className="max-w-md mx-auto">
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="w-full font-display text-sm uppercase tracking-wider bg-[#000000] text-[#ffffff] hover:bg-[#D6C2A8] hover:text-[#000000] rounded-lg px-8 py-4 transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>

              {/* Thumbnail Strip */}
              {thumbnails.length > 1 && (
                <div className="pt-8">
                  <div className="flex gap-4 justify-center overflow-x-auto pb-2 snap-x snap-mandatory">
                    {thumbnails.map((image, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`flex-shrink-0 bg-[#FCFBF8] border-2 overflow-hidden rounded-lg transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 snap-start ${
                          selectedImageIndex === idx 
                            ? 'border-[#D6C2A8] shadow-[0_4px_12px_rgba(214,194,168,0.3)]' 
                            : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#D6C2A8]/40'
                        }`}
                        style={{
                          width: '80px',
                          aspectRatio: '1/1',
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
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Specifications Section */}
        <section className="py-24 md:py-32 bg-[#fefaf3]">
          <div className="container mx-auto px-6 md:px-12 max-w-6xl">
            <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase text-center text-[#000000] mb-12">
              Specifications
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '150ms' }}>
              {[
                { label: 'Weight', value: '360g' },
                { label: 'Balance', value: 'Medium' },
                { label: 'Frame', value: '100% Carbon Fiber' },
                { label: 'Grip', value: 'Soft Comfort' },
                { label: 'Shape', value: 'Diamond' },
                { label: 'Core', value: 'EVA Soft' }
              ].map((spec, idx) => (
                <div 
                  key={idx}
                  className="border border-[#EAE6DD] bg-[#FCFBF8] rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="font-display text-xs uppercase tracking-wider text-[#D6C2A8] mb-2">
                    {spec.label}
                  </div>
                  <div className="font-body text-lg text-[#3C3C3C] font-medium">
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* The Story Section */}
        <section className="py-24 md:py-32 bg-[#ffffff]">
          <div className="container mx-auto px-6 md:px-12 max-w-4xl">
            <div className="text-center space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <p className="font-body text-[1.3rem] md:text-[1.5rem] leading-relaxed text-[#3C3C3C]">
                Every Padel Ready racket is built with precision and purpose.
              </p>
              <p className="font-body text-[1.3rem] md:text-[1.5rem] leading-relaxed text-[#3C3C3C]">
                Engineered for control. Designed for confidence.
              </p>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-24 md:py-32 bg-[#fefaf3]">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <h2 className="font-display font-extrabold text-2xl md:text-3xl uppercase text-center text-[#000000] mb-16">
                You Might Also Like
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '450ms' }}>
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
