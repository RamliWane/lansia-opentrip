"use client";

import { useRef } from "react";
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "@/lib/data";

export default function DestinationSection() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="destinasi" className="relative bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-[#df7224] font-semibold text-sm tracking-wide mb-3">
              DESTINASI PILIHAN
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Destinasi Paling <span className="text-[#df7224]">Diminati</span>
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
              aria-label="Scroll ke kiri"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors"
              aria-label="Scroll ke kanan"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory px-4 sm:px-6 lg:px-[calc((100vw-72rem)/2+1.5rem)] pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {destinations.map((dest, i) => (
          <a
            key={i}
            href="#"
            className="group snap-start flex-shrink-0 w-[300px] sm:w-[340px] bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-gray-200 transition-all duration-300"
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <Star size={12} className="text-[#df7224] fill-[#df7224]" />
                <span className="text-xs font-semibold text-gray-900">
                  {dest.rating}
                </span>
              </div>
            </div>

            <div className="p-5">
              <p className="flex items-center gap-1 text-xs text-gray-400 mb-2">
                <MapPin size={12} />
                {dest.location}
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {dest.name}
              </h3>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-[11px] text-gray-400">mulai dari</p>
                  <p className="text-base font-bold text-gray-900">
                    Rp {dest.price}
                  </p>
                </div>
                <div className="w-9 h-9 rounded-full bg-gray-50 group-hover:bg-[#df7224] flex items-center justify-center transition-colors flex-shrink-0">
                  <ArrowRight
                    size={16}
                    className="text-gray-500 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            </div>
          </a>
        ))}

        <div className="flex-shrink-0 w-1" />
      </div>

      <div className="flex sm:hidden items-center justify-center gap-2 mt-6">
        <button
          onClick={() => scroll("left")}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}