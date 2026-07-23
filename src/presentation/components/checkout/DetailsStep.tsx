"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/application/hooks/useCheckout";
import BookingCard from "./BookingCard";
import CustomerForm from "./CustomerForm";
import ParticipantCard from "./ParticipantCard";
import MeetingPointSelector from "./MeetingPointSelector";
import VoucherCard from "./VoucherCard";
import BookingSummary from "./BookingSummary";
import { CustomerInfo } from "@/domain/entities/Order";

interface Props {
  checkout: ReturnType<typeof useCheckout>;
  onNext: () => void;
}

function validateCustomer(customer: CustomerInfo) {
  const errors: Record<string, string> = {};
  if (!customer.fullName.trim() || customer.fullName.trim().length < 3)
    errors.fullName = "Nama minimal 3 karakter";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
    errors.email = "Format email tidak valid";
  if (customer.phone.trim().length < 8)
    errors.phone = "Nomor HP minimal 8 digit";
  return errors;
}

const MIN_DATE = new Date().toISOString().split("T")[0];

export default function DetailsStep({ checkout, onNext }: Props) {
  const router = useRouter();
  const [touched, setTouched] = useState(false);

  const {
    destination, pax, travelDate, customer, participants,
    meetingPointId, voucherCode, appliedVoucher, voucherError,
    ticketSubtotal, meetingPointFee, serviceFee, discount, total,
    agreeToTerms,
    setCustomer, autofillProfile, setPax, setTravelDate,
    addParticipant, updateParticipant, removeParticipant,
    setMeetingPointId, setVoucherCode, applyVoucher, removeVoucher,
    setAgreeToTerms,
  } = checkout;

  const customerErrors = touched ? validateCustomer(customer) : {};
  const isFormValid =
    !!destination &&
    !!travelDate &&
    travelDate >= MIN_DATE &&
    Object.keys(validateCustomer(customer)).length === 0;

  const handleContinue = () => {
    setTouched(true);
    if (!isFormValid) return;
    onNext();
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 items-start">
      {/* ── Left Column ───────────────────────────────────── */}
      <div className="space-y-5">

        {/* Trip Information Card */}
        {destination ? (
          <BookingCard
            destination={destination}
            travelDate={travelDate}
            pax={pax}
            setPax={setPax}
            setTravelDate={setTravelDate}
          />
        ) : (
          <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-gray-200 dark:border-zinc-700 p-10 flex flex-col items-center gap-4 text-center">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "#df722415", color: "#df7224" }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">Belum ada destinasi dipilih</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">Pilih destinasi wisata untuk memulai pemesanan</p>
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2.5 rounded-xl text-white text-sm font-bold transition-all" style={{ backgroundColor: "#df7224" }}
              >
                Pilih Destinasi
              </button>
            </div>
          </div>
        )}

        {/* Customer Info */}
        <CustomerForm
          customer={customer}
          setCustomer={setCustomer}
          onAutofill={autofillProfile}
          errors={customerErrors}
        />

        {/* Participants */}
        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#df722415" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#df7224" strokeWidth="2.5">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </span>
              Data Peserta
              {participants.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold border" style={{ backgroundColor: "#df722415", color: "#df7224", borderColor: "#df722830" }}>
                  {participants.length}
                </span>
              )}
            </h3>

            <button
              type="button"
              onClick={addParticipant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-bold active:scale-95 transition-all"
              style={{ backgroundColor: "#df7224" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span className="hidden sm:inline">Tambah Peserta</span>
              <span className="sm:hidden">Tambah</span>
            </button>
          </div>

          {participants.length === 0 ? (
            <div className="py-8 flex flex-col items-center gap-2.5 text-center rounded-xl border border-dashed border-gray-200 dark:border-zinc-700 bg-gray-50 dark:bg-zinc-800/50">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#df722415", color: "#df7224" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Belum ada peserta.{" "}
                <button onClick={addParticipant} className="font-bold underline" style={{ color: "#df7224" }}>
                  Tambah sekarang
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {participants.map((p, idx) => (
                <ParticipantCard
                  key={p.id}
                  participant={p}
                  index={idx}
                  onUpdate={updateParticipant}
                  onRemove={removeParticipant}
                />
              ))}
            </div>
          )}
        </div>

        {/* Meeting Point */}
        <MeetingPointSelector selectedId={meetingPointId} onChange={setMeetingPointId} />

        {/* Voucher */}
        <VoucherCard
          voucherCode={voucherCode}
          appliedVoucher={appliedVoucher}
          voucherError={voucherError}
          onCodeChange={setVoucherCode}
          onApply={applyVoucher}
          onRemove={removeVoucher}
          subtotal={ticketSubtotal}
        />
      </div>

      {/* ── Right: Sticky Summary ──────────────────────────── */}
      <div>
        <BookingSummary
          destination={destination}
          travelDate={travelDate}
          pax={pax}
          meetingPointId={meetingPointId}
          ticketSubtotal={ticketSubtotal}
          meetingPointFee={meetingPointFee}
          serviceFee={serviceFee}
          discount={discount}
          total={total}
          appliedVoucher={appliedVoucher}
          isValid={isFormValid}
          isLoading={false}
          agreeToTerms={agreeToTerms}
          onAgreeChange={setAgreeToTerms}
          onContinue={handleContinue}
          ctaLabel="Lanjut ke Pembayaran"
          step="details"
        />
      </div>
    </div>
  );
}
