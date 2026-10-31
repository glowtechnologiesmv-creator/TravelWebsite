"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Menu,
  X,
  MessageCircle,
  ArrowUpRight,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  PhotoImage,
  StayCard,
  ExperienceCard,
  DestinationCard,
  ArticleCard,
} from "./ui";
import {
  stays,
  experiences,
  destinations,
  articles,
  type Photo,
} from "@/lib/data";
export function InquiryButton({
  subject,
  label = "Chat With Us",
  light = false,
}: {
  subject?: string;
  label?: string;
  light?: boolean;
}) {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(
    /[\s+()-]/g,
    "",
  );
  const valid = /^[1-9]\d{6,14}$/.test(number);
  const message = subject
    ? `Hello, I'm interested in ${subject}. Could you help me with availability, pricing, and planning my trip?`
    : "Hello, I would love your help planning a personalized Maldives trip.";
  return (
    <a
      className={`button ${light ? "light" : ""}`}
      href={
        valid
          ? `https://wa.me/${number}?text=${encodeURIComponent(message)}`
          : `/plan-your-trip${subject ? `?interest=${encodeURIComponent(subject)}` : ""}`
      }
      target={valid ? "_blank" : undefined}
      rel={valid ? "noopener noreferrer" : undefined}
    >
      <MessageCircle size={17} />
      {label}
      <ArrowUpRight size={16} />
    </a>
  );
}
const nav = [
  ["Home", "/"],
  ["Stays", "/stays"],
  ["Experiences", "/experiences"],
  ["Destinations", "/destinations"],
  ["Travel Guide", "/travel-guide"],
  ["About", "/about"],
];
export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <Link href="/" className="wordmark" aria-label="Maldives home">
        MALDIVES<span>ISLANDS. EXPERIENCES. YOU.</span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {nav.map(([n, h]) => (
          <Link key={h} href={h}>
            {n}
          </Link>
        ))}
      </nav>
      <div className="header-chat">
        <InquiryButton />
      </div>
      <button
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      {open && (
        <nav
          id="mobile-navigation"
          className="mobile-nav"
          aria-label="Mobile navigation"
        >
          {nav.map(([n, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {n}
              <ArrowUpRight size={18} />
            </Link>
          ))}
          <Link href="/plan-your-trip" onClick={() => setOpen(false)}>
            Plan your trip <ArrowUpRight size={18} />
          </Link>
        </nav>
      )}
    </header>
  );
}
export function Gallery({ photos, title }: { photos: Photo[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  return (
    <>
      <div className="gallery">
        {photos.slice(0, 3).map((p, i) => (
          <button
            key={i}
            className={`gallery-photo photo-${i}`}
            onClick={() => setActive(i)}
            aria-label={`Open reference image ${i + 1} of ${title}`}
          >
            <PhotoImage
              photo={p}
              alt={`Reference scenery ${i + 1}; illustrative content for ${title}`}
              priority={i === 0}
            />
            {i === 2 && <span className="gallery-hint">View gallery ↗</span>}
          </button>
        ))}
      </div>
      {active !== null && (
        <dialog
          ref={dialogRef}
          onClose={() => setActive(null)}
          onCancel={() => setActive(null)}
          className="lightbox"
          aria-label={`${title} reference image gallery`}
          onKeyDown={(e) => {
            if (e.key === "Escape") setActive(null);
            if (e.key === "ArrowRight") setActive((active + 1) % photos.length);
            if (e.key === "ArrowLeft")
              setActive((active + photos.length - 1) % photos.length);
          }}
        >
          <button
            autoFocus
            className="lightbox-close"
            onClick={() => setActive(null)}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <div className="lightbox-image">
            <PhotoImage
              photo={photos[active]}
              alt={`Illustrative reference image ${active + 1} for ${title}`}
              sizes="90vw"
            />
          </div>
          <div className="lightbox-controls">
            <button
              onClick={() =>
                setActive((active + photos.length - 1) % photos.length)
              }
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <span>
              {active + 1} / {photos.length} · Reference photography
            </span>
            <button
              onClick={() => setActive((active + 1) % photos.length)}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </div>
        </dialog>
      )}
    </>
  );
}
export function Listing({
  section,
  initialCategory = "All",
}: {
  section: "stays" | "experiences" | "destinations" | "travel-guide";
  initialCategory?: string;
}) {
  const [drawer, setDrawer] = useState(false),
    [category, setCategory] = useState(initialCategory),
    [place, setPlace] = useState("All"),
    [budget, setBudget] = useState("All"),
    [amenity, setAmenity] = useState("All"),
    [meal, setMeal] = useState("All"),
    [sort, setSort] = useState("recommended");
  const categories =
    section === "stays"
      ? ["Resort", "Guesthouse", "Hotel", "Boutique Stay"]
      : section === "experiences"
        ? [...new Set(experiences.map((e) => e.category))]
        : section === "destinations"
          ? ["Island", "Atoll"]
          : [...new Set(articles.map((a) => a.category))];
  const reset = () => {
    setCategory("All");
    setPlace("All");
    setBudget("All");
    setAmenity("All");
    setMeal("All");
    setSort("recommended");
  };
  const select = (
    label: string,
    value: string,
    change: (s: string) => void,
    options: string[],
  ) => (
    <label className="filter-field">
      {label}
      <select aria-label={label} value={value} onChange={(e) => change(e.target.value)}>
        <option value="All">All {label.toLowerCase()}</option>
        {options.map((v) => (
          <option key={v}>{v}</option>
        ))}
      </select>
    </label>
  );
  let content: React.ReactNode[] = [];
  if (section === "stays") {
    const filtered = stays.filter(
      (s) =>
        (category === "All" || s.propertyType === category) &&
        (place === "All" || s.destination === place) &&
        (budget === "All" ||
          (budget === "Under $150"
            ? s.price < 150
            : budget === "$150–$500"
              ? s.price >= 150 && s.price <= 500
              : s.price > 500)) &&
        (amenity === "All" || s.amenities.includes(amenity)) &&
        (meal === "All" || s.mealPlans.includes(meal)),
    );
    filtered.sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.title.localeCompare(b.title)
            : 0,
    );
    content = filtered.map((s) => <StayCard key={s.id} stay={s} />);
  }
  if (section === "experiences") {
    const filtered = experiences.filter(
      (e) =>
        (category === "All" || e.category === category) &&
        (place === "All" || e.destinations.includes(place)) &&
        (budget === "All" ||
          (budget === "Under $150"
            ? e.price < 150
            : budget === "$150–$500"
              ? e.price >= 150 && e.price <= 500
              : e.price > 500)),
    );
    filtered.sort((a, b) =>
      sort === "price-low"
        ? a.price - b.price
        : sort === "price-high"
          ? b.price - a.price
          : sort === "name"
            ? a.title.localeCompare(b.title)
            : 0,
    );
    content = filtered.map((e) => <ExperienceCard key={e.id} experience={e} />);
  }
  if (section === "destinations")
    content = destinations
      .filter(
        (d) =>
          (category === "All" || d.kind === category) &&
          (place === "All" || d.interests.includes(place)),
      )
      .map((d) => <DestinationCard key={d.id} destination={d} />);
  if (section === "travel-guide")
    content = articles
      .filter((a) => category === "All" || a.category === category)
      .map((a) => <ArticleCard key={a.id} article={a} />);
  return (
    <section className="section container">
      <div className="listing-toolbar">
        <span>
          <strong>{content.length}</strong>{" "}
          {section === "travel-guide"
            ? "stories"
            : section === "stays"
              ? "stays"
              : section}{" "}
          to discover
        </span>
        <button
          className="filter-toggle"
          onClick={() => setDrawer(!drawer)}
          aria-expanded={drawer}
          aria-controls="listing-filters"
        >
          <SlidersHorizontal size={17} /> Filters
        </button>
        {(section === "stays" || section === "experiences") && (
          <label className="sort-label">
            Sort by{" "}
            <select aria-label="Sort by" value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="recommended">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        )}
      </div>
      <div
        className={`listing-layout ${section === "travel-guide" ? "no-sidebar" : ""}`}
      >
        <aside
          id="listing-filters"
          className={`filters ${drawer ? "is-open" : ""}`}
        >
          <div className="filter-title">
            <h3>Make it yours</h3>
            <button onClick={reset}>Reset</button>
          </div>
          {select(
            section === "stays"
              ? "Stay type"
              : section === "destinations"
                ? "Destination type"
                : "Category",
            category,
            setCategory,
            categories,
          )}
          {(section === "stays" || section === "experiences") && (
            <label className="filter-field">
              Island / Atoll
              <select value={place} onChange={(e) => setPlace(e.target.value)}>
                <option value="All">All destinations</option>
                {destinations.map((d) => (
                  <option value={d.slug} key={d.slug}>
                    {d.title} · {d.atoll}
                  </option>
                ))}
              </select>
            </label>
          )}
          {section === "destinations" &&
            select("Interests", place, setPlace, [
              "Beaches",
              "Diving",
              "Wildlife",
              "Local culture",
              "Water sports",
            ])}
          {(section === "stays" || section === "experiences") &&
            select("Price range", budget, setBudget, [
              "Under $150",
              "$150–$500",
              "Over $500",
            ])}
          {section === "stays" && (
            <>
              {select("Amenities", amenity, setAmenity, [
                "Wi-Fi",
                "Pool",
                "Spa",
                "Restaurant",
                "Beach access",
                "Air conditioning",
              ])}
              {select("Meal plans", meal, setMeal, [
                "Breakfast",
                "Half Board",
                "Full Board",
                "All Inclusive",
              ])}
            </>
          )}
          <p className="filter-note">
            A little guidance goes a long way. Tell us what you love and we’ll
            help narrow it down.
          </p>
          <Link className="text-link" href="/plan-your-trip">
            Help me choose <ArrowUpRight size={16} />
          </Link>
          <button
            className="filter-done button"
            onClick={() => setDrawer(false)}
          >
            Show {content.length} results
          </button>
        </aside>
        <div>
          <div
            className={`grid ${section === "travel-guide" ? "three" : "two"}`}
          >
            {content}
          </div>
          {!content.length && (
            <div className="empty-state">
              <h2>A different kind of escape?</h2>
              <p>
                No matches for these filters. Try a wider search or let us help
                you find your island.
              </p>
              <button className="button" onClick={reset}>
                Clear filters
              </button>
              <Link className="text-link" href="/plan-your-trip">
                Ask our team <ArrowUpRight size={17} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
