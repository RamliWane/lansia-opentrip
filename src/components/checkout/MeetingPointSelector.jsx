"use client";

import { MEETING_POINTS, OrderDomain } from "../../lib/Order";

export default function MeetingPointSelector({ selectedId, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-[15px] font-semibold text-gray-800">Meeting Point</h3>
        <span className="text-xs text-gray-400">{MEETING_POINTS.length} pilihan</span>
      </div>
      <p className="text-xs text-gray-400 mb-4">
        Pilih titik kumpul yang paling dekat dari lokasi kamu.
      </p>

      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {MEETING_POINTS.map((mp) => {
          const isSelected = selectedId === mp.id;
          const isFree = mp.additionalCost === 0;

          return (
            <button
              key={mp.id}
              type="button"
              onClick={() => onChange(mp.id)}
              className={`w-full flex items-start gap-3.5 text-left px-4 py-3.5 transition-colors ${
                isSelected ? "bg-orange-50/60" : "hover:bg-gray-50"
              }`}
            >
              <span
                className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-[#df7224]" : "border-gray-300"
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#df7224]" />}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className={`text-sm font-semibold truncate ${isSelected ? "text-[#df7224]" : "text-gray-800"}`}>
                    {mp.label}
                  </p>
                  <span className={`text-xs font-semibold shrink-0 ${isFree ? "text-gray-400" : "text-[#df7224]"}`}>
                    {isFree ? "Gratis" : `+${OrderDomain.formatPrice(mp.additionalCost)}`}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5 truncate">{mp.description}</p>

                {mp.mapUrl && (
                  <a
                    href={mp.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-[#df7224] mt-1.5 transition-colors"
                  >
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Lihat lokasi di peta
                  </a>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}