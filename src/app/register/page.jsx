"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowLeft, Compass } from "lucide-react";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid lg:grid-cols-2">
        <div className="relative hidden lg:flex flex-col justify-between p-10 bg-gray-950 text-white min-h-[550px]">
          <div className="absolute inset-0 bg-[url('/register-page-image.jpeg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />

          <Link href="/" className="relative z-10 flex items-center gap-2.5 text-xl font-bold text-white">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <span>Lansia<span className="text-primary">OpenTrip</span></span>
          </Link>

          <div className="relative z-10">
            <h2 className="text-2xl lg:text-3xl font-bold text-white leading-snug mb-3">
              Bergabung Bersama Komunitas Wisata Lansia Indonesia.
            </h2>
            <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
              Daftarkan diri Anda atau anggota keluarga untuk menikmati paket perjalanan open trip khusus senior yang aman dan nyaman.
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-10 flex flex-col justify-center bg-white">
          <div className="flex items-center justify-between mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} />
              <span>Kembali ke Website</span>
            </Link>
            <Link href="/" className="lg:hidden flex items-center gap-2 text-base font-bold text-gray-900">
              <span>Lansia<span className="text-primary">OpenTrip</span></span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Buat Akun Baru
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Daftar untuk mulai memesan paket perjalanan Lansia OpenTrip.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                placeholder="Nama lengkap pemesan / peserta"
                required
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Alamat Email
              </label>
              <input
                type="email"
                placeholder="nama@email.com"
                required
                className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Buat kata sandi aman"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-primary-hover transition-colors shadow-xs"
            >
              Daftar Akun
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">Atau mendaftar dengan</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 border border-gray-300 rounded-lg py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Daftar dengan Google</span>
          </button>

          <p className="text-center text-xs text-gray-500 mt-6">
            Sudah punya akun?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;