"use client";

import { Star } from "lucide-react";

const ratingOptions = [
  { value: 0, label: "Semua" },
  { value: 4.0, label: "4.0+" },
  { value: 4.5, label: "4.5+" },
  { value: 4.8, label: "4.8+" },
];

const RatingFilter = ({ minRating, setMinRating }) => {
  return (
    <div className="space-y-2.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        <Star size={14} className="text-primary" />
        <span>Rating Minimum</span>
      </label>
      <div className="grid grid-cols-2 gap-2">
        {ratingOptions.map(({ value, label }) => {
          const active = minRating === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => setMinRating(value)}
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
                active
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Star
                size={12}
                className={active ? "text-white fill-white" : "text-primary fill-primary"}
              />
              <span>{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default RatingFilter;
