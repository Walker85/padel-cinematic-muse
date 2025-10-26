import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Event } from "@/pages/Events";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const getTypeColor = () => {
    return "px-3 py-1.5 rounded-full bg-[#D6C2A8] text-[#1A1A1A] text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.15)]";
  };

  const eventDetailUrl = event.handle ? `/events/${event.handle}` : '#';

  return (
    <motion.article
      variants={cardVariants}
      className="flex flex-col min-h-[420px]"
    >
      {event.handle ? (
        <Link 
          to={eventDetailUrl} 
          className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col h-full"
          aria-label={`View details for ${event.title}`}
        >
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={getTypeColor()}>{event.type}</span>
                {event.featured && (
                  <span className="px-3 py-1.5 rounded-full bg-[#D6C2A8] text-[#1A1A1A] text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl mb-3 text-foreground group-hover:text-[#D6C2A8] transition-colors duration-300">
                {event.title}
              </h3>

              <div className="font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                <time dateTime={event.date}>{event.date}</time>
              </div>

              <p className="font-body text-sm text-muted-foreground mb-4 uppercase tracking-wider">
                {event.location}
              </p>

              <p className="text-foreground/80 line-clamp-2">{event.description}</p>
            </div>

            <div className="mt-6">
              {event.status === "upcoming" && event.registerUrl ? (
                <span
                  className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 bg-primary text-secondary hover:bg-primary/90"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(event.registerUrl, '_blank', 'noopener,noreferrer');
                  }}
                >
                  Register
                </span>
              ) : (
                <span className="inline-flex items-center justify-center w-full px-4 py-2 rounded-lg font-medium transition-all duration-300 border border-input bg-background hover:bg-accent hover:text-accent-foreground">
                  {event.status === "upcoming" ? "Learn More" : "View Recap"}
                </span>
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className="group bg-card rounded-lg overflow-hidden shadow-sm flex flex-col h-full cursor-default">
          {/* Image */}
          <div className="aspect-video overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className={getTypeColor()}>{event.type}</span>
                {event.featured && (
                  <span className="px-3 py-1.5 rounded-full bg-[#D6C2A8] text-[#1A1A1A] text-sm font-medium shadow-[0_1px_2px_rgba(0,0,0,0.15)]">
                    Featured
                  </span>
                )}
              </div>

              <h3 className="font-display text-2xl mb-3 text-foreground">
                {event.title}
              </h3>

              <div className="font-body text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                <time dateTime={event.date}>{event.date}</time>
              </div>

              <p className="font-body text-sm text-muted-foreground mb-4 uppercase tracking-wider">
                {event.location}
              </p>

              <p className="text-foreground/80 line-clamp-2">{event.description}</p>
            </div>

            <div className="mt-6">
              <Button variant="outline" className="w-full" disabled>
                Coming Soon
              </Button>
            </div>
          </div>
        </div>
      )}
    </motion.article>
  );
};

export default EventCard;
