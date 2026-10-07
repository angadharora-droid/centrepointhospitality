"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Person } from "@/content/types";
import { pressForSubject } from "@/data/press";
import { formatEditorialDate } from "@/lib/date";

const NAME_ID = "leader-profile-name";

type LeaderProfileProps = {
  person: Person | null;
  onClose: () => void;
};

/**
 * Editorial profile in a native modal <dialog>: the platform supplies the focus
 * trap, Escape, an inert page and focus return to the opening control. The
 * last person stays rendered while the drawer slides away.
 */
export function LeaderProfile({ person, onClose }: LeaderProfileProps) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shown, setShown] = useState(person);
  if (person && person !== shown) setShown(person);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (person && !el.open) el.showModal();
    if (!person && el.open) el.close();
  }, [person]);

  const close = () => dialog.current?.close();

  return (
    <dialog
      ref={dialog}
      data-drawer=""
      aria-labelledby={NAME_ID}
      onClose={onClose}
      // A click on the dialog box itself (not its content) is a click on the backdrop.
      onClick={(event) => event.target === event.currentTarget && close()}
      className="[--focus-ring:var(--color-magenta)]"
    >
      {shown && (
        <div className="min-h-full">
          <div className="sticky top-0 z-10 flex justify-end bg-paper/95 px-gutter py-5 backdrop-blur-[2px] lg:py-7">
            <button type="button" onClick={close} className="group -m-3 flex items-center gap-3 p-3 eyebrow">
              Close
              <svg aria-hidden="true" viewBox="0 0 12 12" className="h-3 w-3 fill-none stroke-current">
                <path d="M1 1 L11 11 M11 1 L1 11" strokeWidth="1" />
              </svg>
            </button>
          </div>

          <div className="grid gap-10 px-gutter pt-2 pb-16 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)] lg:gap-[clamp(2.5rem,4vw,4.5rem)] lg:pb-24">
            <div className="relative aspect-[4/5] self-start overflow-hidden bg-linen lg:sticky lg:top-24">
              <Image
                src={shown.portrait.src}
                alt={shown.portrait.alt}
                fill
                sizes="(min-width: 64rem) 28vw, 100vw"
                className="object-cover [filter:contrast(1.02)_saturate(0.92)]"
                style={{ objectPosition: shown.portrait.focus }}
              />
            </div>

            <div className="lg:pt-4">
              <p className="eyebrow text-stone">{shown.role}</p>
              <h2 id={NAME_ID} className="mt-4 font-display text-[clamp(2.75rem,2rem+3vw,4.75rem)] leading-[0.95] tracking-[-0.015em]">
                {shown.name}
              </h2>

              {shown.belief && (
                <p className="mt-8 font-display text-title text-magenta italic">“{shown.belief}”</p>
              )}

              <div className="mt-8 max-w-[38rem] space-y-5 text-[1.0625rem] leading-[1.7] lg:mt-10 lg:text-[1.1875rem]">
                {shown.bio.map((paragraph) => (
                  <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                ))}
              </div>

              {shown.highlights && (
                <dl className="mt-12 grid max-w-[38rem] gap-x-(--spacing-grid) gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
                  {shown.highlights.map((item) => (
                    <div key={item.label}>
                      <dt className="eyebrow text-stone">{item.label}</dt>
                      <dd className="mt-2 text-body">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              {pressForSubject(shown.slug).length > 0 && (
                <div className="mt-12 max-w-[38rem] border-t border-line pt-8">
                  <p className="eyebrow text-stone">In the news</p>
                  <ul className="mt-5 divide-y divide-line border-y border-line">
                    {pressForSubject(shown.slug).map((item) => (
                      <li key={item.id} className="py-5">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-magenta">
                          <p className="eyebrow text-stone">{item.publication}{item.date ? ` · ${formatEditorialDate(item.date)}` : ""}</p>
                          <p className="mt-2 font-display text-[1.35rem] leading-tight">{item.headline} <span aria-hidden="true" className="text-magenta">↗</span></p>
                          <span className="sr-only">(opens in a new tab)</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                  <a href="/stories" className="mt-6 inline-block eyebrow">View more press →</a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}
