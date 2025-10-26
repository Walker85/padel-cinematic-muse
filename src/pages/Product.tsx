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
        {/* Hero Section - Premium Product Presentation */}
        <section className="relative bg-[#fefaf3] pt-[100px] pb-16 md:pb-24">
          <div className="container mx-auto px-6 md:px-12 max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              
              {/* Left: Image Gallery */}
              <div className="space-y-6">
                {/* Main Image Container */}
                <div 
                  className="relative flex items-center justify-center bg-[#fefaf3]"
                  style={{
                    maxHeight: '80vh',
                  }}
                >
                  <div 
                    className="aspect-[4/5] w-full bg-[#fefaf3] relative overflow-hidden flex items-center justify-center group"
                    style={{
                      transform: `translateY(${scrollY * 0.08}px)`,
                      transition: 'transform 0.1s ease-out'
                    }}
                  >
                    {mainImage && (
                      <img
                        src={mainImage.url}
                        alt={mainImage.altText || product.title}
                        className="h-full w-auto max-w-full object-contain object-center transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105"
                      />
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {thumbnails.length > 1 && (
                  <div className="pt-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
                    <div className="flex gap-4 justify-center md:justify-start overflow-x-auto pb-2 snap-x snap-mandatory">
                      {thumbnails.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`flex-shrink-0 bg-[#fefaf3] border-2 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-105 snap-start ${
                            selectedImageIndex === idx 
                              ? 'border-[#D6C2A8] shadow-[0_4px_12px_rgba(214,194,168,0.3)]' 
                              : 'border-transparent opacity-70 hover:opacity-100 hover:border-[#D6C2A8]/40'
                          }`}
                          style={{
                            width: '100px',
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

              {/* Right: Product Summary */}
              <div 
                className="space-y-8 lg:sticky lg:top-32 animate-fade-in"
                style={{
                  animationDelay: '0.4s',
                }}
              >
                {/* Product Name */}
                <div className="space-y-2">
                  <h1 className="font-display font-extrabold text-[2.5rem] md:text-5xl uppercase tracking-tight leading-tight text-[#000000]">
                    {product.title}
                  </h1>
                  <p className="font-body text-[1.1rem] text-[#3C3C3C]">Premium Carbon Fiber Construction</p>
                </div>

                {/* Price */}
                <div className="font-body text-[1.3rem] font-bold text-[#D6C2A8]">
                  {selectedVariant?.price.currencyCode} {parseFloat(selectedVariant?.price.amount || '0').toFixed(2)}
                </div>

                {/* Divider */}
                <div className="h-px bg-[#E0DED9]"></div>

                {/* Description */}
                {product.description && (
                  <p className="font-body text-base leading-relaxed text-[#3C3C3C]">
                    {product.description}
                  </p>
                )}

                {/* Variant Selection */}
                {product.options.length > 0 && (
                  <div className="space-y-6">
                    {product.options.map((option) => (
                      <div key={option.name} className="space-y-3">
                        <label className="font-display text-sm uppercase tracking-wider text-[#000000]">
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
                <button
                  onClick={handleAddToCart}
                  disabled={!selectedVariant?.availableForSale}
                  className="w-full font-display text-sm uppercase tracking-wider bg-[#000000] text-[#ffffff] hover:bg-[#D6C2A8] hover:text-[#000000] rounded-lg px-8 py-4 transition-all duration-350 ease-[cubic-bezier(0.4,0,0.2,1)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {selectedVariant?.availableForSale ? 'Add to Cart' : 'Out of Stock'}
                </button>

                {/* Secondary Link */}
                <a 
                  href="#specs" 
                  className="inline-block font-body text-sm text-[#3C3C3C] hover:text-[#D6C2A8] transition-colors duration-300 relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-[#D6C2A8] after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  View Technology Specs
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Details Section - The Story & Specs */}
        <section id="specs" className="py-24 md:py-32 bg-[#ffffff]">
          <div className="container mx-auto px-6 md:px-12 max-w-[1100px]">
            
            {/* The Details - Specs Grid */}
            <div className="mb-20 md:mb-32">
              <h2 className="font-['Playfair_Display'] text-[1.8rem] md:text-4xl mb-12 text-[#000000] text-center">
                The Details
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'Weight', value: '365g ± 10g' },
                  { label: 'Balance', value: 'Medium (265mm)' },
                  { label: 'Frame', value: 'Carbon Fiber' },
                  { label: 'Grip Size', value: 'Standard (38mm)' },
                  { label: 'Shape', value: 'Diamond' },
                  { label: 'Core', value: 'EVA Soft' }
                ].map((spec, idx) => (
                  <div 
                    key={idx}
                    className="border border-[#EAE6DD] bg-[#FCFBF8] p-6 text-center transition-all duration-300 hover:shadow-md"
                  >
                    <div className="font-display text-xs uppercase tracking-wider text-[#D6C2A8] mb-2">
                      {spec.label}
                    </div>
                    <div className="font-body text-base text-[#3C3C3C]">
                      {spec.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* The Story */}
            <div className="space-y-6 max-w-3xl mx-auto">
              <h2 className="font-['Playfair_Display'] text-[1.8rem] md:text-4xl mb-8 text-[#000000] text-center">
                The Story
              </h2>
              
              <div className="space-y-5 font-body text-[1.1rem] leading-loose text-[#3C3C3C]">
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
        </section>

        {/* Related Products Section */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-24 md:py-32 bg-[#fefaf3]">
            <div className="container mx-auto px-6 md:px-12 max-w-7xl">
              <h2 className="font-display text-3xl md:text-4xl uppercase mb-16 text-center text-[#000000]">
                You Might Also Like
              </h2>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
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
