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

  const eventDetailUrl = event.handle ? `/events/${event.handle}` : '#';
  const shouldLink = event.handle || event.registerUrl;

  const cardContent = (
    <>
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
          {event.featured && (
            <Badge className="bg-primary text-secondary">Featured</Badge>
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

        <p className="text-foreground/80 mb-6 line-clamp-2 flex-grow">{event.description}</p>

        {event.status === "upcoming" && event.registerUrl ? (
          <Button
            variant="secondary"
            className="w-full"
            asChild
          >
            <a href={event.registerUrl} target="_blank" rel="noopener noreferrer">
              Register
            </a>
          </Button>
        ) : event.handle ? (
          <Button
            variant={event.status === "upcoming" ? "secondary" : "outline"}
            className="w-full"
            asChild
          >
            <Link to={eventDetailUrl}>
              {event.status === "upcoming" ? "Learn More" : "View Recap"}
            </Link>
          </Button>
        ) : (
          <Button
            variant={event.status === "upcoming" ? "secondary" : "outline"}
            className="w-full"
            disabled
          >
            {event.status === "upcoming" ? "Coming Soon" : "View Recap"}
          </Button>
        )}
      </div>
    </>
  );

  return (
    <motion.article
      variants={cardVariants}
      className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col"
    >
      {cardContent}
    </motion.article>
  );
};

export default EventCard;
