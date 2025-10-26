import { useState } from "react";
import { Star, Quote } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  image?: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Pro Player",
    location: "London",
    rating: 5,
    text: "The Pro Carbon racket has transformed my game. The perfect balance of power and control, wrapped in stunning design. Worth every penny."
  },
  {
    name: "Marcus Rodriguez",
    role: "Club Member",
    location: "Barcelona",
    rating: 5,
    text: "As someone who appreciates both craftsmanship and performance, Padel Ready delivers on both fronts. The racket feels like an extension of my arm."
  },
  {
    name: "Emily Thompson",
    role: "Coach",
    location: "Somerset",
    rating: 5,
    text: "I recommend Padel Ready to all my students. The quality is exceptional, and the design speaks to people who value aesthetics as much as performance."
  },
  {
    name: "James Wilson",
    role: "Business Owner",
    location: "Manchester",
    rating: 5,
    text: "Invested in the Classic Elite and haven't looked back. The attention to detail and premium feel make every match feel special."
  },
  {
    name: "Sophie Laurent",
    role: "Tournament Player",
    location: "Paris",
    rating: 5,
    text: "Competitive performance meets luxury design. This racket not only improved my game but also became a conversation starter on the court."
  },
  {
    name: "David Park",
    role: "Enthusiast",
    location: "Seoul",
    rating: 5,
    text: "The craftsmanship is evident from the first swing. Padel Ready has elevated my appreciation for quality padel equipment."
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % (testimonials.length - visibleCount + 1));
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + (testimonials.length - visibleCount + 1)) % (testimonials.length - visibleCount + 1));
  };

  return (
    <section className="py-24 md:py-32 bg-muted/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase mb-4 text-foreground">
              What Players Say
            </h2>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied players who've elevated their game with Padel Ready.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {testimonials
                .slice(currentIndex, currentIndex + visibleCount)
                .map((testimonial, index) => (
                  <div
                    key={`${currentIndex}-${index}`}
                    className="bg-card rounded-xl p-8 hover:shadow-lg transition-all duration-300 border border-border"
                  >
                    <div className="mb-6">
                      <Quote className="w-10 h-10 text-primary/30" />
                    </div>
                    
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 fill-primary text-primary"
                        />
                      ))}
                    </div>

                    <p className="font-body text-foreground leading-relaxed mb-6">
                      {testimonial.text}
                    </p>

                    <div className="pt-6 border-t border-border">
                      <p className="font-display font-semibold text-foreground mb-1">
                        {testimonial.name}
                      </p>
                      <p className="font-body text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-1">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-center gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                aria-label="Previous testimonials"
              >
                ←
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-all duration-300"
                aria-label="Next testimonials"
              >
                →
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-border">
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-primary mb-2">5000+</div>
              <div className="font-body text-muted-foreground">Happy Players</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-primary mb-2">4.9/5</div>
              <div className="font-body text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-primary mb-2">100+</div>
              <div className="font-body text-muted-foreground">Clubs Worldwide</div>
            </div>
            <div className="text-center">
              <div className="font-display text-4xl md:text-5xl text-primary mb-2">3+</div>
              <div className="font-body text-muted-foreground">Years Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
