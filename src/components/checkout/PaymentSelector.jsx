"use client";

import { CreditCard, ShieldCheck } from "lucide-react";

const PAYMENT_GROUPS = [
  {
    group: "Virtual Account",
    methods: [
      { id: "bca_va", label: "BCA Virtual Account", tag: "Populer" },
      { id: "mandiri_bill", label: "Mandiri Bill" },
      { id: "bni_va", label: "BNI Virtual Account" },
      { id: "bri_va", label: "BRI Virtual Account" },
    ],
  },
  {
    group: "E-Wallet",
    methods: [
      { id: "gopay", label: "GoPay", tag: "Rekomendasi" },
      { id: "ovo", label: "OVO" },
      { id: "dana", label: "DANA" },
      { id: "shopeepay", label: "ShopeePay" },
    ],
  },
  {
    group: "Kartu Kredit / Debit",
    methods: [
      { id: "credit_card", label: "Visa / Mastercard / JCB", tag: "Cicilan 0%" },
    ],
  },
  {
    group: "Lainnya",
    methods: [
      { id: "qris", label: "QRIS", tag: "Semua E-Wallet" },
    ],
  },
];

const PaymentSelector = ({ selected, onChange }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6">
      <h3 className="text-base font-bold text-gray-900 flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fef5ef] text-[#df7224]">
          <CreditCard size={18} />
        </div>
        <span>Metode Pembayaran</span>
      </h3>

      <div className="space-y-6">
        {PAYMENT_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {group.group}
            </p>
            <div className="space-y-2">
              {group.methods.map((method) => {
                const isSelected = selected === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => onChange(method.id)}
                    className={`w-full flex items-center gap-3.5 p-3.5 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? "border-[#df7224] bg-[#fef5ef]"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "border-[#df7224]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-[#df7224]" />}
                    </div>

                    <span
                      className={`flex-1 text-xs sm:text-sm font-semibold ${
                        isSelected ? "text-[#df7224]" : "text-gray-900"
                      }`}
                    >
                      {method.label}
                    </span>

                    {method.tag && (
                      <span
                        className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full ${
                          isSelected
                            ? "bg-[#df7224] text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {method.tag}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
        <ShieldCheck size={20} className="text-[#df7224] shrink-0" />
        <div>
          <p className="text-xs font-bold text-gray-900">Transaksi Aman & Terenkripsi</p>
          <p className="text-[11px] text-gray-500">SSL 256-bit · Gateway Resmi Midtrans</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelector;
