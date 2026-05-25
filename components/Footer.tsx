import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { SiteContent } from "@/types/cms";
import { Logo } from "./Logo";

const links = ["About", "Services", "Projects", "Gallery", "Testimonials", "Contact", "Booking"];

export function Footer({ contact }: { contact: Pick<SiteContent, "phone" | "email" | "address" | "facebook" | "mapEmbed"> }) {
  return (
    <footer className="border-t border-white/10 bg-abyss px-4 py-12">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.2fr_.8fr_1fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm leading-7 text-white/58">Luxury pool design, construction, renovation, Jacuzzi, fountains, and ongoing care for premium properties.</p>
        </div>
        <div>
          <h3 className="font-semibold text-white">Quick Links</h3>
          <div className="mt-4 grid gap-2 text-white/58">
            {links.map((link) => <Link key={link} href={`/${link.toLowerCase()}`} className="hover:text-aqua">{link}</Link>)}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-white">Contact</h3>
          <div className="mt-4 grid gap-3 text-white/58">
            <p className="flex gap-3"><Phone className="text-aqua" size={18} /> {contact.phone}</p>
            <p className="flex gap-3"><Mail className="text-aqua" size={18} /> {contact.email}</p>
            <p className="flex gap-3"><MapPin className="text-aqua" size={18} /> {contact.address}</p>
            <a className="flex gap-3 hover:text-aqua" href={contact.facebook}><Facebook className="text-aqua" size={18} /> Facebook Page</a>
          </div>
        </div>
        <div className="overflow-hidden rounded-[2rem] border border-white/10">
          <iframe title="Google map placeholder" src={contact.mapEmbed} className="h-64 w-full border-0" loading="lazy" />
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/45">
        Copyright {new Date().getFullYear()} POOL FOREVER. All rights reserved.
      </div>
    </footer>
  );
}
