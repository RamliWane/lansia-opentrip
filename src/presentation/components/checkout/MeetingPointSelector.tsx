"use client";

import { MEETING_POINTS, OrderDomain } from "@/domain/entities/Order";

interface Props {
  selectedId: string;
  onChange: (id: string) => void;
}

export default function MeetingPointSelector({ selectedId, onChange }: Props) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
        <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#df722415" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        Meeting Point
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {MEETING_POINTS.map((mp) => {
          const isSelected = selectedId === mp.id;
          return (
            <button
              key={mp.id}
              type="button"
              onClick={() => onChange(mp.id)}
              className="relative text-left p-4 rounded-xl border transition-all duration-200"
              style={isSelected
                ? { borderColor: "#df7224", backgroundColor: "#df722408" }
                : { borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }
              }
            >
              {/* Selected check */}
              {isSelected && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#df7224" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}

              <div className="flex items-start gap-2.5 pr-6">
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={isSelected
                    ? { backgroundColor: "#df722415", color: "#df7224" }
                    : { backgroundColor: "#f3f4f6", color: "#9ca3af" }
                  }
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p
                    className="text-xs font-bold truncate"
                    style={isSelected ? { color: "#df7224" } : {}}
                  >
                    {mp.label}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate mt-0.5">{mp.description}</p>
                  <div className="mt-1.5">
                    {mp.additionalCost === 0 ? (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border"
                        style={{ backgroundColor: "#df722410", color: "#df7224", borderColor: "#df722430" }}
                      >
                        Gratis
                      </span>
                    ) : (
                      <span
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold"
                        style={isSelected
                          ? { backgroundColor: "#df722410", color: "#df7224", border: "1px solid #df722430" }
                          : { backgroundColor: "#f3f4f6", color: "#6b7280" }
                        }
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
