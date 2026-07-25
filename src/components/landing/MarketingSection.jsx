"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, CalendarCheck } from "lucide-react";
import { features } from "@/lib/data";

const MarketingSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? -1 : i);
  };

  return (
    <section className="relative bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-2 block">
              Keunggulan Layanan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-4">
              Kenapa Memilih <span className="text-primary">Lansia OpenTrip</span>?
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Kami memastikan seluruh rangkaian perjalanan aman, terencana dengan baik, dan memberikan kenyamanan penuh bagi lansia dan keluarga.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                const isOpen = openIndex === i;
                return (
                  <div
                    key={i}
                    className={`rounded-xl border transition-colors ${
                      isOpen
                        ? "border-primary/40 bg-primary-light/40 shadow-sm"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <button
                      onClick={() => toggle(i)}
                      className="w-full flex items-start gap-4 p-4 text-left"
                    >
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 text-base">
                          {feature.title}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {feature.desc}
                        </p>
                      </div>
                      <ChevronDown
                        size={18}
                        className={`text-gray-400 shrink-0 mt-1 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 border-t border-gray-100">
                        <p className="text-sm text-gray-600 leading-relaxed pl-14">
                          {feature.detail}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="rounded-xl overflow-hidden shadow-md border border-gray-100 mb-6">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=500&fit=crop"
                alt="Perjalanan Lansia Bersama Keluarga"
                className="w-full h-[380px] object-cover"
              />
            </div>

            <Link
              href="/destinasi"
              className="flex items-center justify-center gap-3 rounded-lg bg-primary hover:bg-primary-hover text-white py-4 px-6 shadow-sm transition-colors"
            >
              <CalendarCheck size={20} />
              <span className="font-semibold text-base">
                Pesan Trip Sekarang
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingSection;