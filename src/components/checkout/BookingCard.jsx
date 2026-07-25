"use client";

import { Calendar, Users, MapPin, Star } from "lucide-react";
import { OrderDomain } from "@/lib/Order";

const MIN_DATE = new Date().toISOString().split("T")[0];

const BookingCard = ({ destination, travelDate, pax, setPax, setTravelDate }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-xs border border-gray-200">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/30 to-transparent" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-[#df7224]">
            Tersedia
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-900 border border-gray-100">
            {destination.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h2 className="text-xl font-bold text-white leading-tight mb-2">
            {destination.title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-medium text-gray-200">
              <MapPin size={14} className="text-[#df7224]" />
              <span>{destination.location}</span>
            </span>
            <span className="flex items-center gap-1 text-xs">
              <Star size={13} className="text-[#df7224] fill-[#df7224]" />
              <span className="text-white font-bold">{destination.rating}</span>
              <span className="text-gray-300">({destination.reviewCount.toLocaleString("id-ID")})</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Calendar size={14} className="text-[#df7224]" />
              <span>Tanggal Keberangkatan *</span>
            </label>
            <input
              type="date"
              min={MIN_DATE}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#df7224] focus:border-transparent transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700 flex items-center gap-1.5">
              <Users size={14} className="text-[#df7224]" />
              <span>Jumlah Peserta *</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center shrink-0 hover:bg-[#fef5ef] hover:text-[#df7224] transition-colors cursor-pointer"
              >
                −
              </button>
              <div className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold text-center text-gray-900 bg-white border border-gray-300">
                {pax} Peserta
              </div>
              <button
                type="button"
                onClick={() => setPax(Math.min(20, pax + 1))}
                className="w-10 h-10 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center shrink-0 hover:bg-[#fef5ef] hover:text-[#df7224] transition-colors cursor-pointer"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            Harga per peserta
          </span>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-900">
              {OrderDomain.formatPrice(destination.priceMin)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;