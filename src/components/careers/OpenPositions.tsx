import { Container } from "@/components/layout/Container";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { careerPaths, jobs, openings as content } from "@/content/careers";

const departmentTitle = (slug: string) => careerPaths.find((path) => path.slug === slug)?.title ?? slug;

/**
 * Lists `jobs` when there are any. Until real openings are supplied it shows
 * an honest empty state — never sample roles.
 */
export function OpenPositions() {
  return (
    <section id={content.id} aria-labelledby="openings-title" className="bg-paper pb-section text-ink">
      <Container className="grid-site gap-y-10 pt-section">
        <Reveal className="col-span-full lg:col-span-5">
          <RevealItem variant="fade">
            <p className="eyebrow text-stone">{content.eyebrow}</p>
          </RevealItem>
          <h2 id="openings-title" className="mt-8 font-display text-[clamp(2.25rem,1.2rem+3vw,4rem)] leading-[1.02] tracking-[-0.015em]">
            {content.heading}
          </h2>
        </Reveal>

        <Reveal className="col-span-full lg:col-span-6 lg:col-start-7 lg:pt-2">
          {jobs.length > 0 ? (
            <ul className="border-t border-line">
              {jobs.map((job) => (
                <RevealItem as="li" key={job.slug} className="flex flex-col gap-4 border-b border-line py-7 md:flex-row md:items-end md:justify-between">
                  <div>
                    <h3 className="font-display text-title">{job.title}</h3>
                    <p className="mt-2 eyebrow text-stone">
                      {[departmentTitle(job.department), job.location, job.employmentType].join(" · ")}
                    </p>
                  </div>
                  <ArrowLink href={job.applyUrl ?? "#apply"} external={Boolean(job.applyUrl)} className="shrink-0">
                    Apply<span className="sr-only"> for {job.title}</span>
                  </ArrowLink>
                </RevealItem>
              ))}
            </ul>
          ) : (
            <RevealItem className="border-t border-line pt-8">
              <p className="max-w-[30rem] text-lede">{content.empty}</p>
              <ButtonLink href={content.cta.href} className="mt-10">
                {content.cta.label}
              </ButtonLink>
              <p className="mt-12 max-w-[30rem] text-small text-stone">{content.portal.text}</p>
              <ArrowLink href={content.portal.href} external className="mt-4">
                {content.portal.label}
              </ArrowLink>
            </RevealItem>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
