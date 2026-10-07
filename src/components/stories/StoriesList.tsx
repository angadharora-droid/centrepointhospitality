"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { RevealHeading } from "@/components/typography/RevealHeading";
import { allStories, storiesHero } from "@/content/stories-page";
import type { PressItem } from "@/data/press";
import { FOCUS_FRAME, OutArrow, STORY_IMAGE, StoryLink, StoryMeta } from "./StoryParts";

const filters = ["All", "Group", "Hotels", "Food & Culture", "Leadership", "Industry", "Community", "Awards"] as const;
type Filter = (typeof filters)[number];

function matches(item: PressItem, filter: Filter) {
  if (filter === "All") return true;
  if (filter === "Group") return item.brands.includes("centre-point-hospitality");
  if (filter === "Hotels") return item.brands.some((brand) => brand.includes("hotel-centre-point") || brand.includes("centre-point-navi"));
  if (filter === "Leadership") return item.subjects.length > 0;
  return item.category === filter;
}

export function StoriesList() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = allStories.filter((item) => matches(item, filter));

  return <>
    <section aria-labelledby="stories-title" className="bg-paper text-ink">
      <Container>
        <Reveal className="grid-site items-end gap-y-8 pt-[clamp(2.5rem,7svh,6rem)] pb-[clamp(3rem,6vw,5.5rem)]">
          <RevealItem variant="fade" className="col-span-full"><p className="eyebrow text-stone">In the news</p></RevealItem>
          <RevealHeading as="h1" id="stories-title" lines={storiesHero.heading} emphasis={storiesHero.emphasis} className="col-span-full font-display text-page-title md:col-span-6 lg:col-span-8" />
          <RevealItem as="p" className="col-span-full max-w-[28rem] text-stone md:col-span-2 md:text-lede lg:col-span-4 lg:pb-3">{storiesHero.intro}</RevealItem>
        </Reveal>
      </Container>
    </section>
    <section aria-label="Press coverage" className="bg-paper pb-section text-ink">
      <Container>
        <div className="flex flex-wrap gap-x-6 gap-y-3 border-y border-line py-5" aria-label="Filter press coverage">
          {filters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={`eyebrow transition-colors ${filter === item ? "text-magenta" : "text-stone hover:text-ink"}`}>{item}</button>)}
        </div>
        <p className="mt-8 text-small text-stone" aria-live="polite">{visible.length} {visible.length === 1 ? "story" : "stories"}</p>
        <ol className="mt-3 border-t border-line">
          {visible.map((story) => <li key={story.id} id={story.id} className="border-b border-line">
            <article className={`group grid-site relative items-start gap-y-5 py-8 md:py-10 ${FOCUS_FRAME}`}>
              {story.image ? <div className="relative col-span-full aspect-[3/2] overflow-hidden bg-linen md:col-span-3 md:aspect-[4/3] lg:col-span-3">
                <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 64rem) 22vw, (min-width: 48rem) 34vw, 92vw" className={STORY_IMAGE} style={{objectPosition: story.image.focus}} />
              </div> : <div aria-hidden="true" className="col-span-full hidden aspect-[4/3] bg-linen md:col-span-3 md:flex md:items-end md:p-5"><span className="eyebrow text-stone">{story.publication}</span></div>}
              <div className="col-span-full md:col-span-5 lg:col-span-7 lg:col-start-5">
                <p className="eyebrow text-stone">{story.publication}</p>
                <div className="mt-3"><StoryMeta story={story} /></div>
                <h2 className="mt-4 font-display text-[clamp(1.5rem,1.2rem+1.1vw,2.5rem)] leading-[1.1] tracking-[-0.01em]"><StoryLink story={story} /></h2>
                <p className="mt-4 max-w-[38rem] text-stone">{story.excerpt}</p>
                <p aria-hidden="true" className="mt-5 eyebrow">Read original <OutArrow className="ml-1.5" /></p>
                <p className="mt-3 text-small capitalize text-stone">{story.subjects.concat(story.brands).map((value) => value.replaceAll("-", " ")).join(" · ")}</p>
              </div>
            </article>
          </li>)}
        </ol>
      </Container>
    </section>
  </>;
}
