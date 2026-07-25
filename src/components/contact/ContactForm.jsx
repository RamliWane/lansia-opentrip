"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail, Phone, User, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="lg:col-span-3 p-6 sm:p-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
        Kirim Pesan & Pertanyaan
      </h2>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">
        Isi formulir di bawah ini. Tim kami akan menghubungi Anda kembali dalam waktu 1x24 jam kerja.
      </p>

      {submitted ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 border border-green-200 bg-green-50/50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3 text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-gray-900 mb-1">Pesan Berhasil Terkirim</h3>
          <p className="text-sm text-gray-600 max-w-sm">
            Terima kasih telah menghubungi Lansia OpenTrip. Tim konsultan kami akan segera merespon pesan Anda.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Email *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="nama@email.com"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nomor Telepon / WA *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  required
                  className="w-full border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Nama Lengkap *
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nama pemesan / peserta"
                required
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
              Pesan / Pertanyaan *
            </label>
            <div className="relative">
              <MessageSquare className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
              <textarea
                rows={4}
                placeholder="Tuliskan pertanyaan atau kebutuhan trip Anda di sini..."
                required
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white px-6 py-3 w-full rounded-lg font-medium text-sm transition-colors"
          >
            <span>Kirim Pesan</span>
            <Send className="w-4 h-4" />
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
