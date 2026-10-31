import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  MapPin,
  Compass,
  Sun,
  Waves,
} from "lucide-react";
import {
  Hero,
  SectionHeading,
  StayCard,
  ExperienceCard,
  DestinationCard,
  ArticleCard,
  Benefits,
  Button,
  PhotoImage,
} from "@/components/ui";
import { InquiryButton } from "@/components/interactive";
import { stays, experiences, destinations, articles } from "@/lib/data";
export default function Home() {
  return (
    <>
      <Hero
        home
        title={"THE MALDIVES\nYOUR WAY."}
        subtitle="Extraordinary islands. Unique stays. Unforgettable experiences. Let’s plan a trip that’s perfectly made for you."
        eyebrow="A THOUSAND ISLANDS. YOUR OWN KIND OF ESCAPE."
        photo="island"
      >
        <InquiryButton light />
        <Link className="hero-secondary" href="/destinations">
          Find your island <ArrowUpRight size={19} />
        </Link>
      </Hero>
      <div className="container discovery-nav">
        {[
          {
            title: "Places to stay",
            subtitle: "Wake up somewhere extraordinary",
            href: "/stays",
            icon: Sun,
          },
          {
            title: "Experiences",
            subtitle: "Make memories beyond the beach",
            href: "/experiences",
            icon: Waves,
          },
          {
            title: "Explore islands",
            subtitle: "Find your little corner of paradise",
            href: "/destinations",
            icon: Compass,
          },
          {
            title: "Plan your trip",
            subtitle: "An escape, made just for you",
            href: "/plan-your-trip",
            icon: MapPin,
          },
        ].map((c) => (
          <Link key={c.href} href={c.href}>
            <c.icon size={25} strokeWidth={1.3} />
            <div>
              <h3>{c.title}</h3>
              <p>{c.subtitle}</p>
            </div>
            <ArrowUpRight size={19} />
          </Link>
        ))}
      </div>
      <section className="section container discover-section">
        <SectionHeading
          eyebrow="MORE THAN A DESTINATION"
          title="The Maldives has so much to offer."
          text="Beyond the postcard is a world of possibilities. Find the places, people, and moments that make it yours."
        />
        <div className="discovery-grid">
          {[
            {
              title: "Extraordinary stays",
              label: "YOUR PRIVATE PARADISE",
              photo: "resort" as const,
              href: "/stays?type=Resort",
            },
            {
              title: "A local kind of lovely",
              label: "GUESTHOUSES & ISLAND LIFE",
              photo: "tropical" as const,
              href: "/stays?type=Guesthouse",
            },
            {
              title: "Moments that stay with you",
              label: "OUT-OF-THE-ORDINARY EXPERIENCES",
              photo: "sea" as const,
              href: "/experiences",
            },
            {
              title: "An island for every you",
              label: "A THOUSAND POSSIBILITIES",
              photo: "lagoon" as const,
              href: "/destinations",
            },
          ].map((c) => (
            <Link className="discovery-card" key={c.title} href={c.href}>
              <PhotoImage
                photo={c.photo}
                alt={`Illustrative tropical scenery: ${c.title}`}
              />
              <div className="destination-shade" />
              <div>
                <span className="eyebrow">{c.label}</span>
                <h3>{c.title}</h3>
              </div>
              <span className="image-arrow">
                <ArrowUpRight size={21} />
              </span>
            </Link>
          ))}
        </div>
      </section>
      <section className="seafoam-section">
        <div className="section container">
          <SectionHeading
            eyebrow="A LITTLE ADVENTURE. A LOT OF WONDER."
            title="Go beyond the beach."
            text="There’s a whole other world waiting just below the surface."
            href="/experiences"
            link="All experiences"
          />
          <div className="grid three">
            {experiences.slice(0, 6).map((e) => (
              <ExperienceCard key={e.id} experience={e} />
            ))}
          </div>
          <p className="caption">
            *Illustrative experience prices per person. Inclusions and
            availability require confirmation.
          </p>
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="CHECK IN. SWITCH OFF."
          title="Somewhere you’ll wish you could stay."
          text="From overwater daydreams to the charm of a local island. Find your kind of stay."
          href="/stays"
          link="Explore all stays"
        />
        <div className="grid three">
          {stays.slice(0, 3).map((s) => (
            <StayCard key={s.id} stay={s} />
          ))}
        </div>
        <p className="caption">
          Curated demonstration collection. Fictional property names,
          illustrative rates, reference photography.
        </p>
      </section>
      <section className="island-story">
        <PhotoImage
          photo="lagoon"
          alt="Turquoise water surrounding a tropical island, reference photograph"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container">
          <span className="eyebrow">SOME PLACES JUST FEEL DIFFERENT</span>
          <h2>
            Beautiful islands.
            <br />
            Endless possibilities.
          </h2>
          <p>
            Quiet corners. Vibrant communities. Open horizons.
            <br />
            Let curiosity lead you somewhere beautiful.
          </p>
          <Button href="/destinations" light>
            Explore the islands
          </Button>
        </div>
        <span className="story-caption">
          A different rhythm. The same extraordinary ocean.
        </span>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="FIND YOUR OWN PACE"
          title="A few islands to fall in love with."
          href="/destinations"
          link="All destinations"
        />
        <div className="grid three">
          {[destinations[3], destinations[2], destinations[4]].map((d) => (
            <DestinationCard key={d.id} destination={d} />
          ))}
        </div>
      </section>
      <section className="benefits-section">
        <div className="section container">
          <SectionHeading
            eyebrow="THOUGHTFULLY PLANNED. PERSONALLY YOURS."
            title="A little local insight. A world of difference."
          />
          <Benefits />
        </div>
      </section>
      <section className="section container">
        <SectionHeading
          eyebrow="NOTES FROM THE ISLANDS"
          title="Good to know before you go."
          href="/travel-guide"
          link="The travel journal"
        />
        <div className="grid three">
          {articles.slice(0, 3).map((a) => (
            <ArticleCard key={a.id} article={a} />
          ))}
        </div>
      </section>
      <section className="container final-cta">
        <PhotoImage
          photo="sunset"
          alt="Warm sunset over the ocean"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div>
          <span className="eyebrow">LET’S MAKE SOME ISLAND MEMORIES</span>
          <h2>
            Ready to experience
            <br />
            the real Maldives?
          </h2>
          <p>
            Tell us what your perfect escape looks like.
            <br />
            We’ll help you find your way there.
          </p>
          <div className="button-row">
            <InquiryButton label="Chat on WhatsApp" light />
            <Button href="/plan-your-trip" outline>
              Send an inquiry
            </Button>
          </div>
          <small>
            WhatsApp opens when a business number is configured. Until then,
            let’s start with your trip ideas.
          </small>
        </div>
      </section>
    </>
  );
}
