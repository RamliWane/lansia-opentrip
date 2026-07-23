"use client";

import { Voucher, OrderDomain } from "../../../domain/entities/Order";



export default function PriceBreakdown({ pricePerPax, pax, ticketSubtotal, meetingPointFee, serviceFee, discount, total, appliedVoucher }) {
  return (
    <div className="space-y-2.5">
      {/* Ticket */}
      <div className="flex justify-between items-start text-xs">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Tiket wisata</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {OrderDomain.formatPrice(pricePerPax)} × {pax} peserta
          </p>
        </div>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {OrderDomain.formatPrice(ticketSubtotal)}
        </span>
      </div>

      {/* Meeting point fee */}
      {meetingPointFee > 0 && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-gray-600 dark:text-gray-400">Biaya antar jemput</span>
          <span className="font-semibold text-gray-700 dark:text-gray-300">
            +{OrderDomain.formatPrice(meetingPointFee)}
          </span>
        </div>
      )}

      {/* Service fee */}
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-600 dark:text-gray-400">Biaya layanan</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {OrderDomain.formatPrice(serviceFee)}
        </span>
      </div>

      {/* Discount */}
      {discount > 0 && appliedVoucher && (
        <div
          className="flex justify-between items-center text-xs p-2 rounded-xl -mx-1 border"
          style={{ backgroundColor: "#df722808", borderColor: "#df722825" }}
        >
          <div className="flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.8">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div>
              <span className="font-bold" style={{ color: "#df7224" }}>{appliedVoucher.code}</span>
              <p className="text-[9px] text-gray-400">{appliedVoucher.label}</p>
            </div>
          </div>
          <span className="font-bold" style={{ color: "#df7224" }}>
            −{OrderDomain.formatPrice(discount)}
          </span>
        </div>
      )}

      {/* Total */}
      <div className="border-t border-gray-100 dark:border-zinc-800 pt-2.5 flex justify-between items-end">
        <div>
          <p className="text-xs font-bold text-gray-700 dark:text-gray-300">Total Pembayaran</p>
          <p className="text-[10px] text-gray-400 mt-0.5">
            {OrderDomain.formatPrice(Math.round(total / pax))} / peserta
          </p>
        </div>
        <span className="text-lg font-extrabold text-gray-900 dark:text-white">
          {OrderDomain.formatPrice(total)}
        </span>
      </div>

      {/* Cashback hint */}
      <div className="flex items-center gap-1.5 p-2.5 bg-amber-50 dark:bg-amber-900/10 border border-amber-200/50 rounded-xl">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.2" className="shrink-0">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <p className="text-[10px] text-amber-700 dark:text-amber-400 font-semibold">
          Dapatkan cashback <strong>Rp 25.000</strong> poin rewards
        </p>
      </div>
    </div>
  );
}
