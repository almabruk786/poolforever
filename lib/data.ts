import { CalendarDays, Droplets, Gem, Hammer, Hotel, ShieldCheck, Sparkles, Waves } from "lucide-react";

export const contact = {
  phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+880 1XXX XXXXXX",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "8801XXXXXXXXX",
  facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://facebook.com/poolforever",
  email: "hello@poolforever.com",
  address: "Address placeholder, Dhaka, Bangladesh",
  mapEmbed: "https://www.google.com/maps?q=Dhaka%20Bangladesh&output=embed"
};

export const heroSlides = [
  {
    title: "Build Your Dream Pool With Pool Forever",
    image: "/gallery/hero-pool.svg",
    eyebrow: "Luxury Pool Design and Construction"
  },
  {
    title: "Resort Grade Water Experiences For Private Homes",
    image: "/gallery/resort.svg",
    eyebrow: "Concept, Build, Automation, Care"
  },
  {
    title: "Cinematic Pools Engineered To Last",
    image: "/gallery/indoor.svg",
    eyebrow: "International Finish, Local Expertise"
  }
];

export const categories = [
  "Rooftop Pools",
  "Indoor Pools",
  "Kids Pools",
  "Luxury Pools",
  "Resort Pools",
  "Jacuzzi",
  "Fountain Design"
];

export const projects = [
  {
    id: "skyline-rooftop",
    title: "Skyline Rooftop Pool",
    category: "Rooftop Pools",
    location: "Urban Residence",
    image: "/gallery/rooftop.svg",
    video: "https://player.vimeo.com/video/76979871",
    description: "A compact rooftop pool with infinity-edge detailing, evening lighting, and discreet filtration."
  },
  {
    id: "resort-lagoon",
    title: "Resort Lagoon Pool",
    category: "Resort Pools",
    location: "Boutique Resort",
    image: "/gallery/resort.svg",
    description: "A destination-style pool planned around guest flow, shade, landscaping, and sunset atmosphere."
  },
  {
    id: "private-spa",
    title: "Private Spa Jacuzzi",
    category: "Jacuzzi",
    location: "Luxury Villa",
    image: "/gallery/jacuzzi.svg",
    description: "A hydrotherapy zone with heated jets, stone finishes, and a quiet glass-edge mood."
  },
  {
    id: "indoor-azure",
    title: "Indoor Azure Pool",
    category: "Indoor Pools",
    location: "Wellness House",
    image: "/gallery/indoor.svg",
    description: "An indoor pool with humidity planning, reflective lighting, and day-to-night comfort."
  },
  {
    id: "family-splash",
    title: "Family Splash Zone",
    category: "Kids Pools",
    location: "Family Residence",
    image: "/gallery/kids.svg",
    description: "A safe shallow-water experience designed for play, supervision, and long weekend use."
  },
  {
    id: "courtyard-fountain",
    title: "Courtyard Fountain",
    category: "Fountain Design",
    location: "Signature Entrance",
    image: "/gallery/fountain.svg",
    description: "A sculptural water feature with soft movement, architectural balance, and evening glow."
  }
];

export const services = [
  { icon: Sparkles, title: "Pool Design", text: "Concept, 3D mood, material planning, lighting, and flow for high-end residential and commercial pools." },
  { icon: Hammer, title: "Construction", text: "Civil work, waterproofing, plumbing, filtration, finishes, and handover managed with tight quality control." },
  { icon: Waves, title: "Renovation", text: "Modernize old pools with new tiles, lighting, automation, waterline upgrades, and refined edges." },
  { icon: Droplets, title: "Water Features", text: "Fountains, waterfalls, jets, spa zones, and sensory water moments for memorable spaces." },
  { icon: ShieldCheck, title: "Maintenance", text: "Planned care, water balancing, pump servicing, cleaning, and lifecycle support." },
  { icon: CalendarDays, title: "Consultation", text: "Site visit, budget guidance, feasibility planning, and booking support for fast lead conversion." }
];

export const testimonials = [
  { name: "Private Villa Owner", role: "Luxury Pool Client", quote: "Pool Forever turned a simple backyard idea into a resort feeling. The finish, lights, and water sound are exactly what we wanted." },
  { name: "Boutique Resort Director", role: "Commercial Client", quote: "The team understood guest experience, not only construction. Our pool became the most photographed area of the property." },
  { name: "Rooftop Property Developer", role: "Developer", quote: "Clean communication, premium detailing, and a smooth handover. The rooftop pool made the project feel far more valuable." }
];

export const stats = [
  { value: 120, suffix: "+", label: "Pools Designed" },
  { value: 8, suffix: "+", label: "Years Experience" },
  { value: 35, suffix: "+", label: "Resort Projects" },
  { value: 24, suffix: "/7", label: "Care Support" }
];

export const adminCards = [
  { title: "Projects", value: "26", icon: Hotel, detail: "Live portfolio items" },
  { title: "Leads", value: "148", icon: Gem, detail: "Consultation requests" },
  { title: "Bookings", value: "12", icon: CalendarDays, detail: "Awaiting confirmation" },
  { title: "Gallery", value: "84", icon: Waves, detail: "Images and videos" }
];
