"use client";

import { useRef } from "react";
import Link from "next/link";
import { MapPin, Star, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { destinationsData } from "@/lib/destinationsData";
import { formatRupiah } from "@/lib/format";

const DestinationSection = () => {
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
    <section id="destinasi" className="relative bg-gray-50/50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div>
            <span className="text-primary font-semibold text-xs uppercase tracking-wider block mb-2">
              DESTINASI PILIHAN
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Destinasi Paling <span className="text-primary">Populer</span>
            </h2>
          </div>

          <Link
            href="/destinasi"
            className="hidden md:flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-primary transition-colors shrink-0"
          >
            <span>Lihat semua destinasi</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-4 md:grid-rows-2 gap-6 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {destinationsData.slice(0, 8).map((dest) => (
            <Link
              key={dest.id}
              href={`/destinasi/${dest.id}`}
              className="group snap-start shrink-0 w-[280px] sm:w-[320px] md:w-auto bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={dest.image}
                    alt={dest.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-100 shadow-xs">
                    <Star size={12} className="text-primary fill-primary" />
                    <span className="text-xs font-semibold text-gray-900">
                      {dest.rating}
                    </span>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <p className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
                    <MapPin size={12} className="text-primary" />
                    <span>{dest.location}</span>
                  </p>
                  <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
                    {dest.title}
                  </h3>
                </div>
              </div>

              <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-gray-500">Mulai dari</p>
                  <p className="text-sm sm:text-base font-bold text-gray-900">
                    {formatRupiah(dest.priceMin)}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary flex items-center justify-center transition-colors shrink-0">
                  <ArrowRight
                    size={14}
                    className="text-gray-600 group-hover:text-white transition-colors"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex md:hidden items-center justify-between mt-6">
          <Link
            href="/destinasi"
            className="text-xs font-semibold text-primary"
          >
            Lihat semua destinasi →
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 bg-white shadow-xs"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 bg-white shadow-xs"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DestinationSection;