"use client";

import { useCheckout } from "../../../application/hooks/useCheckout";
import { MEETING_POINTS } from "../../../domain/entities/Order";
import PaymentSelector from "./PaymentSelector";
import BookingSummary from "./BookingSummary";



function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });
}

export default function PaymentStep({ checkout, onPay, onBack }) {
  const {
    destination, pax, travelDate, customer, participants, orderId,
    meetingPointId, paymentMethod, ticketSubtotal, meetingPointFee,
    serviceFee, discount, total, appliedVoucher, agreeToTerms,
    isLoading, error, setPaymentMethod, setAgreeToTerms,
  } = checkout;

  const meetingPoint = MEETING_POINTS.find((m) => m.id === meetingPointId);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      {/* ── Left ─────────────────────────────────────────── */}
      <div className="space-y-5">

        {/* Order review */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-4">
            <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#df722415" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            Ringkasan Pesanan
          </h3>

          {/* Destination row */}
          {destination && (
            <div className="flex gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-zinc-800/50 border border-gray-100 dark:border-zinc-700/50 mb-4">
              <img src={destination.image} alt={destination.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 dark:text-white text-sm leading-snug">{destination.title}</p>
                <p className="text-[11px] mt-0.5 flex items-center gap-1" style={{ color: "#df7224" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {destination.location}
                </p>
                <p className="text-[11px] text-amber-500 font-semibold mt-0.5">★ {destination.rating}</p>
              </div>
            </div>
          )}

          {/* Detail rows */}
          <div className="divide-y divide-gray-50 dark:divide-zinc-800">
            {[
              {
                label: "ID Pesanan",
                value: (
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg"
                    style={{ backgroundColor: "#df722415", color: "#df7224" }}
                  >
                    {orderId}
                  </span>
                ),
              },
              { label: "Tanggal Wisata", value: formatDate(travelDate) },
              { label: "Jumlah Peserta", value: `${pax} orang` },
              { label: "Meeting Point", value: meetingPoint?.label ?? "—" },
              { label: "Pemesan", value: customer.fullName },
              { label: "Email", value: customer.email },
              { label: "No. HP", value: customer.phone },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2 text-xs">
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200 text-right max-w-[55%] break-all">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Participants */}
          {participants.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-zinc-800">
              <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">
                Peserta ({participants.length})
              </p>
              <div className="space-y-1.5">
                {participants.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                      style={{ backgroundColor: "#df722415", color: "#df7224" }}
                    >
                      {i + 1}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex-1 truncate">
                      {p.fullName || `Peserta ${i + 1}`}
                    </p>
                    <span className="text-[10px] text-gray-400">
                      {p.gender === "male" ? "Laki-laki" : p.gender === "female" ? "Perempuan" : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special request */}
          {customer.specialRequest && (
            <div className="mt-3 p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50">
              <p className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-0.5">
                Permintaan Khusus
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-300">{customer.specialRequest}</p>
            </div>
          )}

          <button
            onClick={onBack}
            disabled={isLoading}
            className="mt-4 flex items-center gap-1 text-xs font-semibold text-gray-400 transition-colors"
            onMouseEnter={e => (e.currentTarget ).style.color = "#df7224"}
            onMouseLeave={e => (e.currentTarget ).style.color = ""}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Ubah detail perjalanan
          </button>
        </div>

        {/* Payment selector */}
        <PaymentSelector selected={paymentMethod} onChange={setPaymentMethod} />

        {/* Error */}
        {error && (
          <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-500/30 flex items-start gap-2.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-bold text-red-700 dark:text-red-400">Pembayaran Gagal</p>
              <p className="text-xs text-red-500 mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* ── Right: Summary ────────────────────────────────── */}
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
          isValid={!!paymentMethod}
          isLoading={isLoading}
          agreeToTerms={agreeToTerms}
          onAgreeChange={setAgreeToTerms}
          onContinue={onPay}
          ctaLabel="Bayar Sekarang"
          step="payment"
        />
      </div>
    </div>
  );
}
