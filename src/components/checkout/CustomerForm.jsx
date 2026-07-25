"use client";

import { User, Phone, Mail, FileText, Info, UserPlus } from "lucide-react";

const CustomerForm = ({ customer, setCustomer, onAutofill, errors }) => {
  const inputClass = (hasError) =>
    `w-full px-4 py-2.5 rounded-xl text-sm font-normal text-gray-900 bg-white border placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#df7224] focus:border-transparent transition-all ${
      hasError ? "border-red-300" : "border-gray-300"
    }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-base font-bold text-gray-900 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#fef5ef] text-[#df7224]">
            <User size={18} />
          </div>
          <span>Informasi Pemesan</span>
        </h3>

        <button
          type="button"
          onClick={onAutofill}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-[#df7224] text-[#df7224] hover:bg-[#fef5ef] transition-colors"
        >
          <UserPlus size={14} />
          <span>Isi Otomatis</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            <User size={14} className="text-gray-400" />
            <span>Nama Lengkap *</span>
          </label>
          <input
            type="text"
            placeholder="Sesuai KTP / Paspor"
            value={customer.fullName}
            onChange={(e) => setCustomer("fullName", e.target.value)}
            className={inputClass(errors.fullName)}
          />
          {errors.fullName && <p className="text-xs text-red-500">{errors.fullName}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            <Phone size={14} className="text-gray-400" />
            <span>Nomor Telepon / WhatsApp *</span>
          </label>
          <input
            type="tel"
            placeholder="08xxxxxxxxxx"
            value={customer.phone}
            onChange={(e) => setCustomer("phone", e.target.value)}
            className={inputClass(errors.phone)}
          />
          {errors.phone && <p className="text-xs text-red-500">{errors.phone}</p>}
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            <Mail size={14} className="text-gray-400" />
            <span>Alamat Email *</span>
          </label>
          <input
            type="email"
            placeholder="email@contoh.com"
            value={customer.email}
            onChange={(e) => setCustomer("email", e.target.value)}
            className={inputClass(errors.email)}
          />
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
          <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
            <Info size={13} className="text-[#df7224] shrink-0" />
            <span>E-tiket dan konfirmasi pemesanan akan dikirim ke email ini</span>
          </p>
        </div>

        <div className="sm:col-span-2 flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-700 flex items-center gap-1">
            <FileText size={14} className="text-gray-400" />
            <span>Catatan Kesehatan / Kebutuhan Khusus <span className="text-gray-400 font-normal">(opsional)</span></span>
          </label>
          <textarea
            rows={3}
            placeholder="Contoh: Perlu kursi roda, pantangan makanan, bantuan pendampingan khusus, dll."
            value={customer.specialRequest}
            onChange={(e) => setCustomer("specialRequest", e.target.value)}
            className={`${inputClass(false)} resize-none`}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerForm;
