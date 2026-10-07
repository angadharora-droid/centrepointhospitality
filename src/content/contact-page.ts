import { contact, type EnquiryType } from "./contact";
import { application, experienceLevels, areasOfInterest } from "./careers";
import { enquiry as development } from "./development";
import { site } from "./site";

/** Contact page copy. Addresses and numbers come from contact.ts only. */

export const contactHero = {
  eyebrow: "Contact",
  heading: ["Let’s start", "a conversation."],
  emphasis: "conversation",
  intro:
    "Whether you’re exploring a partnership, career opportunity or simply want to reach the group, choose the enquiry type below.",
};

type TypeCopy = {
  /** Tab label. */
  label: string;
  /** One line under the tabs once this type is chosen. */
  note: string;
  links?: Array<{ label: string; href: string; external?: boolean }>;
  success: { title: string; text: string };
  subject: string;
};

export const enquiryCopy: Record<EnquiryType, TypeCopy> = {
  general: {
    label: "General",
    note: "Questions for the group, feedback, or anything else.",
    success: { title: "Thank you.", text: "Our team will read your message and respond." },
    subject: "General enquiry",
  },
  development: {
    label: "Development",
    note: "Hotels, restaurants and mixed-use projects.",
    links: [{ label: "Prefer the full project brief?", href: "/development#enquiry" }],
    success: development.success,
    subject: "Development enquiry",
  },
  careers: {
    label: "Careers",
    note: "Roles across the group’s hotels, restaurants and central teams.",
    links: [{ label: "View careers and current openings", href: site.careersUrl, external: true }],
    success: application.success,
    subject: "Careers enquiry",
  },
  media: {
    label: "Media / Press",
    note: "Press, interviews and media requests.",
    success: { title: "Thank you.", text: "Our team will review your request and respond." },
    subject: "Media enquiry",
  },
};

export const formOptions = {
  projectTypes: development.projectTypes,
  projectStatuses: development.projectStatuses,
  areasOfInterest,
  experienceLevels,
};

/** The corporate contact list beside the form — verified routes only. */
export const directory = {
  title: "Contact details",
  // Channels without a confirmed address show their page instead (or nothing extra).
  channels: (Object.keys(contact.channels) as EnquiryType[]).map((type) => ({ type, ...contact.channels[type] })),
  phone: contact.phone,
};

export const locations = {
  eyebrow: "Locations",
  heading: ["Where you’ll", "find us."],
  emphasis: "find",
  items: contact.locations.map((location) => ({
    ...location,
  })),
};

export const contactMeta = {
  title: "Contact",
  description:
    "Contact Centre Point Hospitality for general enquiries, development and partnerships, careers, and media and press.",
};
