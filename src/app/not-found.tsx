import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

/** Quiet and on-brand: say what happened, offer the way home. */
export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bg-paper text-ink">
      <Container className="flex min-h-[calc(70svh-var(--header-h))] flex-col justify-center py-section-sm">
        <p className="eyebrow text-stone">404</p>
        <h1 id="not-found-title" className="mt-8 font-display text-page-title">
          Page not found.
        </h1>
        <p className="mt-8 max-w-[28rem] text-lede text-stone">This place doesn’t seem to exist.</p>
        <ArrowLink href="/" className="mt-12 self-start">
          Return home
        </ArrowLink>
      </Container>
    </section>
  );
}
