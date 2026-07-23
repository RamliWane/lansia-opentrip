"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "../../application/hooks/useCheckout";
import { destinationsData } from "../../infrastructure/data/destinationsData";
import StepProgress from "../../presentation/components/checkout/StepProgress";
import DetailsStep from "../../presentation/components/checkout/DetailsStep";
import PaymentStep from "../../presentation/components/checkout/PaymentStep";
import ConfirmationStep from "../../presentation/components/checkout/ConfirmationStep";
import Footer from "../../components/layout/Footer";

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const destId = searchParams.get("destination");

  const destination = destId
    ? destinationsData.find((d) => d.id === Number(destId)) ?? null
    : null;

  const checkout = useCheckout(destination);

  // Load Midtrans Snap
  useEffect(() => {
    const snapUrl =
      process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true"
        ? "https://app.midtrans.com/snap/snap.js"
        : "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";
    if (!document.querySelector(`script[src="${snapUrl}"]`)) {
      const script = document.createElement("script");
      script.src = snapUrl;
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-zinc-950 font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">

      {/* ── Header ──────────────────────────────────────── */}
      <header className="w-full border-b border-gray-200/60 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-10 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Back button */}
            <button
              onClick={() => router.push("/")}
              className="flex items-center justify-center w-8 h-8 rounded-xl transition-colors"
              style={{ backgroundColor: "#df722415", color: "#df7224" }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#df722825"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#df722415"}
              title="Kembali"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Brand */}
            <div className="flex items-center gap-2">
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: "#df7224" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span className="text-lg font-extrabold tracking-tight">
                Destinasi<span style={{ color: "#df7224" }}>Wisata</span>
              </span>
              <span className="text-gray-300 dark:text-gray-600 hidden sm:block">/</span>
              <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 hidden sm:block">
                Checkout
              </span>
            </div>
          </div>

          {/* Security badge */}
          <div className="hidden sm:flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-semibold flex items-center gap-1.5"
              style={{ backgroundColor: "#df722410", borderColor: "#df722830", color: "#df7224" }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Transaksi Aman
            </span>
          </div>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────── */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-24 sm:pb-20">

        {/* Page title */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {checkout.step === "details" && "Konfirmasi Pemesanan"}
            {checkout.step === "payment" && "Pembayaran"}
            {checkout.step === "confirmation" && "Pemesanan Berhasil 🎉"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {checkout.step === "details" && "Lengkapi detail perjalanan dan data peserta"}
            {checkout.step === "payment" && "Pilih metode pembayaran dan selesaikan transaksi"}
            {checkout.step === "confirmation" && "Terima kasih, perjalanan Anda sudah terkonfirmasi"}
          </p>
        </div>

        {/* Step progress */}
        {checkout.step !== "confirmation" && (
          <div className="bg-white/60 dark:bg-zinc-900/60 border border-gray-200/50 dark:border-zinc-800/50 backdrop-blur-md rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8">
            <StepProgress currentStep={checkout.step} />
          </div>
        )}

        {checkout.step === "details" && (
          <DetailsStep checkout={checkout} onNext={checkout.goToPayment} />
        )}
        {checkout.step === "payment" && (
          <PaymentStep checkout={checkout} onPay={checkout.initiatePayment} onBack={checkout.goBack} />
        )}
        {checkout.step === "confirmation" && (
          <ConfirmationStep checkout={checkout} onReset={() => router.push("/")} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-zinc-950">
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-10 h-10 rounded-full border-4 animate-spin"
              style={{ borderColor: "#df722430", borderTopColor: "#df7224" }}
            />
            <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
              Memuat halaman checkout...
            </p>
          </div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
