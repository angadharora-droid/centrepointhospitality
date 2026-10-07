import hotelRoom from "@/assets/hero/hotel-room.jpg";
import restaurantMural from "@/assets/hero/restaurant-mural.jpg";
import daliGuests from "@/assets/portfolio/dali-guests.jpg";
import placeholderHighSteaks from "@/assets/portfolio/placeholders/placeholder-high-steaks.jpg";
import mickysProducts from "@/assets/portfolio/mickys-products.jpg";
import mickysLogo from "@/assets/portfolio/mickys-logo.png";
import centrePointNaviMumbaiLogo from "@/assets/portfolio/centre-point-navi-mumbai-logo-card.png";
import centrePointAmravatiFacade from "@/assets/portfolio/centre-point-amravati-facade.webp";
import freakkDeBistro from "@/assets/portfolio/freakk-de-bistro.webp";
import puroSoulBottle from "@/assets/portfolio/puro-soul-bottle.jpeg";
import type { Brand } from "./types";

/**
 * Brand registry. Facts are taken from centrepointhospitality.in (brand grid,
 * timeline, leadership bios) and purosoul.in — nothing here is invented.
 * Locations are only set where confirmed. Placeholder plates (logo on linen)
 * stand in until each brand's photography is supplied.
 */
export const brands = [
  {
    slug: "hotel-centre-point-nagpur",
    name: "Hotel Centre Point",
    category: "stay",
    type: "Hotel",
    location: "Nagpur",
    summary: "Where the group began in 1988 — home to Palacio, a 10,000 sq ft pillarless hall.",
    image: {
      src: hotelRoom,
      alt: "A guest room with a timber-panelled wall and a rose upholstered bed.",
      focus: "62% 55%",
      // Temporary: room photograph from the current site; property not confirmed.
      placeholder: true,
    },
    links: [{ label: "Official website", href: "https://centrepointnagpur.com/" }],
  },
  {
    slug: "pablo",
    name: "Pablo",
    category: "dine",
    type: "Art café & lounge",
    location: "Civil Lines, Nagpur",
    summary: "Nagpur's first art café lounge, where art, food and nightlife share one room.",
    image: {
      src: restaurantMural,
      alt: "Pablo's dining room beneath a large pencil mural of figures seated on steps.",
      focus: "50% 45%",
    },
    links: [
      { label: "Instagram", href: "https://www.instagram.com/pablonagpur/" },
      { label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=240%2FA%2C+E+High+Ct+Rd%2C+Civil+Lines%2C+Nagpur%2C+Maharashtra+440001" },
      { label: "View on Zomato", href: "https://www.zomato.com/nagpur/pablo-the-art-cafe-lounge-civil-lines" },
      { label: "View on Swiggy", href: "https://www.swiggy.com/city/nagpur/pablo-the-art-cafe-lounge-civil-lines-rest118685" },
      { label: "View on MakeMyTrip", href: "https://www.makemytrip.com/tripideas/attractions/pablo---the-art-cafe'-lounge" },
      { label: "View on Tripadvisor", href: "https://www.tripadvisor.in/Restaurant_Review-g662323-d14055664-Reviews-Pablo_The_Art_Cafe_Lounge-Nagpur_Nagpur_District_Maharashtra.html" },
      { label: "Reserve a table", href: "https://www.google.com/maps/reserve/v/dine/c/aHVKPcUSaEM?source=pa&opi=89978449&hl=en-IN" },
      { label: "View on District", href: "https://www.district.in/dining/nagpur/pablo-the-art-cafe-lounge-civil-lines" },
    ],
  },
  {
    slug: "centre-point-navi-mumbai",
    name: "Centre Point Navi Mumbai",
    category: "stay",
    type: "Hotel",
    location: "Navi Mumbai",
    summary: "Opened in 2019, carrying Centre Point hospitality to Navi Mumbai.",
    image: {
      src: centrePointNaviMumbaiLogo,
      alt: "Centre Point Navi Mumbai logo.",
      focus: "50% 50%",
    },
    links: [{ label: "Official website", href: "https://www.centrepointnavimumbai.com/" }],
  },
  {
    slug: "centre-point-amravati",
    name: "Centre Point Amravati",
    category: "stay",
    type: "Hotel",
    location: "Amravati",
    summary: "Opened in 2026, bringing Centre Point’s signature hospitality, rooms, dining and event spaces to Amravati.",
    image: {
      src: centrePointAmravatiFacade,
      alt: "The exterior of Centre Point Amravati at dusk.",
      focus: "50% 48%",
    },
    links: [{ label: "Official website", href: "https://www.centrepointamravati.com/" }],
  },
  {
    slug: "dali",
    name: "Dali",
    category: "dine",
    type: "The Art Café",
    location: "Wardha Road, Nagpur",
    summary: "An art-themed café opened in 2022 — the next chapter after Pablo.",
    image: {
      src: daliGuests,
      alt: "Guests sharing a table at Dali, with portrait artworks on the red wall behind.",
      focus: "55% 50%",
    },
    links: [
      { label: "Instagram", href: "https://www.instagram.com/dali_theartcafe/" },
      { label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=Enrico+Heights%2C+Wardha+Rd%2C+Jai+Prakash+Nagar%2C+Chatrapati+Nagar%2C+Nagpur%2C+Maharashtra+440015" },
      { label: "View on Zomato", href: "https://www.zomato.com/nagpur/dali-the-art-cafe-1-wardha-road" },
      { label: "Order on Swiggy", href: "https://www.swiggy.com/city/nagpur/dali-the-art-cafe-wardha-road-rest935064" },
      { label: "View on Swiggy Dineout", href: "https://www.swiggy.com/restaurants/nagpur/wardha-road/dali-the-art-cafe-605020/dineout" },
      { label: "View on District", href: "https://www.district.in/dining/nagpur/dali-the-art-cafe-1-wardha-road" },
      { label: "Reserve a table", href: "https://www.google.com/maps/reserve/v/dine/c/Z6cnRxqgpBg?source=pa&opi=89978449&hl=en-IN" },
    ],
  },
  {
    slug: "high-steaks",
    name: "High Steaks",
    category: "dine",
    type: "Poolside restaurant",
    location: "Ramdaspeth, Nagpur",
    summary: "Poolside dining in Nagpur, under an open sky.",
    image: {
      src: placeholderHighSteaks,
      alt: "High Steaks Pool Side logo — photography to follow.",
      placeholder: true,
    },
    links: [
      { label: "Instagram", href: "https://www.instagram.com/highsteaksnagpur/" },
      { label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=High+Steaks%2C+7th+Floor%2C+Hotel+Centre+Point%2C+24+Central+Bazar+Road%2C+Ramdaspeth%2C+Nagpur%2C+Maharashtra+440010" },
      { label: "View on Zomato", href: "https://www.zomato.com/nagpur/high-steaks-pool-side-ramdaspeth" },
      { label: "View on Swiggy Dineout", href: "https://www.swiggy.com/restaurants/nagpur/ramdaspeth/high-steak-hotel-centre-point-603580/dineout" },
      { label: "View on District", href: "https://www.district.in/dining/nagpur/high-steaks-pool-side-ramdaspeth" },
      { label: "Reserve a table", href: "https://www.google.com/maps/reserve/v/dine/c/TOtM8ekng-s?source=pa&opi=89978449&hl=en-IN" },
    ],
  },
  {
    slug: "freakk-de-bistro",
    name: "Freakk De Bistro",
    category: "dine",
    type: "Bistro",
    location: "Ramdaspeth, Nagpur",
    summary: "An all-day bistro at Hotel Centre Point serving Continental favourites, fast food, beverages and bakery treats.",
    image: {
      src: freakkDeBistro,
      alt: "A dining table set inside Freakk De Bistro at Hotel Centre Point, Nagpur.",
      focus: "50% 52%",
    },
    links: [
      { label: "Official page", href: "https://centrepointnagpur.com/freakk-de-bistro/" },
      { label: "Directions", href: "https://www.google.com/maps/search/?api=1&query=Freakk+De+Bistro%2C+Hotel+Centre+Point%2C+24+Central+Bazar+Road%2C+Ramdaspeth%2C+Nagpur%2C+Maharashtra+440010" },
      { label: "View on Zomato", href: "https://www.zomato.com/nagpur/freakk-de-bistro-ramdaspeth" },
      { label: "View on Swiggy Dineout", href: "https://www.swiggy.com/restaurants/freakk-de-bistro-hotel-centre-point-ramdaspeth-nagpur-162612/dineout" },
      { label: "View on District", href: "https://www.district.in/dining/nagpur/freakk-de-bistro-ramdaspeth" },
    ],
  },
  {
    slug: "mickys",
    name: "Micky’s",
    category: "create",
    type: "Convenient cooking · By CP Foods",
    location: "Nagpur",
    summary: "Chef-ready gravies, pastes and sauces that handle the preparation while leaving the final dish in the cook’s hands — open, heat and finish.",
    image: {
      src: mickysProducts,
      alt: "Micky’s by CP Food logo beside packs of makhani sauce, ginger garlic paste and boiled kala chana.",
      focus: "52% 50%",
      fit: "contain",
      background: "#7f0d14",
    },
    logo: {
      src: mickysLogo,
      alt: "Micky’s by CP Food.",
    },
    links: [
      { label: "Official website", href: "https://mickys.in/" },
      { label: "Instagram", href: "https://www.instagram.com/mickys.ki.zimmedari" },
    ],
  },
  {
    slug: "puro-soul",
    name: "Puro Soul",
    category: "create",
    type: "Bottled water",
    location: "Kalmeshwar, Nagpur",
    summary: "Pure, safe and mineral-enriched bottled water crafted for balance and responsible hydration, produced at Chinchbhuwan in Kalmeshwar near Nagpur.",
    image: {
      src: puroSoulBottle,
      alt: "A bottle of Puro Soul mineral-enriched water in front of the bottling line.",
      focus: "50% 48%",
    },
    links: [{ label: "Website", href: "https://purosoul.in/" }],
  },
] satisfies Brand[];

export type BrandSlug = (typeof brands)[number]["slug"];

export const getBrand = (slug: BrandSlug): Brand => brands.find((b) => b.slug === slug)!;
