"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const links = ["About", "Services", "Projects", "Gallery", "Testimonials", "Contact", "Booking"];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header initial={{ y: -90 }} animate={{ y: 0 }} className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-abyss/55 px-4 py-3 backdrop-blur-2xl">
        <Link href="/" aria-label="Pool Forever home">
          <Logo />
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/78 lg:flex">
          {links.map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} className="transition hover:text-aqua">
              {link}
            </Link>
          ))}
        </div>
        <Link href="/booking" className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-bold text-abyss transition hover:bg-aqua hover:text-white lg:block">
          Get Consultation
        </Link>
        <button className="grid h-11 w-11 place-items-center rounded-full border border-white/10 lg:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      {open && (
        <div className="mx-auto mt-3 max-w-7xl rounded-3xl border border-white/10 bg-abyss/90 p-4 backdrop-blur-2xl lg:hidden">
          {links.map((link) => (
            <Link key={link} href={`/${link.toLowerCase()}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 text-white/80 hover:bg-white/10">
              {link}
            </Link>
          ))}
        </div>
      )}
    </motion.header>
  );
}
