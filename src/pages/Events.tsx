import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import EventsHero from "@/components/sections/EventsHero";
import EventsGrid from "@/components/sections/EventsGrid";
import EventFilter from "@/components/ui/EventFilter";
import { Newsletter } from "@/components/Newsletter";

export interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  type: "Tournament" | "Training" | "Social";
  description: string;
  image: string;
  status: "upcoming" | "past";
}

const events: Event[] = [
  {
    id: 1,
    title: "Spring Championship Series",
    date: "March 15, 2025",
    location: "Babington House, Somerset",
    type: "Tournament",
    description: "A weekend of elite matches in the heart of Somerset.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
  },
  {
    id: 2,
    title: "Performance Clinic",
    date: "April 20, 2025",
    location: "Padel Ready Clubhouse, Bath",
    type: "Training",
    description: "Small-group sessions with top coaches.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
  },
  {
    id: 3,
    title: "Members' Summer Social",
    date: "June 8, 2025",
    location: "Babington House Lawn",
    type: "Social",
    description: "Drinks, music, and padel under the evening sun.",
    image: "/images/soho-house-hero-new.png",
    status: "upcoming",
  },
  {
    id: 4,
    title: "Winter Invitational 2024",
    date: "December 10, 2024",
    location: "Padel Ready Clubhouse, Bath",
    type: "Tournament",
    description: "A thrilling indoor finale to the year.",
    image: "/images/soho-house-hero-new.png",
    status: "past",
  },
  {
    id: 5,
    title: "Season Launch Evening",
    date: "October 5, 2024",
    location: "Babington House, Somerset",
    type: "Social",
    description: "Celebrate the new season with cocktails and live music.",
    image: "/images/soho-house-hero-new.png",
    status: "past",
  },
];

const Events = () => {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");
  const filteredEvents = events.filter((event) => event.status === filter);

  return (
    <>
      <Helmet>
        <title>Events - Where Champions Gather | Padel Ready × Babington House</title>
        <meta
          name="description"
          content="Join exclusive padel events at Babington House. From elite tournaments to training clinics and member socials."
        />
        <meta property="og:title" content="Events - Padel Ready × Babington House" />
        <meta
          property="og:description"
          content="Join exclusive padel events at Babington House. From elite tournaments to training clinics and member socials."
        />
        <link rel="canonical" href="https://padelready.lovable.app/events" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <EventsHero />
          
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <EventFilter filter={filter} setFilter={setFilter} />
              <EventsGrid events={filteredEvents} />
            </div>
          </section>

          <section className="py-16 bg-primary text-secondary">
            <Newsletter />
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Events;
