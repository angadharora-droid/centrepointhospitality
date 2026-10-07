import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { life as content } from "@/content/careers";
import { cn } from "@/lib/cn";

// An editorial grid of varying proportions; each entry lines up with
// content.images by index. Mobile simply stacks them.
const wide = "(min-width: 64rem) 52vw, (min-width: 48rem) 60vw, 92vw";
const narrow = "(min-width: 64rem) 32vw, (min-width: 48rem) 36vw, 92vw";
const layout = [
  { cell: "md:col-span-5 lg:col-span-7", aspect: "aspect-[4/3]", sizes: wide },
  { cell: "md:col-span-3 lg:col-span-4 lg:col-start-9 lg:mt-28", aspect: "aspect-[4/5]", sizes: narrow },
  { cell: "md:col-span-3 lg:col-span-4 lg:col-start-2 lg:-mt-10", aspect: "aspect-[4/5]", sizes: narrow },
  { cell: "md:col-span-5 lg:col-span-6 lg:col-start-7 lg:mt-16", aspect: "aspect-[3/2]", sizes: wide },
];

export function LifeAtCph() {
  return (
    <section aria-labelledby="life-title" className="bg-linen py-section text-ink">
      <Container>
        <SectionHeader id="life-title" eyebrow={content.eyebrow} lines={content.heading} emphasis={content.emphasis} />
        <Reveal amount={0.1} stagger={0.1} className="grid-site gap-y-10 md:gap-y-14">
          {content.images.map((image, i) => (
            <RevealItem key={image.alt} className={cn("col-span-full", layout[i]?.cell)}>
              <figure>
                <div className={cn("relative overflow-hidden bg-paper", layout[i]?.aspect ?? "aspect-[4/3]")}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    placeholder="blur"
                    sizes={layout[i]?.sizes ?? "92vw"}
                    className="object-cover [filter:contrast(1.02)_saturate(0.94)]"
                    style={{ objectPosition: image.focus }}
                  />
                </div>
                {image.caption && <figcaption className="mt-4 eyebrow text-stone">{image.caption}</figcaption>}
              </figure>
            </RevealItem>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
