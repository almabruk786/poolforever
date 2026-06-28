"use client";

import { motion } from "framer-motion";
import { ArrowRight, MessageCircle, Play } from "lucide-react";
import Link from "next/link";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { heroSlides } from "@/lib/data";
import type { SiteContent } from "@/types/cms";
import { getOptimizedUrl } from "@/lib/cloudinary-loader";

export function Hero({ content }: { content: SiteContent }) {
  const slides = [{ ...heroSlides[0], image: content.heroImage }, ...heroSlides.slice(1)];

  return (
    <section className="relative min-h-screen overflow-hidden">
      <Swiper modules={[Autoplay, EffectFade, Pagination]} effect="fade" loop autoplay={{ delay: 4200, disableOnInteraction: false }} pagination={{ clickable: true }} className="absolute inset-0">
        {slides.map((slide) => (
          <SwiperSlide key={slide.image}>
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${getOptimizedUrl(slide.image, 1600)})` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/70 to-abyss/20" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="water-surface" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 pt-28">
        <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="max-w-4xl">
          <p className="mb-5 inline-flex rounded-full border border-aqua/30 bg-aqua/10 px-4 py-2 text-sm text-aqua backdrop-blur">{content.heroEyebrow}</p>
          <h1 className="font-display text-5xl font-bold leading-[.96] md:text-7xl lg:text-8xl">
            {content.heroTitle} <span className="aqua-text">{content.heroAccent}</span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/76 md:text-xl">
            {content.heroDescription}
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/booking" className="inline-flex items-center gap-2 rounded-full bg-aqua px-6 py-3 font-semibold text-white shadow-glow transition hover:scale-105">
              Get Consultation <ArrowRight size={18} />
            </Link>
            <a href={`https://wa.me/${content.whatsapp}`} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 font-semibold backdrop-blur transition hover:border-aqua hover:text-aqua">
              <MessageCircle size={18} /> WhatsApp Now
            </a>
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 font-semibold transition hover:bg-white hover:text-abyss">
              <Play size={18} /> View Projects
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
