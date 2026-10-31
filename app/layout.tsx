import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Waves } from "lucide-react";
import { Header, InquiryButton } from "@/components/interactive";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "./globals.css";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MALDIVES — Your islands. Your way.",
    template: "%s | MALDIVES",
  },
  description:
    "Discover extraordinary islands, unique stays, and unforgettable Maldives experiences. A travel discovery prototype with personalized trip inquiries.",
  openGraph: {
    title: "MALDIVES — Your islands. Your way.",
    description: "An island escape, shaped around you.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85",
        width: 1200,
        height: 630,
        alt: "Tropical island reference scenery",
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <footer className="footer">
          <div className="container">
            <div className="footer-top">
              <div>
                <Link href="/" className="wordmark">
                  MALDIVES<span>ISLANDS. EXPERIENCES. YOU.</span>
                </Link>
                <p>
                  Your island story, thoughtfully made.
                  <br />
                  Discover the Maldives your way.
                </p>
              </div>
              <div>
                <h3>Explore</h3>
                <Link href="/stays">Places to stay</Link>
                <Link href="/experiences">Experiences</Link>
                <Link href="/destinations">Destinations</Link>
                <Link href="/travel-guide">Travel guide</Link>
              </div>
              <div>
                <h3>Find your island</h3>
                <Link href="/destinations/maafushi">Maafushi</Link>
                <Link href="/destinations/dhigurah">Dhigurah</Link>
                <Link href="/destinations/baa-atoll">Baa Atoll</Link>
                <Link href="/about">Our approach</Link>
              </div>
              <div>
                <h3>Let’s make it happen</h3>
                <p>
                  A few ideas. A real conversation.
                  <br />A trip that feels like you.
                </p>
                <InquiryButton label="Start a conversation" />
                <Link href="/plan-your-trip" className="footer-inquiry">
                  Send an inquiry <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
            <div className="footer-bottom">
              <span>
                © {new Date().getFullYear()} MALDIVES · Design prototype
              </span>
              <span>
                <Waves size={15} /> Made for island time
              </span>
              <span>Contact & social details awaiting client approval</span>
            </div>
            <p className="footer-disclaimer">
              Fictional accommodation and illustrative prices. Reference photos
              are development placeholders, not photographs of named properties.
              No booking or payment services. Business contact channels are not
              yet configured.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
