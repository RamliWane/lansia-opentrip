"use client";

import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import { formatRupiah } from "@/lib/format";

const DestinationCard = ({ dest }) => {
  const { id, image, title, rating, category, location, priceMin } = dest;

  return (
    <Link
      href={`/destinasi/${id}`}
      className="group bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
    >
      <div>
        <div className="relative h-44 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-gray-100 shadow-xs">
            <Star size={12} className="text-primary fill-primary" />
            <span className="text-xs font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>
          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium text-white bg-primary">
            {category}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <p className="flex items-center gap-1 text-xs text-gray-500 mb-1.5">
            <MapPin size={12} className="text-primary" />
            <span>{location}</span>
          </p>
          <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
      </div>

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-gray-500">Mulai dari</p>
          <p className="text-sm font-bold text-gray-900">
            {formatRupiah(priceMin)}
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-primary flex items-center justify-center transition-colors shrink-0">
          <ArrowRight
            size={14}
            className="text-gray-600 group-hover:text-white transition-colors"
          />
        </div>
      </div>
    </Link>
  );
};

export default DestinationCard;