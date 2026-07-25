"use client";

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
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-5">
        <span className="w-6 h-6 rounded-lg flex items-center justify-center ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5">
            <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
            <line x1="1" y1="10" x2="23" y2="10" />
          </svg>
        </span>
        Metode Pembayaran
      </h3>

      <div className="space-y-5">
        {PAYMENT_GROUPS.map((group) => (
          <div key={group.group}>
            <p className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">
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
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 ${
                      isSelected
                        ? "border-[#df7224] bg-[#df7224]/5"
                        : "border-gray-200 bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? "border-[#df7224]" : "border-gray-300"
                      }`}
                    >
                      {isSelected && <span className="w-2 h-2 rounded-full bg-[#df7224]" />}
                    </span>

                    <span className={`flex-1 text-xs font-semibold ${isSelected ? "text-[#df7224]" : "text-gray-700"}`}>
                      {method.label}
                    </span>

                    {method.tag && (
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          isSelected
                            ? "bg-[#df7224]/10 text-[#df7224] border-[#df7224]/30"
                            : "bg-gray-100 text-gray-500 border-transparent"
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

      <div className="mt-5 flex items-center gap-2 p-2.5 rounded-xl border border-[#df7224]/20 bg-[#df7224]/5">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5" className="shrink-0">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        <div>
          <p className="text-[10px] font-extrabold text-[#df7224]">Transaksi Aman & Terenkripsi</p>
          <p className="text-[9px] text-gray-400">SSL 256-bit · Powered by Midtrans · PCI DSS Compliant</p>
        </div>
      </div>
    </div>
  );
}