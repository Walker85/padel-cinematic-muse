import { motion } from "framer-motion";

const AboutActTwo = () => {
  return (
    <section
      data-nav-theme="dark"
      className="relative h-[85vh] md:h-[90vh] lg:h-[100vh] flex items-center justify-center text-center overflow-hidden bg-cover bg-center md:bg-[position:50%_30%]"
      style={{
        backgroundImage: "url('/images/soho-house-hero-new.png')",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Accessibility image for SEO */}
      <img 
        src="/images/soho-house-hero-new.png" 
        alt="Padel courts at Babington House, Somerset" 
        className="hidden" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/90" />
      
      <div className="relative z-10 px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold tracking-tight leading-tight text-primary uppercase"
        >
          Padel Ready × Babington House
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
          className="mt-6 text-base md:text-lg lg:text-xl text-white/70"
        >
          Where design, sport, and community converge.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutActTwo;
