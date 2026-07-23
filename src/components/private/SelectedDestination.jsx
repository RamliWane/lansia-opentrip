export default function SelectedDestination({
    destination,
    onClear,
}) {
    return (
        <div className="flex items-center gap-3 p-3 rounded-xl border"
      style={{ borderColor: `${A}40`, backgroundColor: `${A}08` }}>
      <img
        src={form.selectedDestinasi.image}
        alt={form.selectedDestinasi.title}
        className="w-14 h-14 rounded-xl object-cover shrink-0"
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-gray-800 truncate">
          {form.selectedDestinasi.title}
        </p>

        <p className="text-xs text-gray-500 mt-0.5">
          {form.selectedDestinasi.location}
        </p>

        <p
          className="text-xs font-semibold mt-0.5"
          style={{ color: A }}
        >
          ★ {form.selectedDestinasi.rating.toFixed(1)}
          &nbsp;·&nbsp;
          mulai {formatRupiah(form.selectedDestinasi.priceMin)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => set("selectedDestinasi", null)}
        className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors shrink-0"
      >
        ...
      </button>
    </div>
    );
}