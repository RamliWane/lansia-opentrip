"use client";

import { OrderDomain } from "../../lib/Order";

const MIN_DATE = new Date().toISOString().split("T")[0];

export default function BookingCard({ destination, travelDate, pax, setPax, setTravelDate }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-[3px] text-[11px] font-bold text-white bg-[#df7224] shadow-sm">
            Tersedia
          </span>
          <span className="px-2.5 py-1 rounded-[3px] text-[11px] font-bold bg-white backdrop-blur-sm text-[#df7224]">
            {destination.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-lg font-extrabold text-white leading-tight mb-1 drop-shadow-sm">
            {destination.title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs font-semibold text-[#f5b28a]">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {destination.location}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <span className="text-[#df7224] font-bold">★ {destination.rating}</span>
              <span className="text-white/60">({destination.reviewCount.toLocaleString("id-ID")})</span>
            </span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-gray-500 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Tanggal
            </label>
            <input
              type="date"
              min={MIN_DATE}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-900 bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] text-gray-500 flex items-center gap-1">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Peserta
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center shrink-0 hover:bg-[#df7224]/10 hover:text-[#df7224] transition-colors"
              >
                −
              </button>
              <div className="flex-1 px-3 py-2.5 rounded-xl text-sm font-extrabold text-center text-gray-900 bg-white border border-gray-200">
                {pax}
              </div>
              <button
                type="button"
                onClick={() => setPax(Math.min(20, pax + 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 text-gray-700 font-bold text-lg flex items-center justify-center shrink-0 hover:bg-[#df7224]/10 hover:text-[#df7224] transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[15px] text-gray-900 flex items-center pl-3">
            Harga per peserta
          </span>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#df7224]">Harga mulai</p>
            <p className="text-sm font-extrabold text-gray-900">
              {OrderDomain.formatPrice(destination.priceMin)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}