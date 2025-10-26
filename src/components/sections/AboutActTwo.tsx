const AboutActTwo = () => {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/soho-house-hero-new.png')",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" />
      <div className="relative z-10 px-4">
        <h2 className="text-6xl md:text-7xl font-display tracking-tight leading-tight text-primary text-center animate-fade-in uppercase">
          Padel Ready × Babington House
        </h2>
        <p className="mt-6 text-lg md:text-xl text-white/70 animate-fade-in delay-200">
          Where design, sport, and community converge.
        </p>
      </div>
    </section>
  );
};

export default AboutActTwo;
