"use client";

import { Search, TrendingUp, X, ArrowRight } from "lucide-react";

const quickTags = ["Yogyakarta", "Bandung", "Bali", "Toba", "Labuan Bajo"];

const SearchBar = ({ searchQuery, onSearchChange, onClear }) => {
  return (
    <div className="w-full flex flex-col gap-3">
      <div className="relative w-full p-2 sm:p-2.5 rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-200">
        <div className="flex items-center gap-3 w-full">
          <div className="pl-3 shrink-0 text-[#df7224]">
            <Search size={20} />
          </div>

          <input
            type="text"
            placeholder="Cari destinasi atau lokasi wisata..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 text-sm font-normal focus:outline-none py-1.5"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                onSearchChange("");
                onClear?.();
              }}
              className="p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors shrink-0"
              aria-label="Hapus pencarian"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#df7224] hover:bg-[#c8601b] text-white font-medium text-xs sm:text-sm transition-colors shrink-0"
          >
            <span>Cari</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 py-1 text-xs text-gray-500 overflow-x-auto [&::-webkit-scrollbar]:hidden">
        <span className="font-semibold flex items-center gap-1.5 shrink-0 text-[#df7224]">
          <TrendingUp size={14} />
          <span>Populer:</span>
        </span>

        {quickTags.map((tag) => {
          const active = searchQuery.toLowerCase().includes(tag.toLowerCase());
          return (
            <button
              key={tag}
              type="button"
              onClick={() => onSearchChange(tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium shrink-0 transition-colors border ${
                active
                  ? "bg-[#df7224] text-white border-[#df7224]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
