/**
 * The one source for the group's contact details. The footer, menu, contact,
 * careers and development pages all read from here — never hard-code an
 * address elsewhere.
 *
 * Only details published on centrepointhospitality.in (or the group's careers
 * portal) are filled in. Anything unconfirmed is `null` with a TODO and is
 * never rendered; enquiries of that type fall back to the general address.
 */

export const enquiryTypes = ["general", "development", "careers", "media"] as const;
export type EnquiryType = (typeof enquiryTypes)[number];

export function isEnquiryType(value: unknown): value is EnquiryType {
  return typeof value === "string" && (enquiryTypes as readonly string[]).includes(value);
}

// General enquiries — the address displayed on the current site. (A second
// link there reads "info.nagour@", a typo, and is deliberately not used.)
const generalEmail = "info.nagpur@cpgh.in";

type Channel = {
  label: string;
  /** Confirmed address for this enquiry type, or null until the client confirms one. */
  email: string | null;
  /** A page that handles this enquiry type better than email, if there is one. */
  route?: { label: string; href: string; external?: boolean };
};

const channels: Record<EnquiryType, Channel> = {
  general: { label: "General enquiries", email: generalEmail },
  development: {
    label: "Development & Partnerships",
    email: null, // TODO: Confirm a dedicated development address.
    route: { label: "Development enquiry form", href: "/development#enquiry" },
  },
  careers: {
    label: "Careers",
    email: null, // TODO: Confirm an HR / careers address.
    route: { label: "Careers at CPH", href: "https://careers.centrepointgroup.in/", external: true },
  },
  media: {
    label: "Media / Press",
    email: null, // TODO: Confirm a press address and media contact.
  },
};

export const contact = {
  email: generalEmail,
  phone: { display: "+91 92669 23456", href: "tel:+919266923456" },
  /** As published under "General queries" on the current site. */
  address: {
    lines: ["24, Central Bazar Road", "Ramdaspeth, Nagpur", "Maharashtra 440010"],
    // Coordinates from the Google Maps link on the current site.
    directions: "https://www.google.com/maps/search/?api=1&query=21.1347835%2C79.0762728",
  },
  channels,
  /** Group-level locations only. Addresses as published on each hotel's official website. */
  locations: [
    {
      city: "Nagpur",
      note: "Where the group began.",
      website: "https://centrepointnagpur.com/",
      address: ["24, Central Bazar Road", "Ramdaspeth, Nagpur", "Maharashtra 440010"],
      directions: "https://www.google.com/maps/search/?api=1&query=21.1347835%2C79.0762728",
    },
    {
      city: "Navi Mumbai",
      note: "Centre Point Navi Mumbai.",
      website: "https://www.centrepointnavimumbai.com/",
      address: [
        "Building No. 1, DC-1, Thane–Belapur Road",
        "Beside Akshar Blue Chip IT Park, TTC Industrial Area, Turbhe",
        "Navi Mumbai, Maharashtra 400705",
      ],
      directions: "https://www.google.com/maps/search/?api=1&query=Centre+Point+Navi+Mumbai%2C+Building+No.+1%2C+DC-1%2C+Thane-Belapur+Road%2C+Turbhe%2C+Navi+Mumbai%2C+Maharashtra+400705",
    },
    {
      city: "Amravati",
      note: "Centre Point Amravati.",
      website: "https://www.centrepointamravati.com/",
      address: [
        "Near Chatri Talav",
        "Dastur Nagar, Amravati",
        "Maharashtra 444606",
      ],
      directions: "https://www.google.com/maps/search/?api=1&query=Centre+Point+Amravati%2C+Near+Chatri+Talav%2C+Dastur+Nagar%2C+Amravati%2C+Maharashtra+444606",
    },
  ],
};

/** The address an enquiry of this type should reach — the general inbox until a dedicated one is confirmed. */
export function emailFor(type: EnquiryType) {
  return contact.channels[type].email ?? contact.email;
}
