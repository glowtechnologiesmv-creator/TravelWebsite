import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Clock,
  Waves,
  Check,
} from "lucide-react";
import {
  imageUrl,
  type Photo,
  type Stay,
  type Experience,
  type Destination,
  type Article,
  destinationName,
} from "@/lib/data";
export function PhotoImage({
  photo,
  alt,
  priority = false,
  sizes = "(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw",
}: {
  photo: Photo;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={imageUrl(photo)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className="photo"
    />
  );
}
export function Button({
  href,
  children,
  light = false,
  outline = false,
}: {
  href: string;
  children: React.ReactNode;
  light?: boolean;
  outline?: boolean;
}) {
  return (
    <Link
      className={`button ${light ? "light" : ""} ${outline ? "outline" : ""}`}
      href={href}
    >
      {children}
      <ArrowUpRight size={17} />
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
  href,
  link = "Explore more",
}: {
  eyebrow: string;
  title: string;
  text?: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {href && (
        <Link className="text-link" href={href}>
          {link}
          <ArrowRight size={18} />
        </Link>
      )}
    </div>
  );
}
export function Hero({
  title,
  subtitle,
  photo = "island",
  eyebrow = "A LITTLE CLOSER TO PARADISE",
  home = false,
  children,
}: {
  title: string;
  subtitle: string;
  photo?: Photo;
  eyebrow?: string;
  home?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`hero ${home ? "home-hero" : ""}`}>
      <PhotoImage
        photo={photo}
        alt="Reference photograph of a tropical island and turquoise ocean"
        priority
        sizes="100vw"
      />
      <div className="hero-shade" />
      <div className="container hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        {children}
      </div>
      {home && (
        <div className="hero-bottom container">
          <span>YOUR ISLAND STORY STARTS HERE</span>
          <span>Scroll to discover ↓</span>
          <span>04°17′ N &nbsp; 73°30′ E</span>
        </div>
      )}
    </section>
  );
}
export function Price({
  price,
  unit = "person",
}: {
  price: number;
  unit?: string;
}) {
  return (
    <div className="price">
      <span>Illustrative from</span>
      <strong>${price.toLocaleString("en-US")}</strong>
      <small>USD / {unit}</small>
    </div>
  );
}
export function StayCard({ stay }: { stay: Stay }) {
  return (
    <article className="stay-card">
      <Link href={`/stays/${stay.slug}`} className="card-image">
        <PhotoImage
          photo={stay.photo}
          alt={`Reference tropical accommodation scenery for ${stay.title}; fictional property`}
        />
        <span className="image-tag">{stay.propertyType}</span>
        <span className="image-arrow">
          <ArrowUpRight size={21} />
        </span>
      </Link>
      <div className="card-body">
        <span className="location">
          <MapPin size={13} />
          {destinationName(stay.destination)} · Demo stay
        </span>
        <h3>
          <Link href={`/stays/${stay.slug}`}>{stay.title}</Link>
        </h3>
        <p>{stay.amenities.slice(0, 3).join(" · ")}</p>
        <div className="card-bottom">
          <Price price={stay.price} unit="night" />
          <Link className="text-link" href={`/stays/${stay.slug}`}>
            View details <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
export function ExperienceCard({ experience: e }: { experience: Experience }) {
  return (
    <article className="experience-card">
      <Link href={`/experiences/${e.slug}`} className="card-image">
        <PhotoImage
          photo={e.photo}
          alt={`Illustrative ocean scenery for ${e.category}`}
        />
        <span className="image-arrow">
          <ArrowUpRight size={21} />
        </span>
      </Link>
      <div className="card-body">
        <span className="eyebrow">{e.category}</span>
        <h3>
          <Link href={`/experiences/${e.slug}`}>{e.title}</Link>
        </h3>
        <div className="card-bottom">
          <span className="muted">
            <Clock size={14} /> 2–4 hours · sample
          </span>
          <span className="small-price">From ${e.price}*</span>
        </div>
      </div>
    </article>
  );
}
export function DestinationCard({
  destination: d,
}: {
  destination: Destination;
}) {
  return (
    <Link className="destination-card" href={`/destinations/${d.slug}`}>
      <PhotoImage
        photo={d.photo}
        alt={`Reference island scenery; illustrative of ${d.title}, not a verified location photograph`}
      />
      <div className="destination-shade" />
      <div className="destination-label">
        <span className="eyebrow">{d.atoll}</span>
        <h3>{d.title}</h3>
        <p>{d.interests.join(" · ")}</p>
      </div>
      <span className="image-arrow">
        <ArrowUpRight size={22} />
      </span>
    </Link>
  );
}
export function ArticleCard({ article: a }: { article: Article }) {
  return (
    <article className="article-card">
      <Link className="card-image" href={`/travel-guide/${a.slug}`}>
        <PhotoImage
          photo={a.photo}
          alt="Illustrative Maldives travel scenery"
        />
      </Link>
      <div className="card-body">
        <span className="eyebrow">
          {a.category} <span className="muted">/ {a.minutes} MIN READ</span>
        </span>
        <h3>
          <Link href={`/travel-guide/${a.slug}`}>{a.title}</Link>
        </h3>
        <p>{a.summary}</p>
        <Link className="text-link" href={`/travel-guide/${a.slug}`}>
          Read the story <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  );
}
export function Breadcrumbs({
  section,
  title,
}: {
  section: string;
  title: string;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <span>/</span>
      <Link href={`/${section}`}>{section.replaceAll("-", " ")}</Link>
      <span>/</span>
      <span aria-current="page">{title}</span>
    </nav>
  );
}
export function FAQ({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq">
      {items.map((i) => (
        <details key={i.question}>
          <summary>
            {i.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{i.answer}</p>
        </details>
      ))}
    </div>
  );
}
export function Amenities({ items }: { items: string[] }) {
  return (
    <ul className="amenities">
      {items.map((i) => (
        <li key={i}>
          <Check size={17} />
          {i}
        </li>
      ))}
    </ul>
  );
}
export function Benefits() {
  return (
    <div className="benefits">
      {[
        {
          icon: MapPin,
          title: "Local expertise",
          text: "A little local knowledge makes a world of difference.",
        },
        {
          icon: Waves,
          title: "Tailored to you",
          text: "Your pace, your preferences, your kind of paradise.",
        },
        {
          icon: ArrowUpRight,
          title: "A real conversation",
          text: "Talk through the details with a travel specialist.",
        },
        {
          icon: Check,
          title: "Here along the way",
          text: "Thoughtful guidance from first ideas to island days.",
        },
      ].map((b) => (
        <div key={b.title}>
          <b.icon size={25} strokeWidth={1.4} />
          <h3>{b.title}</h3>
          <p>{b.text}</p>
        </div>
      ))}
    </div>
  );
}
