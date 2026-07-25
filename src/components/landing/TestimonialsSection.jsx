"use client";

import { useState } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/lib/data";

const PAGE_SIZE = 3;

const TestimonialsSection = () => {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(reviews.length / PAGE_SIZE);

  const visibleReviews = reviews.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goTo = (target) => {
    setPage(Math.max(0, Math.min(target, totalPages - 1)));
  };

  return (
    <section id="review" className="relative bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 gap-4">
          <div>
            <span className="text-primary font-semibold text-xs uppercase tracking-wider block mb-2">
              TESTIMONI PESERTA
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
              Pengalaman Berkesan <span className="text-primary">Peserta Kami</span>
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-xs">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="text-primary fill-primary" />
              ))}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">4.9 / 5.0</p>
              <p className="text-[11px] text-gray-500">dari 1.200+ peserta senior</p>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleReviews.map((r, i) => (
            <div
              key={`${page}-${i}`}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shrink-0 overflow-hidden">
                      {r.avatar ? (
                        <img src={r.avatar} alt={r.name} className="w-full h-full object-cover" />
                      ) : (
                        r.initial
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900 truncate">
                        {r.name}
                      </h3>
                      <p className="text-xs text-gray-500 truncate">{r.trip}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0 bg-primary-light px-2 py-0.5 rounded-md border border-primary/20">
                    <Star size={12} className="text-primary fill-primary" />
                    <span className="text-xs font-bold text-gray-900">{r.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed pt-2 border-t border-gray-100">
                  "{r.review}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              className="w-9 h-9 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Halaman sebelumnya"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Ke halaman ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-200 ${
                    i === page ? "w-6 bg-primary" : "w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages - 1}
              className="w-9 h-9 rounded-lg border border-gray-300 bg-white flex items-center justify-center text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
              aria-label="Halaman berikutnya"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;