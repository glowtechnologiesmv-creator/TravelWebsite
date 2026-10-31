import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="not-found container">
      <span className="eyebrow">404 · A LITTLE OFF THE CHART</span>
      <h1>
        Let’s find your
        <br />
        way to paradise.
      </h1>
      <p>
        This page may have drifted away. There are plenty of islands left to
        explore.
      </p>
      <Button href="/">Back to the islands</Button>
    </section>
  );
}
