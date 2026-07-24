"use client";

import { useState } from "react";
import { AVAILABLE_VOUCHERS, OrderDomain } from "../../lib/Order";

export default function VoucherCard({ voucherCode, appliedVoucher, voucherError, onCodeChange, onApply, onRemove, subtotal }) {
  const [showList, setShowList] = useState(false);

  const handleQuickApply = (code) => {
    onCodeChange(code);
    setShowList(false);
    setTimeout(() => onApply(), 50);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2.5 mb-5">
        <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
            <line x1="7" y1="7" x2="7.01" y2="7" />
          </svg>
        </span>
        Voucher / Promo
      </h3>

      {appliedVoucher ? (
        <div className="flex items-center justify-between p-4 rounded-xl border border-orange-100 bg-orange-50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-orange-100 text-[#df7224] shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold font-mono text-[#df7224]">{appliedVoucher.code}</p>
              <p className="text-xs text-gray-500">{appliedVoucher.label}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-[#df7224]">
              {appliedVoucher.type === "percentage"
                ? `−${appliedVoucher.percentageValue}%`
                : `−${OrderDomain.formatPrice(appliedVoucher.discount)}`}
            </span>
            <button
              type="button"
              onClick={onRemove}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Masukkan kode voucher"
              value={voucherCode}
              onChange={(e) => onCodeChange(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && onApply()}
              className={`flex-1 px-3.5 py-3 rounded-xl text-sm font-mono font-bold text-gray-900 bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] focus:bg-white transition-colors ${
                voucherError ? "border-red-300" : "border-transparent"
              }`}
            />
            <button
              type="button"
              onClick={onApply}
              disabled={!voucherCode.trim()}
              className="px-5 py-3 rounded-xl text-white text-sm font-bold bg-[#df7224] hover:bg-[#c3611c] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
            >
              Pakai
            </button>
          </div>
          {voucherError && (
            <p className="mt-2 text-xs text-red-400 flex items-center gap-1">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {voucherError}
            </p>
          )}
        </>
      )}

      {!appliedVoucher && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#df7224]"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
              <line x1="7" y1="7" x2="7.01" y2="7" />
            </svg>
            {showList ? "Sembunyikan voucher" : `Lihat voucher tersedia (${AVAILABLE_VOUCHERS.length})`}
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`transition-transform duration-200 ${showList ? "rotate-180" : ""}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {showList && (
            <div className="mt-3 space-y-2">
              {AVAILABLE_VOUCHERS.map((v) => {
                const eligible = subtotal >= v.minOrder;
                return (
                  <div
                    key={v.code}
                    onClick={() => eligible && handleQuickApply(v.code)}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      eligible ? "border-orange-100 bg-orange-50 cursor-pointer hover:border-[#df7224]/40" : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${eligible ? "bg-orange-100 text-[#df7224]" : "bg-gray-100 text-gray-400"}`}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-800 font-mono">{v.code}</p>
                        <p className="text-[11px] text-gray-500">{v.label}</p>
                        {!eligible && <p className="text-[10px] text-red-400 mt-0.5">Min. {OrderDomain.formatPrice(v.minOrder)}</p>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold ${eligible ? "text-[#df7224]" : "text-gray-400"}`}>
                        {v.type === "percentage" ? `${v.percentageValue}% off` : `−${OrderDomain.formatPrice(v.discount)}`}
                      </span>
                      {eligible && <p className="text-[10px] font-bold mt-0.5 text-[#df7224]">Gunakan →</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
