"use client";

import { MEETING_POINTS, OrderDomain } from "../../lib/Order";

export default function MeetingPointSelector({ selectedId, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2.5 mb-5">
        <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        Meeting Point
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {MEETING_POINTS.map((mp) => {
          const isSelected = selectedId === mp.id;
          return (
            <button
              key={mp.id}
              type="button"
              onClick={() => onChange(mp.id)}
              className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected ? "border-[#df7224] bg-orange-50/60" : "border-gray-100 bg-gray-50 hover:border-gray-200"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center bg-[#df7224]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-3 pr-6">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                    isSelected ? "bg-orange-100 text-[#df7224]" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-bold truncate ${isSelected ? "text-[#df7224]" : "text-gray-800"}`}>
                    {mp.label}
                  </p>
                  <p className="text-xs text-gray-400 truncate mt-0.5">{mp.description}</p>
                  <div className="mt-2">
                    {mp.additionalCost === 0 ? (
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-[#df7224] border border-orange-100">
                        Gratis
                      </span>
                    ) : (
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isSelected ? "bg-orange-50 text-[#df7224] border border-orange-100" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        +{OrderDomain.formatPrice(mp.additionalCost)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
