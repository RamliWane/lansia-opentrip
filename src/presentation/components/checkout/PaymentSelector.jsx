"use client";

import { PaymentMethodType } from "../../../domain/entities/Order";



const PAYMENT_GROUPS: { group; methods: PaymentOption[] }[] = [
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
      { id: "gopay", label: "GoPay", tag: "Cashback 5%" },
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
      { id: "qris", label: "QRIS", tag: "Semua e-wallet" },
    ],
  },
];



export default function PaymentSelector({ selected, onChange }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2 mb-5">
        <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#df722415" }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </span>
        Metode Pembayaran
      </h3>

      <div className="space-y-5">
        {PAYMENT_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-extrabold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-2">
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
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200"
                    style={isSelected
                      ? { borderColor: "#df7224", backgroundColor: "#df722408" }
                      : { borderColor: "#e5e7eb", backgroundColor: "#f9fafb" }
                    }
                  >
                    {/* Radio */}
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all"
                      style={{ borderColor: isSelected ? "#df7224" : "#d1d5db" }}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#df7224" }} />
                      )}
                    </div>

                    <span
                      className="flex-1 text-xs font-semibold"
                      style={isSelected ? { color: "#df7224" } : { color: "#374151" }}
                    >
                      {method.label}
                    </span>

                    {method.tag && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={isSelected
                          ? { backgroundColor: "#df722415", color: "#df7224", border: "1px solid #df722830" }
                          : { backgroundColor: "#f3f4f6", color: "#6b7280" }
                        }
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

      {/* Security badge */}
      <div
        className="mt-5 flex items-center gap-2 p-2.5 rounded-xl border"
        style={{ backgroundColor: "#df722408", borderColor: "#df722820" }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5" className="shrink-0">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <p className="text-[10px] font-extrabold" style={{ color: "#df7224" }}>Transaksi Aman & Terenkripsi</p>
          <p className="text-[9px] text-gray-400">SSL 256-bit · Powered by Midtrans · PCI DSS Compliant</p>
        </div>
      </div>
    </div>
  );
}
