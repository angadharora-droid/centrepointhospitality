"use client";

import Image from "next/image";
import { useState } from "react";
import { RevealItem } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/Arrow";
import type { Person } from "@/content/types";
import { LeaderProfile } from "./LeaderProfile";

const COLUMNS = {
  // Homepage: the full team.
  4: "md:grid-cols-2 xl:grid-cols-4",
  // Our Story: the principal three.
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

type LeadershipPeopleProps = { people: Person[]; columns?: keyof typeof COLUMNS };

/**
 * Portrait-led leadership row. Each name is a real button (stretched over the
 * whole card) that opens the profile drawer; someone without an approved
 * biography is shown without a profile rather than with an empty one.
 */
export function LeadershipPeople({ people, columns = 4 }: LeadershipPeopleProps) {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <>
      <ul className={`grid gap-y-14 sm:gap-x-(--spacing-grid) md:gap-y-16 ${COLUMNS[columns]}`}>
        {people.map((person) => {
          const hasProfile = person.bio.length > 0 || ["micky-arora", "angadh-singh-arora", "arjun-singh-arora"].includes(person.slug);
          return (
            <RevealItem
              as="li"
              key={person.slug}
              className="group relative rounded-[1px] has-[button:focus-visible]:outline-2 has-[button:focus-visible]:outline-offset-8 has-[button:focus-visible]:outline-magenta has-[button:focus-visible]:outline-solid"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-linen">
                <Image
                  src={person.portrait.src}
                  alt={person.portrait.alt}
                  fill
                  sizes="(min-width: 80rem) 23vw, (min-width: 48rem) 45vw, 90vw"
                  className="object-cover transition-[scale] duration-700 ease-editorial [filter:contrast(1.02)_saturate(0.92)] group-hover:scale-[1.02] group-has-[button:focus-visible]:scale-[1.02]"
                  style={{ objectPosition: person.portrait.focus }}
                />
              </div>

              <h3 className="mt-6 font-display text-[clamp(1.625rem,1.35rem+0.7vw,2.125rem)] leading-[1.05]">
                {hasProfile ? (
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setSelected(person)}
                    className="text-left outline-none after:absolute after:inset-0 after:content-['']"
                  >
                    {person.name}
                    <span className="sr-only">, view profile</span>
                  </button>
                ) : (
                  person.name
                )}
              </h3>
              <p className="mt-2 eyebrow text-stone">{person.role}</p>

              {hasProfile && (
                <span
                  aria-hidden="true"
                  className="mt-5 inline-flex items-center gap-3 eyebrow transition-[opacity,translate] duration-(--duration-base) ease-editorial xl:translate-y-1 xl:opacity-0 xl:group-hover:translate-y-0 xl:group-hover:opacity-100 xl:group-has-[button:focus-visible]:translate-y-0 xl:group-has-[button:focus-visible]:opacity-100"
                >
                  View profile
                  <Arrow className="transition-transform duration-(--duration-base) group-hover:translate-x-1" />
                </span>
              )}
            </RevealItem>
          );
        })}
      </ul>

      <LeaderProfile person={selected} onClose={() => setSelected(null)} />
    </>
  );
}
