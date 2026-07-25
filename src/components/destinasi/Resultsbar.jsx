"use client";

import { SlidersHorizontal } from "lucide-react";

const ResultsBar = ({ count, hasActiveFilters, onReset }) => {
  return (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <SlidersHorizontal size={16} className="text-[#df7224]" />
        <span className="text-sm font-semibold text-gray-800">
          {count} destinasi ditemukan
        </span>
      </div>
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="text-xs font-semibold text-[#df7224] hover:text-[#c8601b] underline transition-colors"
        >
          Reset filter
        </button>
      )}
    </div>
  );
};

export default ResultsBar;