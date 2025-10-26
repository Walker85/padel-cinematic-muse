import { motion } from "framer-motion";

const EventsHero = () => {
  return (
    <section data-nav-theme="dark" className="relative h-[70vh] md:h-[80vh] overflow-hidden">
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/soho-house-hero-new.png')",
            backgroundAttachment: "fixed",
          }}
        />
        
        {/* Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 50%, rgba(254,250,243,0.3) 100%)",
          }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 text-[#D6C2A8]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Where Champions Gather.
          </motion.h1>
          
          <motion.p
            className="font-body text-xl md:text-2xl text-[#D6C2A8] tracking-wider"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Design. Sport. Community.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default EventsHero;
