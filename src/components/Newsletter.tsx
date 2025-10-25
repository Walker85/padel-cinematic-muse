import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Placeholder for future integration with Shopify Email or Mailchimp
    setTimeout(() => {
      toast.success("Welcome to the Inner Circle!", {
        description: "You'll be first to know about exclusive drops.",
      });
      setEmail("");
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="py-32 bg-background border-y border-primary/20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4 animate-fade-in">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">
              Join the Inner Circle
            </h2>
            <p className="text-xl text-muted-foreground font-light">
              Be first to hear about limited drops and collaborations
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-12 border-primary/30 focus:border-primary focus-visible:ring-primary/50 transition-all duration-300"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(214,194,168,0.4)] transition-all duration-300 h-12 px-8"
              disabled={isLoading}
            >
              {isLoading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>

          <p className="text-xs text-muted-foreground/60 font-light animate-fade-in" style={{ animationDelay: '0.4s' }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};