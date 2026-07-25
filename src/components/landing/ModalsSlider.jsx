"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, Search, X, MapPin } from "lucide-react";

const POPULAR_LOCATIONS = [
  "Yogyakarta",
  "Bandung",
  "Bali",
  "Jawa Tengah",
  "Jawa Timur",
  "Sumatra Utara",
  "Lombok",
];

const TRENDING_DESTINATIONS = [
  {
    name: "Yogyakarta Santai",
    image: "https://images.unsplash.com/photo-1591674585153-ca78d0339b09?w=400&h=500&fit=crop",
  },
  {
    name: "Bandung Highland",
    image: "https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&h=500&fit=crop",
  },
  {
    name: "Danau Toba",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=500&fit=crop",
  },
  {
    name: "Ubud Bali",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=500&fit=crop",
  },
];

const ModalsSlider = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Yogyakarta");
  const [query, setQuery] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => setIsModalOpen(false), 300);
  };

  const handleSearch = (searchTerm) => {
    closeModal();
    const target = searchTerm || query || selectedLocation;
    router.push(`/destinasi?search=${encodeURIComponent(target)}`);
  };

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  return (
    <div>
      <div className="flex items-center justify-center px-4">
        <button
          onClick={openModal}
          className="flex w-full max-w-2xl items-center gap-3 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200 shadow-sm hover:shadow-md px-5 py-3 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-light text-primary shrink-0">
            <Search size={18} />
          </div>

          <div className="flex-1 text-left">
            <p className="font-semibold text-gray-900 text-sm">Cari Destinasi Wisata Lansia</p>
            <p className="text-xs text-gray-500">
              Cari paket open trip santai & ramah lansia...
            </p>
          </div>

          <div className="w-px h-8 bg-gray-200 shrink-0" />

          <SlidersHorizontal size={18} className="text-primary shrink-0" />
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50">
          <div
            className={`absolute inset-0 bg-gray-950/60 backdrop-blur-xs transition-opacity duration-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
            onClick={closeModal}
          />

          <div
            className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-t-2xl shadow-xl overflow-hidden h-[75vh] flex flex-col transition-transform duration-300 ease-out ${
              isVisible ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <div className="flex justify-center pt-3 pb-2 shrink-0 bg-white">
              <div className="w-10 h-1 rounded-full bg-gray-300" />
            </div>

            <button
              onClick={closeModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors z-10"
              aria-label="Tutup"
            >
              <X size={16} />
            </button>

            <div className="flex-1 overflow-y-auto px-5 sm:px-6 pt-4 pb-8 space-y-5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch();
                }}
                className="flex items-center gap-3 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5"
              >
                <Search size={18} className="text-gray-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ketik lokasi atau nama destinasi (mis. Bandung)..."
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-hover transition-colors"
                >
                  Cari
                </button>
              </form>

              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Lokasi Populer
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {POPULAR_LOCATIONS.map((loc) => {
                    const isSelected = selectedLocation === loc;
                    return (
                      <button
                        key={loc}
                        type="button"
                        onClick={() => {
                          setSelectedLocation(loc);
                          handleSearch(loc);
                        }}
                        className={`flex items-center gap-2 text-left text-xs py-2 px-3 rounded-lg transition-colors ${
                          isSelected
                            ? "bg-primary-light text-primary font-semibold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary"
                        }`}
                      >
                        <MapPin size={14} className={isSelected ? "text-primary" : "text-gray-400"} />
                        <span>{loc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Trip Populer Lansia
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {TRENDING_DESTINATIONS.map((dest) => (
                    <button
                      key={dest.name}
                      type="button"
                      onClick={() => handleSearch(dest.name)}
                      className="relative shrink-0 w-32 h-40 rounded-lg overflow-hidden group text-left border border-gray-200"
                    >
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent" />
                      <span className="absolute bottom-2.5 left-2.5 right-2.5 text-white text-xs font-medium line-clamp-2">
                        {dest.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalsSlider;