export const dynamicParams = false;
import { notFound } from "next/navigation";
import {
  Hero,
  SectionHeading,
  Benefits,
  Button,
  PhotoImage,
} from "@/components/ui";
import { Listing, InquiryButton } from "@/components/interactive";
import { demoNotice, type Photo } from "@/lib/data";
const pages: Record<
  string,
  { title: string; subtitle: string; photo: Photo; eyebrow: string }
> = {
  stays: {
    title: "PLACES TO STAY",
    subtitle:
      "From world-class resorts to charming guesthouses, discover your perfect Maldives getaway.",
    photo: "resort",
    eyebrow: "WAKE UP SOMEWHERE EXTRAORDINARY",
  },
  experiences: {
    title: "UNFORGETTABLE\nEXPERIENCES",
    subtitle:
      "Follow your curiosity. Find your adventure. Make memories that stay with you.",
    photo: "sea",
    eyebrow: "THE OCEAN IS ONLY THE BEGINNING",
  },
  destinations: {
    title: "EXPLORE THE ISLANDS",
    subtitle:
      "A thousand islands. A thousand possibilities. Somewhere out there is your kind of paradise.",
    photo: "lagoon",
    eyebrow: "FIND YOUR OWN CORNER OF THE OCEAN",
  },
  "travel-guide": {
    title: "THE ISLAND JOURNAL",
    subtitle:
      "A little inspiration. A little local knowledge. Everything for a more meaningful escape.",
    photo: "beach",
    eyebrow: "STORIES, IDEAS & GOOD-TO-KNOWS",
  },
  about: {
    title: "ISLANDS AT HEART.",
    subtitle:
      "A more personal way to discover the Maldives. Built around your curiosity, your pace, and your idea of extraordinary.",
    photo: "tropical",
    eyebrow: "GET TO KNOW OUR APPROACH",
  },
};
export function generateStaticParams() {
  return Object.keys(pages).map((section) => ({ section }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  return {
    title: pages[section]?.title.replace("\n", " ") || "Page not found",
  };
}
export default async function SectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ section: string }>;
  searchParams: Promise<{ type?: string }>;
}) {
  const { section } = await params;
  const query = await searchParams;
  const page = pages[section];
  if (!page) notFound();
  return (
    <>
      <Hero {...page} />
      {section === "about" ? (
        <>
          <section className="section container story-grid">
            <div className="story-photo">
              <PhotoImage
                photo="beach"
                alt="Reference tropical beach with white sand"
              />
            </div>
            <div>
              <span className="eyebrow">OUR STORY, STILL TAKING SHAPE</span>
              <h2>
                Travel that feels
                <br />a little more like you.
              </h2>
              <p>
                The Maldives means something different to everyone. A quiet
                stretch of sand. A first glimpse beneath the surface. A chance
                to slow down together.
              </p>
              <p>
                Our vision is simple: help you discover the stays and
                experiences that fit the way you want to travel, through
                thoughtful recommendations and a real conversation.
              </p>
              <p className="notice">
                Brand story placeholder: the company’s history, team,
                credentials, and contact details will be added after client
                verification. This prototype makes no claims about an operating
                agency.
              </p>
              <Button href="/plan-your-trip">Tell us your island dreams</Button>
            </div>
          </section>
          <section className="seafoam-section">
            <div className="section container">
              <SectionHeading
                eyebrow="PERSONAL BY DESIGN"
                title="Good journeys begin with listening."
                text="Explore freely, share what matters, and shape your plans together. No checkout. No pressure. Just a more thoughtful way to travel."
              />
              <Benefits />
            </div>
          </section>
          <section className="section container centered">
            <span className="eyebrow">FROM INSPIRATION TO ISLAND TIME</span>
            <h2>
              Your ideas. A little guidance.
              <br />
              An escape that’s all yours.
            </h2>
            <p>
              Discover a stay. Save an idea. Ask a question.
              <br />
              We’ll help connect the details in a personalized travel plan.
            </p>
            <InquiryButton />
          </section>
        </>
      ) : (
        <>
          <div className="container listing-intro">
            <p>
              {section === "stays"
                ? demoNotice
                : section === "destinations"
                  ? "Destination information is introductory. Images are illustrative reference scenery, not verified photographs of the named locations."
                  : section === "experiences"
                    ? "Sample excursions and indicative prices. Operators, safety arrangements, and availability must be verified before travel."
                    : "Editorial planning inspiration. Check current local guidance, schedules, and entry requirements before travel."}
            </p>
          </div>
          <Listing
            initialCategory={
              section === "stays" &&
              ["Resort", "Guesthouse", "Hotel", "Boutique Stay"].includes(
                query.type || "",
              )
                ? query.type
                : "All"
            }
            section={
              section as
                "stays" | "experiences" | "destinations" | "travel-guide"
            }
          />
        </>
      )}
    </>
  );
}
