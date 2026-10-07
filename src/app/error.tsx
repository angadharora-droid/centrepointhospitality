"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";

/** Fallback for an unexpected rendering error inside a page; the header and footer stay in place. */
export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    // Surface the error to the browser console (and any monitoring hooked into it).
    console.error(error);
  }, [error]);

  return (
    <section aria-labelledby="error-title" className="bg-paper text-ink">
      <Container className="flex min-h-[calc(70svh-var(--header-h))] flex-col justify-center py-section-sm">
        <p className="eyebrow text-stone">Something went wrong</p>
        <h1 id="error-title" className="mt-8 font-display text-page-title">
          This page didn’t load.
        </h1>
        <p className="mt-8 max-w-[28rem] text-lede text-stone">Please try again, or return to the homepage.</p>
        <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
          <button type="button" onClick={retry} className="group inline-flex cursor-pointer items-center gap-4 eyebrow">
            <span className="relative pb-2">
              Try again
              <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-current opacity-25" />
            </span>
          </button>
          <ArrowLink href="/">Return home</ArrowLink>
        </div>
      </Container>
    </section>
  );
}
