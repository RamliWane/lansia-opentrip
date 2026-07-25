"use client";

import { ArrowRight } from "lucide-react";

const Subs = () => {
  return (
    <section className="relative bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/footer-image-subs-2.jpeg')] bg-cover bg-center opacity-25" />
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
                Dapatkan Info Trip & Penawaran Spesial Lansia
              </h3>
              <p className="text-gray-300 text-sm">
                Daftarkan email Anda untuk menerima pembaruan jadwal trip lansia dan promo eksklusif.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row w-full lg:w-auto gap-3"
            >
              <input
                type="email"
                placeholder="Masukkan alamat email Anda"
                className="flex-1 lg:w-80 bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors shrink-0 shadow-xs"
              >
                <span>Berlangganan</span>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subs;