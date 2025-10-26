import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Newsletter } from "@/components/Newsletter";
import { getEventByHandle, type ShopifyEvent } from "@/lib/shopify";

// Fallback mock data for development
const mockEvents: { [key: string]: ShopifyEvent } = {
  "spring-championship-series": {
    id: "1",
    handle: "spring-championship-series",
    title: "Spring Championship Series",
    date: "March 15, 2025",
    location: "Babington House, Somerset",
    type: "Tournament",
    description: "Join us for an exclusive weekend of elite padel matches at the prestigious Babington House in Somerset. This tournament brings together the finest players in a celebration of skill, strategy, and sportsmanship.\n\nThe Spring Championship Series features professional-grade courts, expert referees, and a luxurious setting that embodies the Padel Ready ethos. Competitors will vie for prestigious titles while enjoying world-class hospitality.\n\nWhether you're a seasoned competitor or an enthusiastic spectator, this event promises unforgettable moments on and off the court.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
    registerUrl: "https://example.com/register",
    featured: true,
  },
  "performance-clinic": {
    id: "2",
    handle: "performance-clinic",
    title: "Performance Clinic",
    date: "April 20, 2025",
    location: "Padel Ready Clubhouse, Bath",
    type: "Training",
    description: "Elevate your game with our intensive Performance Clinic. Led by top-tier coaches, these small-group sessions focus on technique refinement, strategic gameplay, and mental fortitude.\n\nParticipants will receive personalized feedback, video analysis, and actionable training plans. Limited to 12 participants to ensure maximum attention and progress.\n\nIdeal for intermediate to advanced players looking to take their skills to the next level.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
    featured: false,
  },
  "members-summer-social": {
    id: "3",
    handle: "members-summer-social",
    title: "Members' Summer Social",
    date: "June 8, 2025",
    location: "Babington House Lawn",
    type: "Social",
    description: "Celebrate the season with our exclusive Members' Summer Social. An evening of casual padel, craft cocktails, and live acoustic music under the Somerset sky.\n\nThis is your chance to connect with fellow enthusiasts, share stories, and enjoy the sport in a relaxed, elegant atmosphere. Dress code: smart casual.\n\nComplimentary refreshments and canapés will be served throughout the evening.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
    featured: false,
  },
  "winter-invitational-2024": {
    id: "4",
    handle: "winter-invitational-2024",
    title: "Winter Invitational 2024",
    date: "December 10, 2024",
    location: "Padel Ready Clubhouse, Bath",
    type: "Tournament",
    description: "A thrilling indoor finale to the year, the Winter Invitational brought together champions for an unforgettable day of competition. The atmosphere was electric as players battled for the coveted trophy.\n\nThank you to all participants and spectators who made this event a resounding success. Stay tuned for highlights and a full photo gallery.",
    image: "/images/soho-house-hero-new.png",
    status: "past",
    featured: false,
  },
  "season-launch-evening": {
    id: "5",
    handle: "season-launch-evening",
    title: "Season Launch Evening",
    date: "October 5, 2024",
    location: "Babington House, Somerset",
    type: "Social",
    description: "We kicked off the new season in style with an evening of celebration at Babington House. Members enjoyed cocktails, live music, and friendly matches as we welcomed autumn.\n\nIt was a perfect opportunity to reconnect, meet new faces, and set intentions for the season ahead. Thank you for making it memorable!",
    image: "/images/soho-house-hero-new.png",
    status: "past",
    featured: false,
  },
};

const EventDetail = () => {
  const { handle } = useParams<{ handle: string }>();
  const [event, setEvent] = useState<ShopifyEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!handle) return;
      
      setIsLoading(true);
      
      // Try to fetch from Shopify first
      const fetchedEvent = await getEventByHandle(handle);
      
      // Fall back to mock data if Shopify returns null
      const finalEvent = fetchedEvent || mockEvents[handle] || null;
      
      setEvent(finalEvent);
      setIsLoading(false);
    };

    fetchEvent();
  }, [handle]);

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Loading Event... | Padel Ready</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex items-center justify-center bg-background">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="inline-block animate-pulse mb-4">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="font-body text-muted-foreground">Loading event details...</p>
          </motion.div>
        </div>
        <Footer />
      </>
    );
  }

  if (!event) {
    return (
      <>
        <Helmet>
          <title>Event Not Found | Padel Ready</title>
        </Helmet>
        <Header />
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-lg"
          >
            <h1 className="font-display text-5xl md:text-6xl mb-6 text-foreground">
              Event Not Found
            </h1>
            <p className="font-body text-lg text-muted-foreground mb-8">
              This event doesn't exist or has been removed. Explore our other upcoming events.
            </p>
            <Link to="/events">
              <Button 
                size="lg"
                className="bg-primary text-foreground hover:bg-primary/90 shadow-lg"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to All Events
              </Button>
            </Link>
          </motion.div>
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
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${event.image}')`,
            }}
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-background/20"
          />
        </motion.div>

        <div className="relative h-full flex flex-col justify-between">
          {/* Back button */}
          <div className="container mx-auto px-4 pt-8">
            <Link to="/events" className="inline-block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Button 
                  variant="outline" 
                  className="text-white border-white/50 hover:bg-white/10 hover:border-white backdrop-blur-sm"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Events
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-foreground text-sm font-medium shadow-lg mb-4">
                {event.type}
              </span>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-primary mb-6 max-w-4xl">
                {event.title}
              </h1>

              <div className="flex flex-col sm:flex-row gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <time className="font-body tracking-wide" dateTime={event.date}>
                    {event.date}
                  </time>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="font-body tracking-wide">{event.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Event Content */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          {/* Status Badge */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${
              event.status === "upcoming" 
                ? "bg-primary text-foreground" 
                : "bg-muted text-muted-foreground"
            }`}>
              {event.status === "upcoming" ? "Upcoming Event" : "Past Event"}
            </span>
            {event.featured && (
              <span className="px-4 py-2 rounded-full bg-primary text-foreground text-sm font-medium">
                Featured
              </span>
            )}
          </motion.div>

          {/* Description */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="prose prose-lg max-w-none">
              {event.description.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  className="font-body text-lg text-foreground/90 leading-relaxed mb-6 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          {event.status === "upcoming" && event.registerUrl && (
            <motion.div
              className="text-center py-12 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h2 className="font-display text-3xl md:text-4xl mb-4 text-foreground">
                Ready to Join?
              </h2>
              <p className="font-body text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Secure your spot at this exclusive event. Limited availability.
              </p>
              <Button
                size="lg"
                className="bg-primary text-foreground hover:bg-primary/90 px-12 py-6 text-lg shadow-lg"
                asChild
              >
                <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
                  Register Now
                </a>
              </Button>
            </motion.div>
          )}

          {/* Past Event Note */}
          {event.status === "past" && (
            <motion.div
              className="text-center py-12 border-t border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="font-body text-lg text-muted-foreground mb-8">
                This event has concluded. Browse our upcoming events to find your next padel experience.
              </p>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-foreground"
                asChild
              >
                <Link to="/events">
                  View Upcoming Events
                </Link>
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-primary text-secondary py-16">
        <Newsletter />
      </section>
      <Footer />
    </>
  );
};

export default EventDetail;
