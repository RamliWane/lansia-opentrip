"use client";

import { DollarSign } from "lucide-react";
import { formatRupiah } from "@/lib/format";

const PriceFilter = ({ priceMin, setPriceMin, priceMax, setPriceMax }) => {
  return (
    <div className="space-y-2.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        <DollarSign size={14} className="text-primary" />
        <span>Range Harga (Rp)</span>
      </label>

      <div className="space-y-3">
        <div className="space-y-1">
          <span className="text-[11px] font-medium text-gray-500">Harga Minimal</span>
          <input
            type="number"
            placeholder="Contoh: 200000"
            value={priceMin}
            onChange={(e) => setPriceMin(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-[10px] pl-1 font-medium text-primary">
            {priceMin !== "" ? formatRupiah(priceMin) : "Tanpa batas minimal"}
          </p>
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-medium text-gray-500">Harga Maksimal</span>
          <input
            type="number"
            placeholder="Contoh: 2000000"
            value={priceMax}
            onChange={(e) => setPriceMax(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-xs font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          />
          <p className="text-[10px] pl-1 font-medium text-primary">
            {priceMax !== "" ? formatRupiah(priceMax) : "Tanpa batas maksimal"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
