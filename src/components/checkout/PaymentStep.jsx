"use client";

import { MEETING_POINTS } from "../../lib/Order";
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

  const rows = [
    { label: "ID Pesanan", value: <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-lg bg-orange-50 text-[#df7224]">{orderId}</span> },
    { label: "Tanggal Wisata", value: formatDate(travelDate) },
    { label: "Jumlah Peserta", value: `${pax} orang` },
    { label: "Meeting Point", value: meetingPoint?.label ?? "—" },
    { label: "Pemesan", value: customer.fullName },
    { label: "Email", value: customer.email },
    { label: "No. HP", value: customer.phone },
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2.5 mb-5">
            <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
            </span>
            Ringkasan Pesanan
          </h3>

          {destination && (
            <div className="flex gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100 mb-4">
              <img src={destination.image} alt={destination.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm leading-snug">{destination.title}</p>
                <p className="text-xs mt-1 flex items-center gap-1 text-[#df7224]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {destination.location}
                </p>
                <p className="text-xs font-semibold mt-1 text-[#df7224]">★ {destination.rating}</p>
              </div>
            </div>
          )}

          <div className="divide-y divide-gray-50">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex justify-between items-center py-2.5 text-sm">
                <span className="text-gray-500">{label}</span>
                <span className="font-semibold text-gray-800 text-right max-w-[55%] break-all">{value}</span>
              </div>
            ))}
          </div>

          {participants.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5">Peserta ({participants.length})</p>
              <div className="space-y-2">
                {participants.map((p, i) => (
                  <div key={p.id} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 bg-orange-50 text-[#df7224]">
                      {i + 1}
                    </div>
                    <p className="text-sm font-semibold text-gray-700 flex-1 truncate">{p.fullName || `Peserta ${i + 1}`}</p>
                    <span className="text-xs text-gray-400">
                      {p.gender === "male" ? "Laki-laki" : p.gender === "female" ? "Perempuan" : "—"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {customer.specialRequest && (
            <div className="mt-4 p-3 rounded-xl bg-orange-50 border border-orange-100">
              <p className="text-xs font-bold text-[#df7224] uppercase tracking-wider mb-1">Permintaan Khusus</p>
              <p className="text-sm text-[#c3611c]">{customer.specialRequest}</p>
            </div>
          )}

          <button
            onClick={onBack}
            disabled={isLoading}
            className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-[#df7224] transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Ubah detail perjalanan
          </button>
        </div>

        <PaymentSelector selected={paymentMethod} onChange={setPaymentMethod} />

        {error && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" className="shrink-0 mt-0.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <div>
              <p className="text-sm font-bold text-red-700">Pembayaran Gagal</p>
              <p className="text-xs text-red-500 mt-0.5">{error}</p>
            </div>
          </div>
        )}
      </div>

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
