"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DestinationGallery = ({ images, title, onOpenLightbox }) => {
  const [mobileSlide, setMobileSlide] = useState(0);
  const hiddenCount = images.length - 3;

  return (
    <>
      <div className="md:hidden relative h-[38vh] min-h-[260px] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
        <img
          src={images[mobileSlide] || images[0]}
          alt={`${title} ${mobileSlide + 1}`}
          onClick={() => onOpenLightbox(mobileSlide)}
          className="w-full h-full object-cover cursor-pointer"
        />
        <div className="absolute bottom-3 right-3 bg-gray-950/70 backdrop-blur-xs text-white text-xs font-medium px-2.5 py-1 rounded-full">
          {mobileSlide + 1} / {images.length}
        </div>
        {images.length > 1 && (
          <button
            onClick={() => setMobileSlide((i) => (i - 1 + images.length) % images.length)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-950/40 hover:bg-gray-950/60 flex items-center justify-center text-white transition-colors"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
        )}
        {images.length > 1 && (
          <button
            onClick={() => setMobileSlide((i) => (i + 1) % images.length)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gray-950/40 hover:bg-gray-950/60 flex items-center justify-center text-white transition-colors"
            aria-label="Berikutnya"
          >
            <ChevronRight size={18} />
          </button>
        )}
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

      <div className="hidden md:grid grid-cols-4 gap-3 h-[45vh] min-h-[380px] rounded-2xl overflow-hidden shadow-xs border border-gray-100">
        <div className="col-span-3 h-full overflow-hidden">
          <img
            src={images[0]}
            alt={title}
            onClick={() => onOpenLightbox(0)}
            className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
          />
        </div>
        <div className="flex flex-col gap-3 h-full">
          <div className="flex-1 overflow-hidden">
            <img
              src={images[1] || images[0]}
              alt={`${title} 2`}
              onClick={() => onOpenLightbox(1)}
              className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
            />
          </div>
          <div className="flex-1 overflow-hidden relative">
            <img
              src={images[2] || images[0]}
              alt={`${title} 3`}
              onClick={() => onOpenLightbox(hiddenCount > 0 ? 3 : 2)}
              className="w-full h-full object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
            />
            {hiddenCount > 0 && (
              <div
                onClick={() => onOpenLightbox(3)}
                className="absolute inset-0 bg-gray-950/60 backdrop-blur-xs flex items-center justify-center cursor-pointer hover:bg-gray-950/70 transition-colors"
              >
                <span className="text-white font-bold text-xl">+{hiddenCount} foto</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DestinationGallery;