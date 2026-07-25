import Link from "next/link";
import { CheckCircle2, ShieldCheck, HeartHandshake } from "lucide-react";
import { formatRupiah } from "@/lib/format";

const BookingCard = ({ dest }) => {
  const { id, priceMin } = dest;

  return (
    <div className="sticky top-28 bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col gap-6">
      <div className="pb-6 border-b border-gray-100">
        <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider block mb-1">
          Mulai dari
        </span>
        <div className="text-3xl font-bold text-primary">
          {formatRupiah(priceMin)}
        </div>
        <p className="text-xs text-gray-500 mt-1">Per orang / pax (Fasilitas Lengkap)</p>
      </div>

      <div>
        <Link href={`/checkout?destination=${id}`} className="block w-full">
          <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-semibold text-sm transition-colors cursor-pointer">
            Pesan Sekarang
          </button>
        </Link>
        <p className="text-center text-xs text-gray-400 mt-3">
          Konfirmasi instan & pembayaran terenkripsi aman
        </p>
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-2.5 text-xs font-medium text-gray-700">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={16} className="text-primary shrink-0" />
          <span>Fasilitas Ramah Lansia</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck size={16} className="text-primary shrink-0" />
          <span>Pendampingan Medis & Guide Sabar</span>
        </div>
        <div className="flex items-center gap-2">
          <HeartHandshake size={16} className="text-primary shrink-0" />
          <span>Bebas Reschedule (H-3)</span>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;