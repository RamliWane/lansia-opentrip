"use client";

import { SlidersHorizontal } from "lucide-react";

const EmptyState = ({ onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-gray-300 bg-white p-6">
      <div className="w-12 h-12 rounded-xl bg-[#fef5ef] text-[#df7224] flex items-center justify-center mb-4">
        <SlidersHorizontal size={22} />
      </div>
      <h3 className="text-sm font-semibold text-gray-900 mb-1">
        Tidak Ada Destinasi Cocok
      </h3>
      <p className="text-xs text-gray-500 mb-6 max-w-xs leading-relaxed">
        Coba sesuaikan kata kunci pencarian atau reset filter yang sedang aktif.
      </p>
      <button
        onClick={onReset}
        className="px-4 py-2 rounded-xl bg-[#df7224] hover:bg-[#c8601b] text-white text-xs font-medium transition-colors shadow-xs"
      >
        Reset Semua Filter
      </button>
    </div>
  );
};

export default EmptyState;