"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Plus, MapPin } from "lucide-react";
import BookingCard from "./BookingCard";
import CustomerForm from "./CustomerForm";
import ParticipantCard from "./ParticipantCard";
import MeetingPointSelector from "./MeetingPointSelector";
import VoucherCard from "./VoucherCard";
import BookingSummary from "./BookingSummary";

const validateCustomer = (customer) => {
  const errors = {};
  if (!customer.fullName.trim() || customer.fullName.trim().length < 3)
    errors.fullName = "Nama minimal 3 karakter";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email))
    errors.email = "Format email tidak valid";
  if (customer.phone.trim().length < 8)
    errors.phone = "Nomor HP minimal 8 digit";
  return errors;
};

const MIN_DATE = new Date().toISOString().split("T")[0];

export default function DetailsStep ({ checkout, onNext }) {
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
      <div className="space-y-5">
        {destination ? (
          <BookingCard
            destination={destination}
            travelDate={travelDate}
            pax={pax}
            setPax={setPax}
            setTravelDate={setTravelDate}
          />
        ) : (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 flex flex-col items-center gap-3 text-center">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary-light text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">Belum ada destinasi dipilih</h3>
              <p className="text-xs text-gray-500 mb-4">Pilih destinasi wisata untuk memulai pemesanan</p>
              <button
                onClick={() => router.push("/")}
                className="px-5 py-2 rounded-lg text-white text-sm font-medium bg-primary hover:bg-primary-hover transition-colors"
              >
                Pilih Destinasi
              </button>
            </div>
          </div>
        )}

        <CustomerForm customer={customer} setCustomer={setCustomer} onAutofill={autofillProfile} errors={customerErrors} />

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[15px] font-semibold text-gray-900 flex items-center gap-1">
              <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-primary-light text-primary">
                <Users size={16} />
              </span>
              Daftar Peserta
              {participants.length > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                  {participants.length}
                </span>
              )}
            </h3>

            <button
              type="button"
              onClick={addParticipant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-medium bg-[#df7224] transition-colors"
            >
              <Plus size={14} />
              <span>Tambah Peserta</span>
            </button>
          </div>

          {participants.length === 0 ? (
            <div className="py-8 flex flex-col items-center gap-2 text-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
              <p className="text-xs text-gray-500">
                Belum ada data peserta.{" "}
                <button onClick={addParticipant} className="font-semibold text-primary underline">
                  Tambah sekarang
                </button>
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {participants.map((p, idx) => (
                <ParticipantCard key={p.id} participant={p} index={idx} onUpdate={updateParticipant} onRemove={removeParticipant} />
              ))}
            </div>
          )}
        </div>

        <MeetingPointSelector selectedId={meetingPointId} onChange={setMeetingPointId} />

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

      <div className="sticky top-24 self-start">
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
};