"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/lib/data";

const PAGE_SIZE = 3;

export default function ReviewSection() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);

  const visibleReviews = reviews.slice(
    page * PAGE_SIZE,
    page * PAGE_SIZE + PAGE_SIZE
  );

  const goTo = (target) => {
    setPage(Math.max(0, Math.min(target, totalPages - 1)));
  };

  return (
    <section id="review" className="relative bg-gray-100 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
          <div>
            <p className="text-[#df7224] font-semibold text-sm tracking-wide mb-3">
              TESTIMONI
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug">
              Apa Kata Mereka Setelah{" "}
              <span className="text-[#df7224]">Traveling</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="text-[#df7224] fill-[#df7224]"
                />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">4.9 / 5.0</p>
              <p className="text-xs text-gray-500">dari 1.200+ traveler</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((r, i) => (
            <div
              key={`${page}-${i}`}
              className="relative bg-white rounded-2xl p-7 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <Quote
                size={28}
                className="text-orange-100 mb-4"
                fill="currentColor"
              />

              <p className="text-gray-600 text-[15px] leading-relaxed mb-6">
                {r.review}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                    {r.initial}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-400">{r.trip}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, idx) => (
                    <Star
                      key={idx}
                      size={12}
                      className={
                        idx < r.rating
                          ? "text-black fill-black"
                          : "text-gray-200 fill-gray-200"
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="w-10 h-10 rounded-full cursor-pointer border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ke halaman ${i + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === page
                      ? "w-7 bg-[#df7224]"
                      : "w-2.5 bg-gray-200 hover:bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-gray-200 cursor-pointer flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}