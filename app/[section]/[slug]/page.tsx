export const dynamicParams = false;
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, Users, Activity, ArrowUpRight } from "lucide-react";
import {
  stays,
  experiences,
  destinations,
  articles,
  destinationName,
  demoNotice,
} from "@/lib/data";
import { Gallery, InquiryButton } from "@/components/interactive";
import {
  Breadcrumbs,
  Price,
  Amenities,
  FAQ,
  SectionHeading,
  StayCard,
  ExperienceCard,
  DestinationCard,
  ArticleCard,
  Hero,
  PhotoImage,
} from "@/components/ui";
const collections = {
  stays,
  experiences,
  destinations,
  "travel-guide": articles,
};
export function generateStaticParams() {
  return Object.entries(collections).flatMap(([section, items]) =>
    items.map((item) => ({ section, slug: item.slug })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  const record = collections[section as keyof typeof collections]?.find(
    (i) => i.slug === slug,
  );
  return { title: record?.title || "Not found", description: record?.summary };
}
const commonFAQ = [
  {
    question: "Can I book through this website?",
    answer:
      "This is a discovery and inquiry prototype, with no online booking or payments. Ask for a personalized recommendation and a verified quote.",
  },
  {
    question: "Are the displayed prices final?",
    answer:
      "No. These are illustrative sample rates. Availability, taxes, transfers, and inclusions must be confirmed in a real quote.",
  },
];
export default async function DetailPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (section === "stays") {
    const s = stays.find((s) => s.slug === slug);
    if (!s) notFound();
    return (
      <div className="detail-page">
        <div className="container">
          <Breadcrumbs section={section} title={s.title} />
          <div className="detail-title">
            <div>
              <span className="eyebrow">
                {s.propertyType} · DEMONSTRATION STAY
              </span>
              <h1>{s.title}</h1>
              <p>
                <MapPin size={16} />
                <Link href={`/destinations/${s.destination}`}>
                  {destinationName(s.destination)}
                </Link>{" "}
                · Maldives
              </p>
            </div>
            <InquiryButton subject={s.title} label="Chat About This Stay" />
          </div>
          <Gallery photos={s.gallery} title={s.title} />
          <p className="caption">{demoNotice}</p>
          <div className="detail-layout">
            <div className="detail-main">
              <section>
                <span className="eyebrow">YOUR ISLAND HIDEAWAY</span>
                <h2>Make yourself at home.</h2>
                <p className="lead">{s.summary}</p>
                <p>{s.description}</p>
              </section>
              <section>
                <h2>The little comforts.</h2>
                <Amenities items={s.amenities} />
              </section>
              <section>
                <h2>A room with your kind of view.</h2>
                <p>
                  Sample room configurations. Layouts, bed types, and occupancy
                  must be confirmed with the selected real property.
                </p>
                <div className="room-grid">
                  {s.rooms.map((r, i) => (
                    <article className="room-card" key={r.name}>
                      <div className="room-photo">
                        <PhotoImage
                          photo={s.gallery[i]}
                          alt="Reference scenery, not an actual room photograph"
                        />
                      </div>
                      <div>
                        <span className="eyebrow">SAMPLE ROOM TYPE</span>
                        <h3>{r.name}</h3>
                        <p>{r.size}</p>
                        <p>
                          <Users size={16} />
                          {r.occupancy}
                        </p>
                        <p>{r.beds}</p>
                        <InquiryButton
                          subject={`${s.title} — ${r.name}`}
                          label="Ask about this room"
                        />
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <section>
                <h2>Good food. Easy days.</h2>
                <p>
                  Explore a meal plan that suits the way you travel. Sample
                  options include:
                </p>
                <Amenities items={s.mealPlans} />
                <p>
                  Restaurant inclusions, drinks, dietary requirements, and child
                  meal charges need individual confirmation.
                </p>
              </section>
              <section>
                <h2>The journey is part of the story.</h2>
                <p>{s.transfer}</p>
                <div className="info-panel">
                  <MapPin size={23} />
                  <div>
                    <h3>{destinationName(s.destination)}</h3>
                    <p>
                      {
                        destinations.find((d) => d.slug === s.destination)
                          ?.summary
                      }
                    </p>
                    <Link
                      className="text-link"
                      href={`/destinations/${s.destination}`}
                    >
                      Explore the destination <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </section>
              <section>
                <h2>A few useful details.</h2>
                <dl className="facts">
                  <div>
                    <dt>Check-in</dt>
                    <dd>{s.checkIn}</dd>
                  </div>
                  <div>
                    <dt>Check-out</dt>
                    <dd>{s.checkOut}</dd>
                  </div>
                  <div>
                    <dt>Verified date</dt>
                    <dd>
                      {s.lastVerified || "Not verified — demonstration record"}
                    </dd>
                  </div>
                </dl>
                <h3>Policies, families & cancellations</h3>
                <ul className="prose-list">
                  {s.policies.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </section>
              <section>
                <h2>Your questions, answered.</h2>
                <FAQ
                  items={[
                    ...commonFAQ,
                    {
                      question: "Are children welcome?",
                      answer:
                        "Family policies are property specific. Share children’s ages, sleeping arrangements, and any accessibility needs when requesting a quote.",
                    },
                  ]}
                />
              </section>
            </div>
            <aside className="inquiry-panel">
              <span className="eyebrow">YOUR ESCAPE STARTS HERE</span>
              <Price price={s.price} unit={s.priceUnit} />
              <p>{s.priceDisclaimer}</p>
              <InquiryButton subject={s.title} label="Chat About This Stay" />
              <Link
                className="text-link"
                href={`/plan-your-trip?interest=${encodeURIComponent(s.title)}`}
              >
                Request a personalized quote <ArrowUpRight size={15} />
              </Link>
              <hr />
              <p>
                No online booking. Just thoughtful advice and a trip shaped
                around you.
              </p>
            </aside>
          </div>
          <section className="section">
            <SectionHeading
              eyebrow="KEEP DREAMING"
              title="A few more places to call home."
              href="/stays"
            />
            <div className="grid three">
              {stays
                .filter((x) => x.id !== s.id)
                .slice(0, 3)
                .map((x) => (
                  <StayCard key={x.id} stay={x} />
                ))}
            </div>
          </section>
        </div>
        <div className="mobile-inquiry">
          <span>
            Sample from <strong>${s.price}</strong> / night
          </span>
          <InquiryButton subject={s.title} label="Ask about this stay" />
        </div>
      </div>
    );
  }
  if (section === "experiences") {
    const e = experiences.find((x) => x.slug === slug);
    if (!e) notFound();
    return (
      <div className="detail-page">
        <div className="container">
          <Breadcrumbs section={section} title={e.category} />
          <div className="detail-title">
            <div>
              <span className="eyebrow">{e.category} · SAMPLE EXCURSION</span>
              <h1>{e.title}</h1>
              <p>{e.destinations.map(destinationName).join(" · ")}</p>
            </div>
          </div>
          <Gallery photos={e.gallery} title={e.title} />
          <p className="caption">
            Illustrative reference photography, itinerary, and pricing. No
            wildlife sightings or availability are guaranteed.
          </p>
          <div className="detail-layout">
            <div className="detail-main">
              <section>
                <span className="eyebrow">A DIFFERENT KIND OF ISLAND DAY</span>
                <h2>A little adventure. A lasting memory.</h2>
                <p className="lead">{e.summary}</p>
                <dl className="experience-facts">
                  <div>
                    <Clock />
                    <dt>Duration</dt>
                    <dd>{e.duration}</dd>
                  </div>
                  <div>
                    <Users />
                    <dt>Group size</dt>
                    <dd>{e.groupSize}</dd>
                  </div>
                  <div>
                    <Activity />
                    <dt>Difficulty</dt>
                    <dd>{e.difficulty}</dd>
                  </div>
                </dl>
              </section>
              <section>
                <h2>What your day could look like.</h2>
                <ol className="itinerary">
                  {e.itinerary.map((step, i) => (
                    <li key={step}>
                      <span>0{i + 1}</span>
                      <div>
                        <h3>{step}</h3>
                        <p>
                          Illustrative sequence; your guide will adapt to the
                          group and conditions.
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </section>
              <section className="included-grid">
                <div>
                  <h3>What’s included</h3>
                  <Amenities items={e.included} />
                </div>
                <div>
                  <h3>Plan separately</h3>
                  <ul className="prose-list">
                    {e.excluded.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>
              </section>
              <section>
                <h2>Before you set out.</h2>
                <Amenities items={e.requirements} />
                <h3>Your safety comes first</h3>
                <p>{e.safety}</p>
                <h3>When to go</h3>
                <p>{e.season}</p>
              </section>
              <section>
                <h2>A few things you might wonder.</h2>
                <FAQ
                  items={[
                    ...commonFAQ,
                    {
                      question: "What happens if conditions change?",
                      answer:
                        "The real operator must confirm weather, cancellation, and rescheduling terms before you make plans. Sample itineraries may change for safety.",
                    },
                  ]}
                />
              </section>
            </div>
            <aside className="inquiry-panel">
              <span className="eyebrow">FOLLOW YOUR CURIOSITY</span>
              <Price price={e.price} />
              <p>
                Sample rate only. Inclusions, safety arrangements, transfers,
                and operator details need confirmation.
              </p>
              <InquiryButton
                subject={e.title}
                label="Ask About This Experience"
              />
              <p>No checkout. Let’s find an experience that’s right for you.</p>
            </aside>
          </div>
          <section className="section">
            <SectionHeading
              eyebrow="THERE’S MORE TO DISCOVER"
              title="Keep your sense of wonder."
            />
            <div className="grid three">
              {experiences
                .filter((x) => x.id !== e.id)
                .slice(0, 3)
                .map((x) => (
                  <ExperienceCard key={x.id} experience={x} />
                ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  if (section === "destinations") {
    const d = destinations.find((x) => x.slug === slug);
    if (!d) notFound();
    return (
      <>
        <Hero
          title={d.title.toUpperCase()}
          subtitle={d.summary}
          photo={d.photo}
          eyebrow={d.atoll.toUpperCase()}
        >
          <InquiryButton
            subject={`a trip to ${d.title}`}
            label="Let’s explore this island"
            light
          />
        </Hero>
        <div className="container">
          <Breadcrumbs section={section} title={d.title} />
          <div className="destination-intro section">
            <div>
              <span className="eyebrow">FIND YOUR ISLAND RHYTHM</span>
              <h2>
                A place to slow down.
                <br />A world to discover.
              </h2>
              <p className="lead">{d.description}</p>
            </div>
            <div className="info-panel">
              <div>
                <span className="eyebrow">
                  {d.atoll} · {d.kind}
                </span>
                <h3>Known for</h3>
                <Amenities items={d.highlights} />
              </div>
            </div>
          </div>
          <Gallery photos={d.gallery} title={d.title} />
          <p className="caption">
            Reference tropical scenery; these images are not verified
            documentary photographs of {d.title}.
          </p>
          <div className="destination-intro section">
            <div>
              <h2>Finding your way here.</h2>
              <p>{d.travel}</p>
              <h3>Beaches & island moments</h3>
              <p>
                Start with a beach walk, explore the lagoon with a suitable
                guide, and take time to discover island life. Confirm designated
                swimming areas and visitor access locally.
              </p>
            </div>
            <div>
              <h2>A little local know-how.</h2>
              <Amenities items={d.tips} />
            </div>
          </div>
          <section className="section">
            <SectionHeading
              eyebrow="ISLAND DAYS, YOUR WAY"
              title={`Experiences around ${d.title}.`}
            />
            <div className="grid three">
              {experiences
                .filter((e) => e.destinations.includes(d.slug))
                .map((e) => (
                  <ExperienceCard key={e.id} experience={e} />
                ))}
            </div>
          </section>
          <section className="section">
            <SectionHeading
              eyebrow="STAY A LITTLE LONGER"
              title="Find your island home."
            />
            <div className="grid three">
              {stays
                .filter((s) => s.destination === d.slug)
                .map((s) => (
                  <StayCard key={s.id} stay={s} />
                ))}
            </div>
          </section>
          <section className="centered section">
            <h2>Your next chapter starts on an island.</h2>
            <p>
              Let’s shape a journey around {d.title}, and everything you love.
            </p>
            <InquiryButton
              subject={`a trip to ${d.title}`}
              label="Plan my island escape"
            />
          </section>
        </div>
      </>
    );
  }
  if (section === "travel-guide") {
    const a = articles.find((x) => x.slug === slug);
    if (!a) notFound();
    return (
      <div className="detail-page">
        <div className="container">
          <Breadcrumbs section={section} title={a.title} />
          <header className="article-title">
            <span className="eyebrow">
              {a.category} / {a.minutes} MIN READ
            </span>
            <h1>{a.title}</h1>
            <p>{a.summary}</p>
          </header>
          <div className="article-cover">
            <PhotoImage
              photo={a.photo}
              alt="Illustrative tropical island scenery"
              priority
              sizes="100vw"
            />
          </div>
          <article className="article-prose">
            <p className="lead">
              A thoughtful trip starts with a few good ideas. Use this guide as
              a starting point, then confirm the details for your own dates and
              destinations.
            </p>
            {a.content.map((c, i) => (
              <section key={c.heading}>
                <h2>{c.heading}</h2>
                {c.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {i === 0 && (
                  <figure>
                    <div className="article-inline-image">
                      <PhotoImage
                        photo="beach"
                        alt="Reference white sand beach and ocean"
                        sizes="750px"
                      />
                    </div>
                    <figcaption>
                      Leave a little room for island time. Illustrative
                      reference photography.
                    </figcaption>
                  </figure>
                )}
              </section>
            ))}
            <aside className="article-note">
              <h3>Let’s make these ideas yours.</h3>
              <p>
                Tell us about your dates, your travel style, and the experiences
                you’d love.
              </p>
              <InquiryButton
                subject={`trip planning inspired by ${a.title}`}
                label="Plan my trip"
              />
            </aside>
            <p className="caption">
              Sample editorial content. Check current official travel guidance,
              local rules, and operator information before travel.
            </p>
          </article>
          <section className="section">
            <SectionHeading
              eyebrow="YOUR NEXT CHAPTER"
              title="Islands to inspire you."
            />
            <div className="grid three">
              {destinations
                .filter((d) => a.destinations.includes(d.slug))
                .map((d) => (
                  <DestinationCard key={d.id} destination={d} />
                ))}
            </div>
          </section>
          <section className="section">
            <SectionHeading
              eyebrow="KEEP READING"
              title="More notes from the islands."
            />
            <div className="grid three">
              {articles
                .filter((x) => a.relatedArticles.includes(x.slug))
                .map((x) => (
                  <ArticleCard key={x.id} article={x} />
                ))}
            </div>
          </section>
        </div>
      </div>
    );
  }
  notFound();
}
