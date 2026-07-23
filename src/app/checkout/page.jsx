//src/app/checkout/page.jsx

"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCheckout } from "../../lib/hooks/useCheckout";
import { destinationsData } from "../../lib/destinationsData";
import StepProgress from "../../components/checkout/StepProgress";
import DetailsStep from "../../components/checkout/DetailsStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import ConfirmationStep from "../../components/checkout/ConfirmationStep";
import Footer from "../../components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Subs from "@/components/landing/Subs";

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
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans text-gray-800">

      <Navbar />

      <div className="w-full border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => router.push("/")}
              className="text-gray-400 hover:text-[#df7224] transition-colors font-medium"
            >
              Beranda
            </button>
            <span className="text-gray-300">/</span>
            <span className="font-semibold text-gray-700">Checkout</span>
          </div>

          <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-semibold bg-orange-50 border-orange-100 text-[#df7224]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            Transaksi Aman
          </span>
        </div>
      </div>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-8 pb-24 sm:pb-20">

        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {checkout.step === "details" && "Konfirmasi Pemesanan"}
            {checkout.step === "payment" && "Pembayaran"}
            {checkout.step === "confirmation" && "Pemesanan Berhasil 🎉"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {checkout.step === "details" && "Lengkapi detail perjalanan dan data peserta"}
            {checkout.step === "payment" && "Pilih metode pembayaran dan selesaikan transaksi"}
            {checkout.step === "confirmation" && "Terima kasih, perjalanan Anda sudah terkonfirmasi"}
          </p>
        </div>

        {checkout.step !== "confirmation" && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 shadow-sm">
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
        <Subs />
      <Footer />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 rounded-full border-4 border-orange-100 border-t-[#df7224] animate-spin" />
            <p className="text-sm font-semibold text-gray-500">
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
