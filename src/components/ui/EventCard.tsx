import { motion } from "framer-motion";
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

  return (
    <motion.article
      variants={cardVariants}
      className="group bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
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
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={getTypeColor(event.type)}>{event.type}</Badge>
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

        <p className="text-foreground/80 mb-6 line-clamp-2">{event.description}</p>

        <Button
          variant={event.status === "upcoming" ? "secondary" : "outline"}
          className="w-full"
        >
          {event.status === "upcoming" ? "Register" : "View Recap"}
        </Button>
      </div>
    </motion.article>
  );
};

export default EventCard;
