"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { CmsProject } from "@/types/cms";
import { SectionHeading } from "./SectionHeading";
import { getOptimizedUrl } from "@/lib/cloudinary-loader";

export function ProjectSlider({ projects }: { projects: CmsProject[] }) {
  return (
    <section className="section-pad overflow-hidden bg-white/[.025]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Project Showcase" title={<>Signature pools with cinematic presence.</>} text="Swipe through rooftop pools, resort lagoons, Jacuzzi zones, family pools, and architectural water features." />
        <Swiper modules={[Autoplay, Pagination, Navigation]} loop autoplay={{ delay: 2800 }} pagination={{ clickable: true }} navigation spaceBetween={22} slidesPerView={1.08} breakpoints={{ 768: { slidesPerView: 2.1 }, 1180: { slidesPerView: 3.15 } }} className="!pb-12">
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <Link href="/projects" className="group block overflow-hidden rounded-[2rem] border border-white/10 bg-white/[.06]">
                <div className="relative h-[28rem] overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${getOptimizedUrl(project.image, 600)})` }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-abyss via-transparent to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <p className="text-sm uppercase tracking-[.22em] text-aqua">{project.category}</p>
                    <h3 className="mt-3 font-display text-4xl font-semibold">{project.title}</h3>
                    <p className="mt-3 text-white/65">{project.location}</p>
                  </div>
                  <span className="absolute right-5 top-5 grid h-12 w-12 place-items-center rounded-full bg-white text-abyss transition group-hover:bg-aqua group-hover:text-white">
                    <ArrowUpRight size={20} />
                  </span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
