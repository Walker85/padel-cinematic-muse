import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Newsletter } from "@/components/Newsletter";
import { getEventByHandle, type ShopifyEvent } from "@/lib/shopify";

const EventDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [event, setEvent] = useState<ShopifyEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!handle) return;
      
      setIsLoading(true);
      const fetchedEvent = await getEventByHandle(handle);
      setEvent(fetchedEvent);
      setIsLoading(false);
    };

    fetchEvent();
  }, [handle]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Tournament":
        return "bg-[#D6C2A8] text-primary hover:bg-[#D6C2A8]/90";
      case "Training":
        return "bg-primary text-secondary hover:bg-primary/90";
      case "Social":
        return "bg-secondary text-primary hover:bg-secondary/90";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <p className="font-body text-muted-foreground">Loading event...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-background">
          <h1 className="font-display text-4xl mb-4 text-foreground">Event Not Found</h1>
          <Link to="/events">
            <Button variant="secondary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{event.title} | Padel Ready Events</title>
        <meta name="description" content={event.description} />
        <meta property="og:title" content={`${event.title} | Padel Ready`} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image} />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${event.image}')`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
            }}
          />
        </motion.div>

        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <Link to="/events" className="inline-block mb-4">
              <Button variant="outline" className="text-white border-white/50 hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-wrap gap-3 mb-6">
            <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
            <Badge className={event.status === "upcoming" ? "bg-primary text-secondary" : "bg-muted"}>
              {event.status === "upcoming" ? "Upcoming" : "Past Event"}
            </Badge>
            {event.featured && (
              <Badge className="bg-primary text-secondary">Featured</Badge>
            )}
          </div>

          <motion.h1
            className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {event.title}
          </motion.h1>

          <motion.div
            className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-border"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">
                Date
              </p>
              <time className="font-body text-lg text-foreground" dateTime={event.date}>
                {event.date}
              </time>
            </div>

            <div>
              <p className="font-body text-sm text-muted-foreground uppercase tracking-wider mb-1">
                Location
              </p>
              <p className="font-body text-lg text-foreground">{event.location}</p>
            </div>
          </motion.div>

          <motion.div
            className="prose prose-lg max-w-none mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <p className="font-body text-foreground/90 text-lg leading-relaxed whitespace-pre-wrap">
              {event.description}
            </p>
          </motion.div>

          {event.status === "upcoming" && event.registerUrl && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Button
                variant="secondary"
                size="lg"
                className="px-12"
                asChild
              >
                <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Newsletter />
      <Footer />
    </>
  );
};

export default EventDetail;
