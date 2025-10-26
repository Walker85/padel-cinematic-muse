import { motion } from "framer-motion";

interface EventFilterProps {
  filter: "upcoming" | "past";
  setFilter: (filter: "upcoming" | "past") => void;
}

const EventFilter = ({ filter, setFilter }: EventFilterProps) => {
  return (
    <div className="flex items-center justify-center gap-8">
      <button
        onClick={() => setFilter("upcoming")}
        className={`relative font-body text-lg md:text-xl tracking-wider transition-colors duration-300 ${
          filter === "upcoming" ? "text-primary" : "text-foreground"
        }`}
      >
        Upcoming Events
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            width: filter === "upcoming" ? "100%" : "0%",
            opacity: filter === "upcoming" ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </button>

      <button
        onClick={() => setFilter("past")}
        className={`relative font-body text-lg md:text-xl tracking-wider transition-colors duration-300 ${
          filter === "past" ? "text-primary" : "text-foreground"
        }`}
      >
        Past Events
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-primary"
          initial={false}
          animate={{
            width: filter === "past" ? "100%" : "0%",
            opacity: filter === "past" ? 1 : 0.3,
          }}
          transition={{ duration: 0.3 }}
        />
      </button>
    </div>
  );
};

export default EventFilter;
