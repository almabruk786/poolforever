"use client";

import { Quote } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  return (
    <section className="section-pad bg-white/[.025]">
      <div className="mx-auto max-w-7xl">
        <SectionHeading center eyebrow="Testimonials" title={<>Trusted by owners who care about finish.</>} />
        <Swiper modules={[Autoplay, Pagination]} loop autoplay={{ delay: 3600 }} pagination={{ clickable: true }} className="!pb-12">
          {testimonials.map((item) => (
            <SwiperSlide key={item.name}>
              <div className="glass mx-auto max-w-4xl rounded-[2rem] p-8 text-center md:p-12">
                <Quote className="mx-auto mb-6 text-aqua" size={42} />
                <p className="font-display text-3xl leading-snug md:text-5xl">"{item.quote}"</p>
                <p className="mt-8 font-semibold">{item.name}</p>
                <p className="text-white/50">{item.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
