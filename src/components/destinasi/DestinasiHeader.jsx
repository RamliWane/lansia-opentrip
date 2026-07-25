"use client";

import SearchBar from "./SearchBar";

const DestinasiHeader = ({ search, setSearch }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <span className="text-[#df7224] font-semibold text-xs uppercase tracking-wider block mb-2">
        JELAJAHI INDONESIA
      </span>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
        Katalog Destinasi <span className="text-[#df7224]">Open Trip</span>
      </h1>
      <SearchBar
        searchQuery={search}
        onSearchChange={setSearch}
        onClear={() => setSearch("")}
      />
    </div>
  );
};

export default DestinasiHeader;