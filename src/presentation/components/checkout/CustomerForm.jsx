"use client";



export default function CustomerForm({ customer, setCustomer, onAutofill, errors }) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#df722415" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          Informasi Pemesan
        </h3>

        <button
          type="button"
          onClick={onAutofill}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors"
          style={{ backgroundColor: "#df722410", borderColor: "#df722430", color: "#df7224" }}
          onMouseEnter={e => e.currentTarget.style.backgroundColor = "#df722420"}
          onMouseLeave={e => e.currentTarget.style.backgroundColor = "#df722410"}
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
        {/* Full Name */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Nama Lengkap <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            placeholder="Sesuai KTP / Paspor"
            value={customer.fullName}
            onChange={(e) => setCustomer("fullName", e.target.value)}
            className={`glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none ${errors.fullName ? "border-red-300" : ""}`}
          />
          {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
        </div>

        {/* Phone */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Nomor HP <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={customer.phone}
            onChange={(e) => setCustomer("phone", e.target.value)}
            className={`glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none ${errors.phone ? "border-red-300" : ""}`}
          />
          {errors.phone && <p className="text-xs text-red-400">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Alamat Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            placeholder="email@contoh.com"
            value={customer.email}
            onChange={(e) => setCustomer("email", e.target.value)}
            className={`glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none ${errors.email ? "border-red-300" : ""}`}
          />
          {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
          <p className="text-[10px] text-gray-400 flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            E-tiket dan konfirmasi booking dikirim ke email ini
          </p>
        </div>

        {/* Special Request */}
        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Permintaan Khusus <span className="text-gray-300 font-normal normal-case">(opsional)</span>
          </label>
          <textarea
            rows={2}
            placeholder="Contoh: vegetarian meals, kamar connecting, dll."
            value={customer.specialRequest}
            onChange={(e) => setCustomer("specialRequest", e.target.value)}
            className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
