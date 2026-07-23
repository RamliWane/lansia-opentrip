export function formatRupiah(v) {
  if (!v && v !== 0) return "";

  return (
    "Rp " +
    Math.floor(v)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

export function inputCls(error, extra = "") {
  return [
    "w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold",
    "focus:outline-none focus:ring-2 transition-all",
    error
      ? "border-red-300 bg-white focus:border-red-400 focus:ring-red-100"
      : "border-gray-200 bg-gray-50 focus:border-[#df7224] focus:ring-[#df7224]/10",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
}