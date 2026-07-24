"use client";

export default function CustomerForm({ customer, setCustomer, onAutofill, errors }) {
  const inputClass = (hasError) =>
    `w-full px-3.5 py-3 rounded-xl text-sm font-medium text-gray-900 bg-gray-50 border focus:outline-none focus:ring-2 focus:ring-[#df7224]/20 focus:border-[#df7224] focus:bg-white transition-colors ${
      hasError ? "border-red-300" : "border-transparent"
    }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-xl flex items-center justify-center bg-orange-50">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Informasi Pemesan
        </h3>

        <button
          type="button"
          onClick={onAutofill}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-orange-50 text-[#df7224] hover:bg-orange-100 transition-colors"
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
          Isi Otomatis
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Sesuai KTP / Paspor"
            value={customer.fullName}
            onChange={(e) => setCustomer("fullName", e.target.value)}
            className={inputClass(errors.fullName)}
          />
          {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            Nomor HP <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={customer.phone}
            onChange={(e) => setCustomer("phone", e.target.value)}
            className={inputClass(errors.phone)}
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            Alamat Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="email@contoh.com"
            value={customer.email}
            onChange={(e) => setCustomer("email", e.target.value)}
            className={inputClass(errors.email)}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5" className="shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            E-tiket dan konfirmasi booking dikirim ke email ini
          </p>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-500">
            Permintaan Khusus <span className="text-gray-300 font-normal">(opsional)</span>
          </label>
          <textarea
            rows={3}
            placeholder="Contoh: vegetarian meals, kamar connecting, dll."
            value={customer.specialRequest}
            onChange={(e) => setCustomer("specialRequest", e.target.value)}
            className={`${inputClass(false)} resize-none`}
          />
        </div>
      </div>
    </div>
  );
}
