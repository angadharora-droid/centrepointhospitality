import { contact } from "@/content/contact";
import { site } from "@/content/site";

/**
 * Organization structured data — verified fields only (name, site, logo, and
 * the contact details published on centrepointhospitality.in). `sameAs` is
 * left out until the group's own social profiles are confirmed; the brand
 * Instagram accounts belong to the brands, not the group.
 */
const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  logo: `${site.url}/brand/cph-logo-stacked-dark.png`,
  email: contact.email,
  telephone: contact.phone.href.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: contact.address.lines[0],
    addressLocality: "Nagpur",
    addressRegion: "Maharashtra",
    postalCode: "440010",
    addressCountry: "IN",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: contact.email,
      telephone: contact.phone.href.replace("tel:", ""),
      areaServed: "IN",
    },
  ],
};

export function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output from static data; "<" is escaped so it can't close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, "\\u003c") }}
    />
  );
}
