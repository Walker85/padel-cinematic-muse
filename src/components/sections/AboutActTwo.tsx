const AboutActTwo = () => {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/soho-house-hero-new.png')",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/90" />
      <div className="relative z-10 px-4">
        <h2 className="font-display text-5xl md:text-6xl tracking-tight text-primary animate-fade-in uppercase">
          Padel Ready × Babington House
        </h2>
        <p className="mt-4 text-lg md:text-xl text-white/80 animate-fade-in delay-200">
          Where design, sport, and community converge.
        </p>
      </div>
    </section>
  );
};

export default AboutActTwo;
