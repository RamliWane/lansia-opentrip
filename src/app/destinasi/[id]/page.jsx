"use client";

import { use, useState, useEffect, useCallback } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { destinationsData } from "@/infrastructure/data/destinationsData";
import Navbar from "@/components/layout/Navbar";
import { DestinationDomain } from "@/domain/entities/Destination";

const A = "#df7224";

function formatNumber(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function formatRupiah(value) {
  return "Rp " + Math.floor(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function Lightbox({ images, startIndex, onClose }) {
  const [current, setCurrent] = useState(startIndex);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Tombol Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
        aria-label="Tutup"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold">
        {current + 1} / {images.length}
      </div>

      {/* Tombol Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-3 sm:left-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          aria-label="Sebelumnya"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Gambar */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={current}
          src={images[current]}
          alt={`Foto ${current + 1}`}
          className="max-w-[90vw] max-h-[85vh] w-auto h-auto object-contain rounded-xl select-none"
          draggable={false}
        />
      </div>

      {/* Tombol Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-3 sm:right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
          aria-label="Berikutnya"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 overflow-x-auto max-w-[90vw]">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
              className={`shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-colors ${i === current ? "border-white" : "border-transparent opacity-50 hover:opacity-80"}`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DestinationDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = Number(resolvedParams.id);
  const dest = destinationsData.find((d) => d.id === id);

  const [ratingFilter, setRatingFilter] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeTab, setActiveTab] = useState("tentang");
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [mobileSlide, setMobileSlide] = useState(0);

  if (!dest) {
    notFound();
  }

  const images = dest.images?.length ? dest.images : [dest.image];
  const shortLocation = DestinationDomain.getShortLocation(dest);
  
  const filteredReviews = ratingFilter 
    ? dest.reviewsList?.filter(r => Math.floor(r.rating) === ratingFilter)
    : dest.reviewsList;

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 2);

  const tabs = [
    { id: "tentang", label: "Deskripsi" },
    { id: "itinerary", label: "Itinerary" },
    { id: "meeting", label: "Titik Kumpul" },
    { id: "ulasan", label: "Ulasan" }
  ];

  const hiddenCount = images.length - 3;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 selection:bg-amber-500/30">
      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}

      {/* Navbar Landing Page */}
      <Navbar />

      {/* Tombol Kembali */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">
        <Link
          href="/destinasi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#df7224] transition-colors"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Kembali ke Destinasi
        </Link>
      </div>

      {/* Hero Section - Image Album */}
      <div className="pt-4 pb-4 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-6 mt-4">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
            <span className="px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold text-white bg-amber-500">
              {dest.category}
            </span>
            <span className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs">
              ★ {dest.rating.toFixed(1)} <span className="text-amber-600 dark:text-amber-400 font-normal">({formatNumber(dest.reviewCount)} ulasan)</span>
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-2 tracking-tight">
            {dest.title}
          </h1>
          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 dark:text-gray-400 text-sm sm:text-lg font-medium">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="sm:w-5 sm:h-5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {dest.location}
          </div>
        </div>

        {/* Album Grid */}
        {/* Mobile: carousel dengan tombol prev/next */}
        <div className="md:hidden relative h-[40vh] min-h-[260px] rounded-3xl overflow-hidden">
          <img
            src={images[mobileSlide] || images[0]}
            alt={`${dest.title} ${mobileSlide + 1}`}
            onClick={() => setLightboxIndex(mobileSlide)}
            className="w-full h-full object-cover cursor-pointer"
          />
          {/* Overlay counter */}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            {mobileSlide + 1} / {images.length}
          </div>
          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={() => setMobileSlide((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              aria-label="Sebelumnya"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}
          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={() => setMobileSlide((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center text-white transition-colors"
              aria-label="Berikutnya"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}
          {/* Dot indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileSlide(i)}
                  className={`rounded-full transition-all ${i === mobileSlide ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/50"}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden md:grid grid-cols-4 gap-2 sm:gap-4 h-[50vh] min-h-[400px] rounded-3xl overflow-hidden">
          {/* Gambar utama */}
          <div className="col-span-3 h-full overflow-hidden">
            <img
              src={images[0]}
              alt={dest.title}
              onClick={() => setLightboxIndex(0)}
              className="w-full h-full object-cover cursor-pointer"
            />
          </div>
          {/* Dua gambar kecil kanan */}
          <div className="flex flex-col gap-2 sm:gap-4 h-full">
            <div className="flex-1 overflow-hidden rounded-tr-3xl">
              <img
                src={images[1] || images[0]}
                alt={`${dest.title} 2`}
                onClick={() => setLightboxIndex(1)}
                className="w-full h-full object-cover cursor-pointer"
              />
            </div>
            <div className="flex-1 overflow-hidden rounded-br-3xl relative">
              <img
                src={images[2] || images[0]}
                alt={`${dest.title} 3`}
                onClick={() => setLightboxIndex(hiddenCount > 0 ? 3 : 2)}
                className="w-full h-full object-cover cursor-pointer"
              />
              {hiddenCount > 0 && (
                <div
                  onClick={() => setLightboxIndex(3)}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/60 transition-colors"
                >
                  <span className="text-white font-bold text-2xl">+{hiddenCount}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10 relative">
        
        {/* Left Column - Details with Tabs */}
        <div className="lg:col-span-2 flex flex-col">
          
          {/* Tabs Navigation */}
          <div className="flex overflow-x-auto border-b border-gray-200 dark:border-zinc-800 mb-8 sticky top-[72px] bg-slate-50 dark:bg-zinc-950 z-40 pt-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-3 sm:py-4 font-bold text-sm sm:text-base whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? 'border-amber-500 text-amber-500' : 'border-transparent text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            {/* About Section */}
            {activeTab === "tentang" && (
              <div>
                <section className="mb-10">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 sm:w-2 sm:h-8 rounded-full" style={{ backgroundColor: A }}></span>
                    Tentang Destinasi
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                    {dest.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Sorotan Utama</h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {dest.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 text-xs sm:text-sm font-semibold border border-amber-200 dark:border-amber-800/50">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        {h}
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {/* Itinerary Section */}
            {activeTab === "itinerary" && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 sm:w-2 sm:h-8 rounded-full" style={{ backgroundColor: A }}></span>
                  Rencana Perjalanan
                </h2>
                <div className="space-y-4 sm:space-y-6 relative before:absolute before:inset-0 before:ml-4 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-zinc-700 before:to-transparent">
                  {dest.itinerary?.map((item, idx) => (
                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full border-4 border-white dark:border-zinc-950 bg-amber-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-[10px] sm:text-xs">
                        {item.day}
                      </div>
                      <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-2rem)] p-3.5 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 transition-all hover:shadow-md hover:border-amber-200 dark:hover:border-amber-900/50">
                        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                          <h4 className="font-bold text-sm sm:text-lg" style={{ color: A }}>Hari {item.day}</h4>
                          <span className="text-[10px] sm:text-xs font-semibold text-gray-400 bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md">{shortLocation}</span>
                        </div>
                        <h5 className="font-bold text-sm sm:text-base text-gray-800 dark:text-gray-100 mb-1.5 sm:mb-2">{item.title}</h5>
                        <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Meeting Points Section */}
            {activeTab === "meeting" && (
              <section>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                  <span className="w-1.5 h-6 sm:w-2 sm:h-8 rounded-full" style={{ backgroundColor: A }}></span>
                  Titik Kumpul
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {dest.meetingPoints?.map((mp, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800 hover:border-amber-400 transition-colors group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-50 dark:bg-blue-900/20 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-bold text-lg">{mp.time}</div>
                          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{mp.location}</div>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{mp.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            {activeTab === "ulasan" && (
              <section>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-4">
                  <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                    <span className="w-1.5 h-6 sm:w-2 sm:h-8 rounded-full" style={{ backgroundColor: A }}></span>
                    Ulasan Pengunjung
                  </h2>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold overflow-x-auto pb-2 sm:pb-0">
                    <button 
                      onClick={() => setRatingFilter(null)}
                      className={`px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${ratingFilter === null ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700 hover:border-amber-500'}`}
                    >
                      Semua
                    </button>
                    {[5, 4, 3, 2, 1].map(star => (
                      <button 
                        key={star}
                        onClick={() => setRatingFilter(star)}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap ${ratingFilter === star ? 'bg-amber-500 text-white border-amber-500' : 'bg-white dark:bg-zinc-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-zinc-700 hover:border-amber-500'}`}
                      >
                        {star} <span className={ratingFilter === star ? "text-white" : "text-amber-500"}>★</span>
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  {displayedReviews && displayedReviews.length > 0 ? (
                    displayedReviews.map((review, idx) => (
                    <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-zinc-800">
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center font-bold text-gray-500 dark:text-gray-300 text-xs sm:text-base">
                            {review.author.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-sm sm:text-base">{review.author}</div>
                            <div className="text-[10px] sm:text-xs text-gray-400">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-900/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-lg">
                          <span className="text-amber-500 font-bold text-xs sm:text-sm">★</span>
                          <span className="font-bold text-xs sm:text-sm">{review.rating.toFixed(1)}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm italic mb-3">&quot;{review.comment}&quot;</p>
                      
                      {/* Review Photos */}
                      {review.images && review.images.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {review.images.map((img, imgIdx) => (
                            <img key={imgIdx} src={img} alt={`Foto ulasan dari ${review.author}`} className="h-16 sm:h-20 w-16 sm:w-20 object-cover rounded-xl border border-gray-200 dark:border-zinc-700" />
                          ))}
                        </div>
                      )}
                    </div>
                  ))
                  ) : (
                    <div className="text-center py-6 sm:py-8 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Belum ada ulasan untuk rating ini.
                    </div>
                  )}
                </div>
                {filteredReviews && filteredReviews.length > 2 && (
                  <button 
                    onClick={() => setShowAllReviews(!showAllReviews)}
                    className="mt-4 w-full py-2.5 sm:py-3 rounded-xl border-2 border-gray-200 dark:border-zinc-800 font-bold text-xs sm:text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    {showAllReviews ? "Tampilkan Lebih Sedikit" : `Lihat Semua Ulasan (${filteredReviews.length})`}
                  </button>
                )}
              </section>
            )}
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-28 bg-white dark:bg-zinc-900 p-6 rounded-3xl shadow-xl border border-gray-200/50 dark:border-zinc-800 flex flex-col gap-6">
            
            {/* Price Info */}
            <div className="pb-6 border-b border-gray-100 dark:border-zinc-800">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-1 uppercase tracking-wider">Mulai dari</div>
              <div className="text-3xl font-extrabold" style={{ color: A }}>
                {formatRupiah(dest.priceMin)}
              </div>
              <div className="text-sm text-gray-400 mt-1">per orang / pax</div>
            </div>

            <div className="pt-2">
              <Link href="/checkout" className="block w-full">
                <button 
                  className="w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:translate-y-0 cursor-pointer"
                  style={{ backgroundColor: A, boxShadow: `0 10px 25px -5px ${A}66` }}
                >
                  Pesan Sekarang
                </button>
              </Link>
              <p className="text-center text-xs text-gray-400 mt-4">Belum dipungut biaya saat ini.</p>
            </div>

            {/* Features */}
            <div className="mt-2 pt-4 border-t border-gray-100 dark:border-zinc-800 grid grid-cols-2 gap-3 text-xs font-semibold text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Bebas Reschedule
              </div>
              <div className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Pemandu Lokal
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
