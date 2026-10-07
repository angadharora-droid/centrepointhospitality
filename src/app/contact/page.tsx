import type { Metadata } from "next";
import { ContactEnquiry } from "@/components/contact/ContactEnquiry";
import { ContactHero } from "@/components/contact/ContactHero";
import { Locations } from "@/components/contact/Locations";
import { isEnquiryType } from "@/content/contact";
import { contactMeta } from "@/content/contact-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ ...contactMeta, path: "/contact" });

/**
 * Contact — one form for every enquiry type. Reading ?type= on the server
 * (development | careers | media | general) renders the right tab in the
 * first HTML, so there's no flash of the wrong one.
 */
type ContactPageProps = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { type } = await searchParams;
  return (
    <>
      <ContactHero />
      <ContactEnquiry initialType={isEnquiryType(type) ? type : "general"} />
      <Locations />
    </>
  );
}
