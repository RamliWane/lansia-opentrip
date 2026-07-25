"use client";

import { useState, useMemo } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import LocationFilter from "./filter/LocationFilter";
import PriceFilter from "./filter/PriceFilter";
import RatingFilter from "./filter/RatingFilter";

const FilterPanel = ({
  destinations,
  selectedLocation,
  setSelectedLocation,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
  minRating,
  setMinRating,
  onResetAll,
  hasActiveFilters,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const allLocations = useMemo(
    () => [...new Set(destinations.map((d) => d.location))],
    [destinations]
  );

  const activeCount = [
    selectedLocation !== "",
    priceMin !== "",
    priceMax !== "",
    minRating > 0,
  ].filter(Boolean).length;

  return (
    <aside className="w-full">
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex items-center justify-between w-full p-4 rounded-xl bg-white border border-gray-200 font-semibold text-sm shadow-sm"
        >
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <span className="text-gray-900">Filter Destinasi</span>
            {activeCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </div>
          {isMobileOpen ? (
            <ChevronUp size={18} className="text-gray-400" />
          ) : (
            <ChevronDown size={18} className="text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`bg-white rounded-xl border border-gray-200 shadow-sm overflow-visible ${
          isMobileOpen ? "block" : "hidden lg:block"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-primary" />
            <h2 className="text-sm font-bold text-gray-900">Filter</h2>
            {activeCount > 0 && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                {activeCount} aktif
              </span>
            )}
          </div>
          {hasActiveFilters && (
            <button
              onClick={onResetAll}
              className="text-xs font-semibold flex items-center gap-1 text-primary hover:text-primary-dark transition-colors"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>

        <div className="p-5 space-y-6">
          <LocationFilter
            allLocations={allLocations}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />

          <hr className="border-gray-100" />

          <PriceFilter
            priceMin={priceMin}
            setPriceMin={setPriceMin}
            priceMax={priceMax}
            setPriceMax={setPriceMax}
          />

          <hr className="border-gray-100" />

          <RatingFilter minRating={minRating} setMinRating={setMinRating} />

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetAll}
              className="w-full py-2.5 px-4 rounded-lg text-red-600 text-xs font-semibold border border-red-200 bg-red-50 hover:bg-red-100 transition-colors"
            >
              Hapus Semua Filter
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMobileOpen(false)}
            className="lg:hidden w-full py-2.5 px-4 rounded-lg text-white text-xs font-medium bg-primary hover:bg-primary-dark transition-colors"
          >
            Terapkan Filter
          </button>
        </div>
      </div>
    </aside>
  );
};

export default FilterPanel;
