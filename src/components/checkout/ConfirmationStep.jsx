"use client";

import { MEETING_POINTS, OrderDomain } from "../../lib/Order";
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

  const detailRows = [
    { icon: "📅", label: "Tanggal Wisata", value: formatDate(travelDate) },
    { icon: "👥", label: "Jumlah Peserta", value: `${pax} orang` },
    { icon: "📍", label: "Meeting Point", value: meetingPoint?.label ?? "—" },
    { icon: "👤", label: "Pemesan", value: customer.fullName },
    { icon: "📧", label: "Email", value: customer.email },
    { icon: "📱", label: "No. HP", value: customer.phone },
  ];

  const nextSteps = [
    "E-tiket dikirim ke email Anda dalam 5 menit",
    "Tim kami menghubungi Anda 24 jam sebelum perjalanan",
    "Simpan ID pesanan untuk keperluan check-in",
  ];

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      <div className="space-y-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-8 sm:p-10 flex flex-col items-center text-center relative overflow-hidden bg-[#df7224]">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />

            <div className="relative w-[72px] h-[72px] rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center mb-4 shadow-xl">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-white mb-1">Pemesanan Berhasil!</h2>
            <p className="text-white/80 text-sm max-w-xs">
              E-tiket dikirim ke <strong className="text-white">{customer.email}</strong>
            </p>

            <div className="mt-5 bg-white/20 backdrop-blur-md border border-white/25 rounded-xl px-5 py-2.5">
              <p className="text-white/70 text-[10px] font-bold uppercase tracking-widest mb-0.5">ID Pesanan</p>
              <p className="text-white font-bold text-base tracking-widest font-mono">{orderId}</p>
            </div>
          </div>

          <div className="p-5 sm:p-6 space-y-4">
            {destination && (
              <div className="flex gap-3 p-3.5 rounded-2xl bg-gray-50 border border-gray-100">
                <img src={destination.image} alt={destination.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{destination.title}</p>
                  <p className="text-xs mt-1 text-[#df7224]">{destination.location}</p>
                  <p className="text-xs font-semibold mt-1 text-[#df7224]">★ {destination.rating}</p>
                </div>
              </div>
            )}

            <div className="divide-y divide-gray-50">
              {detailRows.map(({ icon, label, value }) => (
                <div key={label} className="flex justify-between items-center py-2.5">
                  <span className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{icon}</span> {label}
                  </span>
                  <span className="text-sm font-semibold text-gray-800 text-right max-w-[55%] break-all">{value}</span>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-4 flex justify-between items-center border bg-orange-50 border-orange-100">
              <span className="text-sm font-bold text-gray-800">Total Dibayar</span>
              <span className="text-lg font-bold text-gray-900">{OrderDomain.formatPrice(total)}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
          <h3 className="text-sm font-bold text-gray-800 mb-4">Langkah Selanjutnya</h3>
          <div className="space-y-3.5">
            {nextSteps.map((text, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 bg-orange-50 text-[#df7224]">
                  {i + 1}
                </span>
                <p className="text-sm text-gray-600 leading-relaxed pt-0.5">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onReset}
            className="flex-1 py-3.5 rounded-xl text-white font-bold text-sm bg-[#df7224] hover:bg-[#c3611c] active:scale-95 transition-all"
          >
            Pesan Destinasi Lain
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3.5 rounded-xl bg-white hover:bg-gray-50 text-gray-700 font-semibold text-sm border border-gray-200 transition-all flex items-center justify-center gap-2"
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
