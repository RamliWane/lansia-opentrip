"use client";

import { OrderDomain } from "../../lib/Order";

export default function PriceBreakdown({ pricePerPax, pax, ticketSubtotal, meetingPointFee, serviceFee, discount, total, appliedVoucher }) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-start text-sm">
        <div>
          <p className="text-gray-600">Tiket wisata</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {OrderDomain.formatPrice(pricePerPax)} × {pax} peserta
          </p>
        </div>
        <span className="font-semibold text-gray-700">{OrderDomain.formatPrice(ticketSubtotal)}</span>
      </div>

      {meetingPointFee > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Biaya antar jemput</span>
          <span className="font-semibold text-gray-700">+{OrderDomain.formatPrice(meetingPointFee)}</span>
        </div>
      )}

      <div className="flex justify-between items-center text-sm">
        <span className="text-gray-600">Biaya layanan</span>
        <span className="font-semibold text-gray-700">{OrderDomain.formatPrice(serviceFee)}</span>
      </div>

      {discount > 0 && appliedVoucher && (
        <div className="flex justify-between items-center text-sm p-3 rounded-xl border bg-orange-50 border-orange-100">
          <div className="flex items-center gap-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <span className="font-bold text-[#df7224]">{appliedVoucher.code}</span>
              <p className="text-[10px] text-gray-400">{appliedVoucher.label}</p>
            </div>
          </div>
          <span className="font-bold text-[#df7224]">−{OrderDomain.formatPrice(discount)}</span>
        </div>
      )}

      <div className="border-t border-gray-100 pt-3 flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-gray-700">Total Pembayaran</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {OrderDomain.formatPrice(Math.round(total / pax))} / peserta
          </p>
        </div>
        <span className="text-xl font-bold text-gray-900">{OrderDomain.formatPrice(total)}</span>
      </div>

      <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-100 rounded-xl">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.2" className="shrink-0">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <p className="text-xs text-[#c3611c] font-semibold">
          Dapatkan cashback <strong>Rp 25.000</strong> poin rewards
        </p>
      </div>
    </div>
  );
}
