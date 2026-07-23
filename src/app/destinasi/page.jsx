"use client";

import { useState, useMemo } from "react";
import { MapPin, Star, ArrowRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SearchBar from "@/components/destinasi/SearchBar";
import FilterPanel from "@/components/destinasi/FilterPanel";
import { destinationsData } from "@/infrastructure/data/destinationsData";

function formatRupiah(value) {
  return "Rp " + Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function DestisasiPage() {
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [minRating, setMinRating] = useState(0);

  const hasActiveFilters =
    selectedLocation !== "" || priceMin !== "" || priceMax !== "" || minRating > 0;

  const resetAllFilters = () => {
    setSelectedLocation("");
    setPriceMin("");
    setPriceMax("");
    setMinRating(0);
    setSearch("");
  };

  const filtered = useMemo(() => {
    return destinationsData.filter((d) => {
      const matchSearch =
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.location.toLowerCase().includes(search.toLowerCase());
      const matchLocation =
        selectedLocation === "" || d.location === selectedLocation;
      const matchPriceMin = priceMin === "" || d.priceMin >= priceMin;
      const matchPriceMax = priceMax === "" || d.priceMin <= priceMax;
      const matchRating = d.rating >= minRating;
      return matchSearch && matchLocation && matchPriceMin && matchPriceMax && matchRating;
    });
  }, [search, selectedLocation, priceMin, priceMax, minRating]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f8f6]">

        {/* ── Page Header ─────────────────────────────── */}
        {/* Latar penuh-lebar, konten dibatasi container yang sama dengan section bawah */}
        <div className="bg-white border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
            <p className="text-[#df7224] font-semibold text-sm tracking-wide mb-2">
              JELAJAHI INDONESIA
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Semua <span className="text-[#df7224]">Destinasi</span>
            </h1>
            <SearchBar
              searchQuery={search}
              onSearchChange={setSearch}
              onClear={() => setSearch("")}
            />
          </div>
        </div>

        {/* ── Filter Sidebar + Grid ────────────────────── */}
        {/* Container identik dengan header di atas */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Sidebar */}
            <div className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-20">
              <FilterPanel
                destinations={destinationsData}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
                minRating={minRating}
                setMinRating={setMinRating}
                onResetAll={resetAllFilters}
                hasActiveFilters={hasActiveFilters}
              />
            </div>

            {/* Results */}
            <div className="flex-1 min-w-0">
              {/* Results bar */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={15} className="text-gray-400" />
                  <span className="text-sm font-semibold text-gray-700">
                    {filtered.length} destinasi ditemukan
                  </span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    className="text-xs font-semibold text-[#df7224] underline"
                  >
                    Reset filter
                  </button>
                )}
              </div>

              {/* Empty state */}
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border border-dashed border-gray-200 bg-white">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: "rgba(223,114,36,0.08)" }}
                  >
                    <SlidersHorizontal size={24} style={{ color: "#df7224" }} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700 mb-1">
                    Tidak ada destinasi cocok
                  </p>
                  <p className="text-xs text-gray-400 mb-5 max-w-xs">
                    Coba sesuaikan kata kunci pencarian atau reset filter yang aktif.
                  </p>
                  <button
                    onClick={resetAllFilters}
                    className="px-5 py-2.5 rounded-xl text-white text-xs font-bold"
                    style={{ backgroundColor: "#df7224" }}
                  >
                    Reset Semua Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {filtered.map((dest) => (
                    <Link
                      key={dest.id}
                      href={`/destinasi/${dest.id}`}
                      className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-200 transition-all duration-200"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={dest.image}
                          alt={dest.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          <Star size={12} className="text-[#df7224] fill-[#df7224]" />
                          <span className="text-xs font-semibold text-gray-900">
                            {dest.rating.toFixed(1)}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-amber-500">
                          {dest.category}
                        </div>
                      </div>

                      <div className="p-5">
                        <p className="flex items-center gap-1 text-xs text-gray-400 mb-1">
                          <MapPin size={12} />
                          {dest.location}
                        </p>
                        <h3 className="text-base font-bold text-gray-900 mb-4 line-clamp-1">
                          {dest.title}
                        </h3>
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div>
                            <p className="text-[11px] text-gray-400">mulai dari</p>
                            <p className="text-sm font-bold text-gray-900">
                              {formatRupiah(dest.priceMin)}
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
                    </Link>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
