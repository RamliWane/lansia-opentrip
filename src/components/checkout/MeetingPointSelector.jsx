"use client";

import { MapPin, ExternalLink } from "lucide-react";
import { MEETING_POINTS, OrderDomain } from "@/lib/Order";

const MeetingPointSelector = ({ selectedId, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
          <MapPin size={18} className="text-[#df7224]" />
          <span>Titik Kumpul Penjemputan</span>
        </h3>
        <span className="text-xs text-gray-500">{MEETING_POINTS.length} pilihan</span>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        Pilih titik kumpul penjemputan yang paling dekat dari lokasi Anda.
      </p>

      <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden">
        {MEETING_POINTS.map((mp) => {
          const isSelected = selectedId === mp.id;
          const isFree = mp.additionalCost === 0;

          return (
            <button
              key={mp.id}
              type="button"
              onClick={() => onChange(mp.id)}
              className={`w-full flex items-start gap-3.5 text-left px-4 py-3.5 transition-colors cursor-pointer ${
                isSelected ? "bg-[#fef5ef]" : "hover:bg-gray-50"
              }`}
            >
              <div
                className={`mt-0.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected ? "border-[#df7224]" : "border-gray-300"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-[#df7224]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-3">
                  <p className={`text-sm font-semibold truncate ${isSelected ? "text-[#df7224]" : "text-gray-900"}`}>
                    {mp.label}
                  </p>
                  <span className={`text-xs font-semibold shrink-0 ${isFree ? "text-gray-500" : "text-[#df7224]"}`}>
                    {isFree ? "Gratis" : `+${OrderDomain.formatPrice(mp.additionalCost)}`}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5 truncate">{mp.description}</p>

                {mp.mapUrl && (
                  <a
                    href={mp.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-[#df7224] hover:underline mt-1.5 font-medium"
                  >
                    <span>Lihat di peta</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MeetingPointSelector;