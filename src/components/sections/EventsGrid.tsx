import { motion } from "framer-motion";
import EventCard from "@/components/ui/EventCard";
import type { Event } from "@/pages/Events";

interface EventsGridProps {
  events: Event[];
}

const EventsGrid = ({ events }: EventsGridProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      key={events.length}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </motion.div>
  );
};

export default EventsGrid;
