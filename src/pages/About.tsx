import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import AboutActOne from "@/components/sections/AboutActOne";
import AboutActTwo from "@/components/sections/AboutActTwo";
import AboutActThree from "@/components/sections/AboutActThree";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Padel Ready × Babington House</title>
        <meta 
          name="description" 
          content="Padel Ready × Babington House – where design, sport, and community converge. Crafted by creatives for creatives." 
        />
        <meta 
          name="keywords" 
          content="Padel Ready Babington House, padel rackets, premium padel brand, Somerset design, minimalist sports design, Babington House, creative sports equipment, performance padel" 
        />
        <meta property="og:title" content="Padel Ready × Babington House" />
        <meta property="og:site_name" content="Padel Ready" />
        <meta property="og:description" content="Where design, sport, and community converge. Crafted by creatives for creatives." />
        <meta property="og:image" content="/images/soho-house-hero-new.png" />
      </Helmet>

      <Header />

      <main className="bg-background text-foreground font-body">
        <AboutActOne />
        <AboutActTwo />
        <AboutActThree />
      </main>

      <Footer />
    </>
  );
}
