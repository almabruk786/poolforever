"use client";

import { Facebook, MessageCircle, Phone } from "lucide-react";
import type { SiteContent } from "@/types/cms";

export function FloatingContact({ contact }: { contact: Pick<SiteContent, "whatsapp" | "facebook" | "phone"> }) {
  const buttons = [
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${contact.whatsapp}` },
    { label: "Facebook", icon: Facebook, href: contact.facebook },
    { label: "Call Now", icon: Phone, href: `tel:${contact.phone}` }
  ];

  return (
    <div className="fixed right-3 top-1/2 z-40 flex -translate-y-1/2 flex-col gap-3 sm:right-5">
      {buttons.map(({ label, icon: Icon, href }) => (
        <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} className="group flex items-center justify-end gap-3">
          <span className="pointer-events-none translate-x-2 rounded-full border border-white/10 bg-abyss/85 px-3 py-2 text-xs opacity-0 backdrop-blur-xl transition group-hover:translate-x-0 group-hover:opacity-100">
            {label}
          </span>
          <span className="grid h-12 w-12 animate-float place-items-center rounded-full border border-aqua/40 bg-aqua/15 text-aqua shadow-glow backdrop-blur-xl transition group-hover:scale-110 group-hover:bg-aqua group-hover:text-white">
            <Icon size={20} />
          </span>
        </a>
      ))}
    </div>
  );
}
