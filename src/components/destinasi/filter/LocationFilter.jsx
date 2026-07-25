"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

const LocationFilter = ({ allLocations, selectedLocation, setSelectedLocation }) => {
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  return (
    <div className="space-y-2.5">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
        <MapPin size={14} className="text-primary" />
        <span>Lokasi</span>
      </label>

      <div className="relative">
        <button
          type="button"
          onClick={() => setIsLocationOpen(!isLocationOpen)}
          className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        >
          <span className={selectedLocation ? "text-gray-900" : "text-gray-400"}>
            {selectedLocation || "Semua Lokasi"}
          </span>
          <ChevronDown
            size={15}
            className={`text-gray-400 transition-transform duration-200 ${isLocationOpen ? "rotate-180" : ""}`}
          />
        </button>

        {isLocationOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsLocationOpen(false)}
            />
            <div className="absolute left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-lg shadow-md z-20 max-h-52 overflow-y-auto py-1">
              <button
                type="button"
                onClick={() => {
                  setSelectedLocation("");
                  setIsLocationOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                  selectedLocation === ""
                    ? "bg-primary text-white"
                    : "text-gray-700 hover:bg-primary-light hover:text-primary"
                }`}
              >
                Semua Lokasi
              </button>
              {allLocations.map((loc) => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                    selectedLocation === loc
                      ? "bg-primary text-white"
                      : "text-gray-700 hover:bg-primary-light hover:text-primary"
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {["Semua", ...allLocations.slice(0, 4).map((l) => l.split(",")[0])].map((label, i) => {
          const fullLoc = i === 0 ? "" : allLocations[i - 1];
          const active = i === 0 ? selectedLocation === "" : selectedLocation === fullLoc;
          return (
            <button
              key={label}
              type="button"
              onClick={() => setSelectedLocation(i === 0 ? "" : fullLoc)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                active
                  ? "bg-primary border-primary text-white"
                  : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default LocationFilter;
