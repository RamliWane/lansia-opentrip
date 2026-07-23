"use client";

import { Destination } from "../../../domain/entities/Destination";
import { OrderDomain } from "../../../domain/entities/Order";



const MIN_DATE = new Date().toISOString().split("T")[0];

export default function BookingCard({ destination, travelDate, pax, setPax, setTravelDate }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-zinc-800">
      {/* Destination Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold text-white shadow-sm"
            style={{ backgroundColor: "#df7224" }}
          >
            ✓ Tersedia
          </span>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/40 backdrop-blur-sm text-white border border-white/10">
            {destination.category}
          </span>
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h2 className="text-lg font-extrabold text-white leading-tight mb-1 drop-shadow-sm">
            {destination.title}
          </h2>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#f5b28a" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {destination.location}
            </span>
            <span className="flex items-center gap-1 text-xs">
              <span className="text-amber-400 font-bold">★ {destination.rating}</span>
              <span className="text-white/60">({destination.reviewCount.toLocaleString("id-ID")})</span>
            </span>
          </div>
        </div>
      </div>

      {/* Trip detail inputs */}
      <div className="p-5">
        <div className="grid grid-cols-2 gap-4">
          {/* Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Tanggal <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              min={MIN_DATE}
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none"
            />
          </div>

          {/* Pax */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Peserta <span className="text-red-400">*</span>
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPax(Math.max(1, pax - 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold transition-colors flex items-center justify-center shrink-0 text-lg"
                style={{ ['--hover-color' as string]: '#df7224' }}
                onMouseEnter={e => { (e.currentTarget ).style.color = '#df7224'; (e.currentTarget ).style.backgroundColor = '#df722415'; }}
                onMouseLeave={e => { (e.currentTarget ).style.color = ''; (e.currentTarget ).style.backgroundColor = ''; }}
              >
                −
              </button>
              <div className="flex-1 glass-input px-3 py-2.5 rounded-xl text-sm font-extrabold text-center">
                {pax}
              </div>
              <button
                type="button"
                onClick={() => setPax(Math.min(20, pax + 1))}
                className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold transition-colors flex items-center justify-center shrink-0 text-lg"
                onMouseEnter={e => { (e.currentTarget ).style.color = '#df7224'; (e.currentTarget ).style.backgroundColor = '#df722415'; }}
                onMouseLeave={e => { (e.currentTarget ).style.color = ''; (e.currentTarget ).style.backgroundColor = ''; }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price per pax */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2">
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            Harga per peserta
          </span>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "#df7224" }}>Harga mulai</p>
            <p className="text-sm font-extrabold text-gray-900 dark:text-white">
              {OrderDomain.formatPrice(destination.priceMin)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
