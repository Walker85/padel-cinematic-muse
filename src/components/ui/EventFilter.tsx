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
        className="relative font-body text-lg md:text-xl tracking-wider transition-colors duration-300"
        style={{
          color: filter === "upcoming" ? "#D6C2A8" : "#000000",
        }}
      >
        Upcoming Events
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#D6C2A8]"
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
        className="relative font-body text-lg md:text-xl tracking-wider transition-colors duration-300"
        style={{
          color: filter === "past" ? "#D6C2A8" : "#000000",
        }}
      >
        Past Events
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-[#D6C2A8]"
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
