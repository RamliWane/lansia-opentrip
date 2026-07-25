import { formatRupiah as libFormatRupiah } from "@/lib/format";

export const formatRupiah = (v) => {
  if (!v && v !== 0) return "";
  return libFormatRupiah(v);
};

export const inputCls = (error, extra = "") => {
  return [
    "w-full px-3.5 py-2.5 rounded-lg border text-sm font-normal text-gray-900 placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 transition-colors",
    error
      ? "border-red-300 bg-white focus:border-red-500 focus:ring-red-100"
      : "border-gray-300 bg-white focus:border-primary focus:ring-primary/20",
    extra,
  ]
    .filter(Boolean)
    .join(" ");
};