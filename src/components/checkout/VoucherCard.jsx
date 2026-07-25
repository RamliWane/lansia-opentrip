"use client";

import { useState } from "react";
import { Ticket, Check, X, ChevronDown, AlertCircle } from "lucide-react";
import { AVAILABLE_VOUCHERS, OrderDomain } from "@/lib/Order";

const VoucherCard = ({
  voucherCode,
  appliedVoucher,
  voucherError,
  onCodeChange,
  onApply,
  onRemove,
  subtotal,
}) => {
  const [showList, setShowList] = useState(false);

  const handleQuickApply = (code) => {
    onCodeChange(code);
    setShowList(false);
    setTimeout(() => onApply(), 50);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6">
      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fef5ef] text-[#df7224]">
          <Ticket size={18} />
        </div>
        <span>Voucher & Diskon</span>
      </h3>

      {appliedVoucher ? (
        <div className="flex items-center justify-between p-4 rounded-xl border border-[#df7224]/30 bg-[#fef5ef]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#df7224] text-white shrink-0">
              <Check size={18} strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-sm font-bold font-mono text-gray-900">{appliedVoucher.code}</p>
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
              className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              aria-label="Hapus voucher"
            >
              <X size={16} />
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
              className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-mono font-semibold text-gray-900 bg-white border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224] focus:border-transparent transition-all ${
                voucherError ? "border-red-300" : "border-gray-300"
              }`}
            />
            <button
              type="button"
              onClick={onApply}
              disabled={!voucherCode.trim()}
              className="px-5 py-2.5 rounded-xl text-white text-sm font-medium bg-[#df7224] hover:bg-[#c8601b] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0 cursor-pointer"
            >
              Gunakan
            </button>
          </div>
          {voucherError && (
            <p className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={13} />
              <span>{voucherError}</span>
            </p>
          )}
        </>
      )}

      {!appliedVoucher && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowList(!showList)}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#df7224] hover:underline cursor-pointer"
          >
            <Ticket size={14} />
            <span>{showList ? "Sembunyikan voucher" : `Lihat voucher tersedia (${AVAILABLE_VOUCHERS.length})`}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showList ? "rotate-180" : ""}`} />
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
                      eligible
                        ? "border-gray-200 bg-gray-50 hover:bg-[#fef5ef] hover:border-[#df7224]/30 cursor-pointer"
                        : "border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${eligible ? "bg-[#fef5ef] text-[#df7224]" : "bg-gray-100 text-gray-400"}`}>
                        <Ticket size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 font-mono">{v.code}</p>
                        <p className="text-[11px] text-gray-500">{v.label}</p>
                        {!eligible && <p className="text-[10px] text-red-500 mt-0.5">Min. {OrderDomain.formatPrice(v.minOrder)}</p>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-xs font-bold ${eligible ? "text-[#df7224]" : "text-gray-400"}`}>
                        {v.type === "percentage" ? `${v.percentageValue}% Off` : `−${OrderDomain.formatPrice(v.discount)}`}
                      </span>
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
};

export default VoucherCard;
