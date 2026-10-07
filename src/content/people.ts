import amitKandwal from "@/assets/leadership/amit-kandwal.jpg";
import angadhSinghArora from "@/assets/leadership/angadh-singh-arora.jpg";
import arjunSinghArora from "@/assets/leadership/arjun-singh-arora.jpg";
import mickyArora from "@/assets/leadership/micky-arora.jpg";
import type { Person } from "./types";

/**
 * Leadership, in the order and with the roles shown on centrepointhospitality.in
 * ("Our people"). Biographies are edited from that source for length and
 * rhythm only — no achievements have been added.
 */
export const leadership: Person[] = [
  {
    slug: "micky-arora",
    name: "Jasbir Singh Arora",
    role: "Managing Director · Businessman & Founder",
    bio: [
      "Jasbir Singh Arora is a self-made businessman and visionary Founder whose journey reflects courage, resilience, and transformational leadership. Born and brought up in Nagpur, he has played a defining role in shaping the city’s modern hospitality landscape.",
      "A Commerce & Finance graduate from Hislop College, Nagpur, Mr. Arora began his business journey at a very young age. From building trading ventures to securing competitive automobile agencies and pioneering innovative workshop services, his early years were driven by relentless effort and sharp business insight. He personally trained, traveled extensively, and built operations from the ground up — laying a powerful foundation for long-term success.",
      "In 1988, as Founder, he launched Hotel Centre Point, Nagpur’s first centrally air-conditioned hotel, starting with 45 rooms. What was considered a bold risk soon became a landmark success story. Under his leadership, the property expanded steadily — adding banquet halls, restaurants, and growing to 136 rooms today. Over the years, he established and expanded many businesses, providing a great platform for the generations to come.",
      "Beyond hospitality, Mr. Arora diversified into real estate development, military engineering contracts, fisheries, and experiential entertainment through Bollywood Centre Point — bringing innovation and large-scale vision to every sector he entered.",
      "As a Founder and business leader, he is known for taking bold yet calculated risks, building businesses from scratch, transforming setbacks into long-term opportunities, and combining traditional values with modern expansion strategies.",
      "His philosophy is rooted in commitment, faith, hard work, and belief in one’s vision — principles that continue to guide the Centre Point Group’s growth.",
      "In addition to business excellence, he remains deeply committed to community service. As Trustee of Ramdaspeth Gurudwara and Founder of Gurudwara Bandol, he has supported education and welfare initiatives for underprivileged children. During the lockdown, he provided humanitarian support to frontline workers through accommodation and meals for several months.",
      "Today, Jasbir Singh Arora stands as a respected Founder and business leader whose legacy is built on vision, perseverance, and purpose.",
    ],
    highlights: [
      { label: "Education", value: "Commerce & Finance, Hislop College, Nagpur" },
      { label: "Hotel Centre Point", value: "Founded in 1988" },
      { label: "Leadership", value: "Centre Point Group" },
    ],
    belief: "Commitment, faith, hard work, and belief in one’s vision.",
    portrait: {
      src: mickyArora,
      alt: "Micky Arora, in a light blue shirt, leaning on a timber counter in the office.",
      focus: "78% 30%",
    },
  },
  {
    slug: "angadh-singh-arora",
    name: "Angadh Singh Arora",
    role: "Chief Executive Officer",
    bio: [
      "Angadh Singh Arora is CEO of Centre Point Hospitality and has spent more than 17 years in the hospitality industry. A Foreign Trade graduate of MIT Pune, he pairs strategic thinking with operational depth.",
      "He helped reshape Nagpur’s food and beverage scene, launching art cafés and lounges in 2017–18. Since becoming CEO in 2022, he has led consistent double-digit profit growth, with a people-first approach that puts empathy and sustainability alongside strategy and analytics.",
      "Away from work, he is a cricket enthusiast and a keen traveller.",
    ],
    highlights: [
      { label: "Experience", value: "17+ years in hospitality" },
      { label: "Education", value: "Foreign Trade, MIT Pune" },
      { label: "CEO since", value: "2022" },
    ],
    belief: "Change is the only constant.",
    portrait: {
      src: angadhSinghArora,
      alt: "Angadh Singh Arora, seated at his desk in a checked shirt, smiling.",
      focus: "50% 30%",
    },
  },
  {
    slug: "arjun-singh-arora",
    name: "Arjun Singh Arora",
    role: "President",
    bio: [
      "Arjun Singh Arora is a hotelier shaping hospitality in Central India. A graduate of Ecole Hôtelière Lavasa, he brings international experience from Marriott, Accor and Meliá Dubai.",
      "He spearheaded Pablo, Nagpur’s first art café lounge, followed by boutique hotels and food and beverage ventures across Navi Mumbai. Under his leadership the group has added concepts such as DD Bistro and Dali Art Café, and retail brands including Puro Soul and Micky’s.",
      "He holds a GMP from Cornell and brings a close eye for quality to every project.",
    ],
    highlights: [
      { label: "Education", value: "Ecole Hôtelière Lavasa · GMP, Cornell" },
      { label: "Experience", value: "Marriott, Accor, Meliá Dubai" },
    ],
    portrait: {
      // Note: the only supplied photograph is a wide office shot; a closer portrait is needed.
      src: arjunSinghArora,
      alt: "Arjun Singh Arora, in a navy suit, standing beside his desk in front of maroon window blinds.",
      focus: "41% 45%",
    },
  },
  {
    slug: "amit-kandwal",
    name: "Amit Kandwal",
    role: "General Manager",
    bio: [
      "Amit Kandwal brings more than 25 years of leadership in luxury hospitality, with a focus on guest experience, profitability and team culture.",
      "He led Hotel Centre Point to five-star status and delivered record food and beverage results at Fairmont Jaipur. An MDI alumnus and certified trainer, he combines strategic vision with hands-on leadership.",
    ],
    highlights: [
      { label: "Experience", value: "25+ years in luxury hospitality" },
      { label: "Education", value: "MDI · Certified trainer" },
    ],
    portrait: {
      src: amitKandwal,
      alt: "Amit Kandwal, in a dark suit and tie, seated on a sofa and smiling.",
      focus: "50% 30%",
    },
  },
];
