import type { Metadata } from "next";
import { Hero } from "@/components/ui";
import { InquiryButton } from "@/components/interactive";
import { InquiryForm } from "@/components/inquiry-form";
import { MessageCircle, Compass, Heart } from "lucide-react";
export const metadata: Metadata = {
  title: "Plan your trip",
  description:
    "Share your Maldives travel ideas in a demonstration trip inquiry. No online booking or payment.",
};
export default function PlanPage() {
  return (
    <>
      <Hero
        title={"LET’S PLAN\nYOUR ESCAPE"}
        subtitle="A quiet beach? An ocean adventure? A little of everything? Tell us what you’re dreaming of."
        photo="sunset"
        eyebrow="EVERY GREAT JOURNEY STARTS WITH A CONVERSATION"
      />
      <section className="section container plan-layout">
        <aside className="plan-aside">
          <span className="eyebrow">PERSONAL FROM THE START</span>
          <h2>
            Your trip.
            <br />
            Your kind of
            <br />
            extraordinary.
          </h2>
          <p>
            No packages to squeeze into. Just a conversation about what makes a
            great trip for you.
          </p>
          <div className="planning-steps">
            {[
              {
                icon: MessageCircle,
                title: "Share your ideas",
                text: "A few details are all we need to get started.",
              },
              {
                icon: Compass,
                title: "Explore the possibilities",
                text: "Shape your route, stays, and experiences.",
              },
              {
                icon: Heart,
                title: "Make it your own",
                text: "Refine a personalized plan at your pace.",
              },
            ].map((s) => (
              <div key={s.title}>
                <s.icon size={21} />
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <h3>Prefer a conversation?</h3>
          <InquiryButton label="Chat on WhatsApp" />
          <p className="caption">
            Business number and email await client approval. Until configured,
            chat actions open this demo inquiry form.
          </p>
        </aside>
        <InquiryForm />
      </section>
    </>
  );
}
