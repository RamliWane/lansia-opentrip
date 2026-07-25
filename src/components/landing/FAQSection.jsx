"use client";

import { useState } from "react";
import { Plus, ChevronLeft, ChevronRight, Send } from "lucide-react";
import { faqs } from "@/lib/data.js";

const PAGE_SIZE = 6;

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(faqs.length / PAGE_SIZE);

  const visibleFaqs = faqs.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  const goTo = (target) => {
    setPage(Math.max(0, Math.min(target, totalPages - 1)));
    setOpenIndex(-1);
  };

  return (
    <section id="faq" className="relative bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-start mb-10">
          <span className="text-primary font-semibold text-xs uppercase tracking-wider block mb-2">
            PERTANYAAN UMUM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-snug">
            Pertanyaan Yang Sering <span className="text-primary">Diajukan</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {visibleFaqs.map((faq, i) => {
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? "border-primary/30 bg-primary-light/30 shadow-xs"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="font-semibold text-gray-900 text-sm sm:text-base">
                        {faq.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "bg-primary text-white rotate-45"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        <Plus size={16} />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-4 pt-1 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => goTo(page - 1)}
                  disabled={page === 0}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`Page ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      i === page ? "w-6 bg-primary" : "w-2 bg-gray-200"
                    }`}
                  />
                ))}
                <button
                  onClick={() => goTo(page + 1)}
                  disabled={page === totalPages - 1}
                  className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-900 transition-colors disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          <div className="lg:col-span-5 bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8 text-center shadow-xs">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Punya Pertanyaan Lain?
            </h3>
            <p className="text-xs text-gray-600 mb-6 max-w-xs mx-auto">
              Tim konsultan kami siap memberikan info lengkap terkait kebutuhan wisata lansia Anda.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="text-left space-y-3"
            >
              <input
                type="text"
                placeholder="Tulis pertanyaan Anda di sini..."
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg font-medium text-sm transition-colors shadow-xs"
              >
                <span>Kirim Pertanyaan</span>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;