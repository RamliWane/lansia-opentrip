"use client";

import Link from "next/link";
import { Compass, ShieldCheck, HeartHandshake, ChevronRight } from "lucide-react";
import ModalsSlider from "./ModalsSlider";

const HeroSection = () => {
  return (
    <section id="beranda" className="relative overflow-hidden bg-gray-950 py-16 sm:py-20 flex items-center">
      <div className="absolute inset-0 bg-[url('/hero-image-2.jpeg')] bg-cover bg-center opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <ModalsSlider />
        <div className="grid lg:grid-cols-2 gap-12 items-center pt-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-white text-xs font-medium mb-6">
              <Compass className="w-3.5 h-3.5 text-primary" />
              <span>Spesialis Open Trip & Wisata Lansia</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Perjalanan Wisata <span className="text-primary">Nyaman, Aman,</span> & Ramah Lansia
            </h1>

            <p className="text-gray-300 text-base leading-relaxed mb-8 max-w-xl">
              Jelajahi keindahan Indonesia dengan fasilitas perjalanan fleksibel, ritme santai tanpa terburu-buru, serta pendamping profesional yang siap menjaga kenyamanan Anda.
            </p>

            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link
                href="/destinasi"
                className="px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium text-sm flex items-center gap-2 shadow-sm transition-colors"
              >
                <span>Lihat Destinasi</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/private"
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 backdrop-blur-sm transition-colors"
              >
                Rencanakan Private Trip
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/15 max-w-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Pendampingan</h4>
                  <p className="text-gray-400 text-xs">Medis & Guide Sabar</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">Ritme Santai</h4>
                  <p className="text-gray-400 text-xs">Jadwal Tidak Padat</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-6">
                <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=500&fit=crop"
                    alt="Wisata Lansia Pantai"
                    className="w-full h-72 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=350&fit=crop"
                    alt="Pemandangan Alam"
                    className="w-full h-36 object-cover"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=350&fit=crop"
                    alt="Jalan Santai"
                    className="w-full h-44 object-cover"
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-md border border-white/10">
                  <img
                    src="https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=400&h=500&fit=crop"
                    alt="Pegunungan Segar"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;