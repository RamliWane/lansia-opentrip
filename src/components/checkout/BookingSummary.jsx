"use client";

import { MEETING_POINTS } from "../../lib/Order";
import PriceBreakdown from "./PriceBreakdown";

export default function BookingSummary({
  destination, travelDate, pax, meetingPointId,
  ticketSubtotal, meetingPointFee, serviceFee, discount, total,
  appliedVoucher, isValid, isLoading, agreeToTerms, onAgreeChange,
  onContinue, ctaLabel = "Lanjutkan", step,
}) {
  const meetingPoint = MEETING_POINTS.find((m) => m.id === meetingPointId);
  const canContinue = isValid && !isLoading && agreeToTerms;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden sticky top-24">
      <div className="px-5 py-4 border-b border-gray-100">
      <h3 className="text-[15px] font-semibold text-gray-800">Ringkasan Pesanan</h3>
    </div>

      <div className="px-5 pt-4 pb-3">
        {destination ? (
          <>
            <div className="flex gap-3 items-center">
              <img src={destination.image} alt={destination.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 line-clamp-2 leading-snug">{destination.title}</p>
                <p className="text-xs mt-1 flex items-center gap-1 text-[#df7224]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {destination.location}
                </p>
                <p className="text-xs font-semibold mt-1 text-[#df7224]">
                  ★ {destination.rating} ({destination.reviewCount.toLocaleString("id-ID")} ulasan)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 mt-4">
              {travelDate && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-600">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {new Date(travelDate).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              )}
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-600">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {pax} peserta
              </span>
              {meetingPoint && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 text-[10px] font-semibold text-gray-600">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {meetingPoint.label}
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="h-16 rounded-xl bg-gray-100 animate-pulse" />
        )}
      </div>

      <div className="border-t border-dashed border-gray-100 mx-5" />

      <div className="px-5 py-4">
        <PriceBreakdown
          pricePerPax={destination?.priceMin ?? 0}
          pax={pax}
          ticketSubtotal={ticketSubtotal}
          meetingPointFee={meetingPointFee}
          serviceFee={serviceFee}
          discount={discount}
          total={total}
          appliedVoucher={appliedVoucher}
        />
      </div>

      {step !== "confirmation" && (
        <div className="px-5 pb-5 space-y-3.5 border-t border-gray-100 pt-4">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <div
              onClick={() => onAgreeChange(!agreeToTerms)}
              className={`w-5 h-5 mt-0.5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                agreeToTerms ? "bg-[#df7224] border-[#df7224]" : "border-gray-300"
              }`}
            >
              {agreeToTerms && (
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-xs text-gray-500 leading-relaxed">
              Saya menyetujui{" "}
              <a href="#" className="underline font-semibold text-[#df7224]">Syarat & Ketentuan</a>
              {" "}dan{" "}
              <a href="#" className="underline font-semibold text-[#df7224]">Kebijakan Privasi</a>
            </span>
          </label>

          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-[0.98] ${
              canContinue ? "bg-[#df7224] text-white hover:bg-[#c3611c] shadow-sm shadow-[#df7224]/30" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                {ctaLabel}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </>
            )}
          </button>

          {!isValid && destination && (
            <p className="text-xs text-center text-gray-400">Lengkapi semua kolom wajib (*) untuk melanjutkan</p>
          )}
          {isValid && !agreeToTerms && (
            <p className="text-xs text-center text-gray-400">Centang persetujuan syarat & ketentuan dahulu</p>
          )}
        </div>
      )}
    </div>
  );
}