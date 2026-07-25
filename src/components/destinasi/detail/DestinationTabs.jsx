const TABS = [
  { id: "tentang", label: "Deskripsi" },
  { id: "itinerary", label: "Itinerary" },
  { id: "meeting", label: "Titik Kumpul" },
  { id: "ulasan", label: "Ulasan" }
];

const DestinationTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex overflow-x-auto border-b border-gray-200 bg-white mb-8 sticky top-16 z-30 pt-4">
      {TABS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`px-5 py-3 font-semibold text-sm whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
            activeTab === id
              ? "text-primary border-primary"
              : "border-transparent text-gray-500 hover:text-primary"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default DestinationTabs;
export { TABS };