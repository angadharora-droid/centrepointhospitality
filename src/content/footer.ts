import { contactNav, primaryNav, type NavItem } from "./navigation";
import { contact } from "./contact";

/**
 * Global footer content. Contact details are the ones published on
 * centrepointhospitality.in; anything not yet confirmed is kept out of the
 * rendered footer and listed under `pending`.
 */

type FooterGroup = { id: string; title: string; links: NavItem[] };

const explore: FooterGroup = {
  id: "explore",
  title: "Explore",
  // Menu captions are for the full-screen menu only.
  links: primaryNav.map((item) => ({ label: item.label, href: item.href, external: item.external })),
};

const connect: FooterGroup = {
  id: "connect",
  title: "Connect",
  links: [
    contactNav,
    { label: contact.email, href: `mailto:${contact.email}`, note: contact.channels.general.label },
    { label: contact.phone.display, href: contact.phone.href, note: "Phone" },
    { label: "Development enquiries", href: "/development#enquiry" },
  ],
};

// Official group and brand accounts published by their respective websites.
const follow: FooterGroup = {
  id: "follow",
  title: "Follow the group",
  links: [
    { label: "Centre Point Hospitality", href: "https://www.instagram.com/centrepointhospitality/?hl=en", note: "Instagram", external: true },
    { label: "Centre Point Hospitality", href: "https://in.linkedin.com/company/centre-point-group-of-hotels", note: "LinkedIn", external: true },
    // The page names itself "Centre Point Hospitality" (handle: centrepointhotelsandresorts).
    { label: "Centre Point Hospitality", href: "https://www.facebook.com/centrepointhotelsandresorts/", note: "Facebook", external: true },
    { label: "Pablo", href: "https://www.instagram.com/pablonagpur/", note: "Instagram", external: true },
    { label: "Dali", href: "https://www.instagram.com/dali_theartcafe/", note: "Instagram", external: true },
    { label: "High Steaks", href: "https://www.instagram.com/highsteaksnagpur/", note: "Instagram", external: true },
    { label: "Micky’s", href: "https://www.instagram.com/mickys.ki.zimmedari", note: "Instagram", external: true },
  ],
};

export const footer = {
  statement: ["Creating places", "people remember."],
  emphasis: "remember",
  cta: { label: "Get in touch", href: contactNav.href },
  groups: [explore, connect, follow],
  locations: {
    title: "Locations",
    items: contact.locations.map(({ city, address, website }) => ({
      city,
      detail: address?.join(", "),
      href: website,
    })),
  },
  taxonomy: ["Hotels", "Restaurants", "Food", "Experiences"],
  // TODO: Add Privacy Policy and Terms links once the policy text is supplied
  // (the enquiry forms collect personal data, so a privacy policy is needed before launch).
  legal: [] as NavItem[],
};
