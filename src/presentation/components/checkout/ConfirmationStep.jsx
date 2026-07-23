"use client";

import { MEETING_POINTS, OrderDomain } from "../../../domain/entities/Order";
import BookingSummary from "./BookingSummary";



function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function ConfirmationStep({ checkout, onReset }) {
  const {
    destination, pax, travelDate, customer, orderId, meetingPointId,
    ticketSubtotal, meetingPointFee, serviceFee, discount, total,
    appliedVoucher, agreeToTerms,
  } = checkout;

  const meetingPoint = MEETING_POINTS.find((m) => m.id === meetingPointId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      {/* ── Left ─────────────────────────────────────────── */}
      <div className="space-y-5">

        {/* Success card */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden animate-scale-up">
          {/* Accent banner */}
          <div className="p-8 flex flex-col items-center text-center relative overflow-hidden" style={{ backgroundColor: "#df7224" }}>
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative w-[72px] h-[72px] rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-4 shadow-xl">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-extrabold text-white mb-1">Pemesanan Berhasil!</h2>
            <p className="text-white/80 text-sm max-w-xs">
              E-tiket dikirim ke <strong className="text-white">{customer.email}</strong>
            </p>

            <div className="mt-5 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl px-5 py-2.5">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">ID Pesanan</p>
              <p className="text-white font-extrabold text-base tracking-widest font-mono">{orderId}</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-5 space-y-4">
            {/* Destination */}
            {destination && (
              <div className="flex gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50">
                <img src={destination.image} alt={destination.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm">{destination.title}</p>
                  <p className="text-[11px] mt-0.5" style={{ color: "#df7224" }}>{destination.location}</p>
                  <p className="text-[11px] text-amber-500 font-semibold mt-0.5">★ {destination.rating}</p>
                </div>
              </div>
            )}

            {/* Details */}
            <div className="divide-y divide-gray-50 dark:divide-zinc-800">
              {[
                { icon: "📅", label: "Tanggal Wisata", value: formatDate(travelDate) },
                { icon: "👥", label: "Jumlah Peserta", value: `${pax} orang` },
                { icon: "📍", label: "Meeting Point", value: meetingPoint?.label ?? "—" },
                { icon: "👤", label: "Pemesan", value: customer.fullName },
                { icon: "📧", label: "Email", value: customer.email },
                { icon: "📱", label: "No. HP", value: customer.phone },
              ].map(({ icon, label, value }) => (
                <div key={label} className="flex justify-between items-center py-2">
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                    <span>{icon}</span> {label}
                  </span>
                  <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 text-right max-w-[55%] break-all">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div
              className="rounded-xl p-3 flex justify-between items-center border"
              style={{ backgroundColor: "#df722408", borderColor: "#df722825" }}
            >
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">Total Dibayar</span>
              <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                {OrderDomain.formatPrice(total)}
              </span>
            </div>
          </div>
        </div>

        {/* Next steps */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">Langkah Selanjutnya</h3>
          <div className="space-y-3">
            {[
              { num: 1, text: "E-tiket dikirim ke email Anda dalam 5 menit" },
              { num: 2, text: "Tim kami menghubungi Anda 24 jam sebelum perjalanan" },
              { num: 3, text: "Simpan ID pesanan untuk keperluan check-in" },
            ].map(({ num, text }) => (
              <div key={num} className="flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0"
                  style={{ backgroundColor: "#df722415", color: "#df7224" }}
                >
                  {num}
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-xl text-white font-extrabold text-sm active:scale-95 transition-all"
            style={{ backgroundColor: "#df7224" }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#c8631e"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "#df7224"}
          >
            Pesan Destinasi Lain
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3 rounded-xl bg-white dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300 font-bold text-sm border border-gray-200 dark:border-zinc-700 transition-all flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Cetak / Simpan PDF
          </button>
        </div>
      </div>

      {/* ── Right: Summary (read-only) ───────────────────── */}
      <div>
        <BookingSummary
          destination={destination}
          travelDate={travelDate}
          pax={pax}
          meetingPointId={meetingPointId}
          ticketSubtotal={ticketSubtotal}
          meetingPointFee={meetingPointFee}
          serviceFee={serviceFee}
          discount={discount}
          total={total}
          appliedVoucher={appliedVoucher}
          isValid={true}
          isLoading={false}
          agreeToTerms={agreeToTerms}
          onAgreeChange={() => {}}
          onContinue={() => {}}
          step="confirmation"
        />
      </div>
    </div>
  );
}
