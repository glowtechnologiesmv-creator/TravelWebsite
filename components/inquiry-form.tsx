"use client";
import { useEffect, useState, type FormEvent } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { InquiryButton } from "./interactive";
export function InquiryForm() {
  const [interest, setInterest] = useState(""),
    [success, setSuccess] = useState(false),
    [error, setError] = useState("");
  useEffect(() => {
    setInterest(
      new URLSearchParams(window.location.search).get("interest") || "",
    );
  }, []);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const start = String(data.get("arrival") || ""),
      end = String(data.get("departure") || "");
    if (start && end && end < start) {
      setError("Your departure date must be on or after your arrival date.");
      return;
    }
    if (!String(data.get("name") || "").trim()) {
      setError("Please enter your full name.");
      return;
    }
    setError("");
    setSuccess(true);
  }
  return success ? (
    <div className="demo-success" role="status">
      <span className="success-icon">
        <Check size={30} />
      </span>
      <span className="eyebrow">YOUR IDEAS LOOK WONDERFUL</span>
      <h2>A little closer to island time.</h2>
      <p>
        <strong>
          Demo complete — your inquiry has not been sent or saved.
        </strong>
      </p>
      <p>
        This prototype validates the form locally. A secure form backend and
        approved business contacts must be connected before launch.
      </p>
      <InquiryButton
        subject={interest || "a personalized Maldives escape"}
        label="Continue with WhatsApp"
      />
      <button className="text-link" onClick={() => setSuccess(false)}>
        Back to my inquiry
      </button>
    </div>
  ) : (
    <form onSubmit={submit} className="inquiry-form">
      <div className="form-heading">
        <span className="eyebrow">A FEW DETAILS. ENDLESS POSSIBILITIES.</span>
        <h2>Tell us your kind of escape.</h2>
        <p>
          Only your name and email are required. The rest helps shape your
          ideas.
        </p>
      </div>
      <fieldset>
        <legend>A little about you</legend>
        <div className="form-grid">
          <label>
            Full name <span>*</span>
            <input
              name="name"
              autoComplete="name"
              required
              maxLength={120}
              placeholder="Your full name"
            />
          </label>
          <label>
            Email address <span>*</span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              placeholder="you@example.com"
            />
          </label>
          <label>
            WhatsApp number <small>Optional</small>
            <input
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Include your country code"
            />
          </label>
          <label>
            Country of residence <small>Optional</small>
            <input
              name="country"
              autoComplete="country-name"
              placeholder="Where are you traveling from?"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Your island days</legend>
        <div className="form-grid">
          <label>
            Expected arrival
            <input name="arrival" type="date" />
          </label>
          <label>
            Expected departure
            <input name="departure" type="date" />
          </label>
          <label>
            Adults
            <input
              name="adults"
              type="number"
              min="1"
              max="50"
              defaultValue="2"
            />
          </label>
          <label>
            Children
            <input
              name="children"
              type="number"
              min="0"
              max="30"
              defaultValue="0"
            />
          </label>
          <label>
            Approximate trip budget
            <select name="budget">
              <option value="">Let’s discuss</option>
              <option>Under USD 2,000</option>
              <option>USD 2,000–5,000</option>
              <option>USD 5,000–10,000</option>
              <option>USD 10,000+</option>
            </select>
          </label>
          <label>
            Preferred accommodation
            <select name="stayType">
              <option value="">Open to inspiration</option>
              <option>Resort</option>
              <option>Guesthouse</option>
              <option>Hotel</option>
              <option>Boutique Stay</option>
              <option>A little of both</option>
            </select>
          </label>
          <label className="full-width">
            Preferred island, stay, or experience
            <input
              name="interest"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              placeholder="An island, a property, or just a feeling…"
            />
          </label>
        </div>
      </fieldset>
      <fieldset>
        <legend>What would you love to do?</legend>
        <div className="checkbox-grid">
          {[
            "Snorkeling",
            "Scuba diving",
            "Sandbank visits",
            "Island hopping",
            "Fishing",
            "Surfing",
            "Wildlife encounters",
            "Romantic experiences",
          ].map((i) => (
            <label className="checkbox" key={i}>
              <input type="checkbox" name="experiences" value={i} />
              {i}
            </label>
          ))}
        </div>
      </fieldset>
      <label>
        Anything else we should know?
        <textarea
          name="notes"
          rows={4}
          maxLength={3000}
          placeholder="A special occasion, accessibility needs, dietary preferences, or a little island dream…"
        />
      </label>
      <p className="notice">
        This is a demo inquiry, not a confirmed booking. Nothing is emailed,
        transmitted, or stored. Please use sample details when exploring the
        prototype.
      </p>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button className="button" type="submit">
        Preview my inquiry <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
