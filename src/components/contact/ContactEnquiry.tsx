import { Container } from "@/components/layout/Container";
import { ArrowLink } from "@/components/ui/ArrowLink";
import type { EnquiryType } from "@/content/contact";
import { directory } from "@/content/contact-page";
import { ContactForm } from "./ContactForm";

/** The form, with the group's verified contact routes alongside it. */
export function ContactEnquiry({ initialType }: { initialType: EnquiryType }) {
  return (
    <section aria-labelledby="enquiry-form-title" className="bg-paper pb-section text-ink">
      <Container className="grid-site gap-y-16 border-t border-line pt-[clamp(3rem,5vw,5rem)]">
        <div className="col-span-full lg:col-span-7">
          <h2 id="enquiry-form-title" className="sr-only">
            Send an enquiry
          </h2>
          <ContactForm initialType={initialType} />
        </div>

        <aside aria-labelledby="directory-title" className="col-span-full lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <h2 id="directory-title" className="eyebrow text-stone">
              {directory.title}
            </h2>
            <dl className="mt-5 border-t border-line">
              {directory.channels.map((channel) => (
                <div key={channel.type} className="border-b border-line py-6">
                  <dt className="font-display text-title">{channel.label}</dt>
                  <dd className="mt-3 flex flex-col items-start gap-2 text-stone">
                    {channel.email ? (
                      <>
                        <a href={`mailto:${channel.email}`} className="link-underline text-ink">
                          {channel.email}
                        </a>
                        {channel.type === "general" && (
                          <a href={directory.phone.href} className="link-underline text-ink">
                            {directory.phone.display}
                          </a>
                        )}
                      </>
                    ) : channel.route ? (
                      <ArrowLink href={channel.route.href} external={channel.route.external} className="mt-1">
                        {channel.route.label}
                      </ArrowLink>
                    ) : (
                      <span>Choose “Media / Press” in the form.</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </Container>
    </section>
  );
}
