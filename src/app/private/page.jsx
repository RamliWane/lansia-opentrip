"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/private/PageHeader";
import BookingInformationSection from "@/components/private/BookingInformationSection";
import TripDetailSection from "@/components/private/TripDetailSection";
import TripOptionSection from "@/components/private/TripOptionSection";
import TripFromSection from "@/components/private/TripFromSection";
import SuccessState from "@/components/private/SuccessState";
import SubmitBar from "@/components/private/SubmitBar";
import Subs from "@/components/landing/Subs";
import { initialForm } from "@/components/private/helpers/initialState";
import { validate } from "@/components/private/helpers/validation";
import { destinationsData } from "@/infrastructure/data/destinationsData";

export default function PrivateTripPage() {
  const [form, setForm] = useState(initialForm);

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const resetForm = () => {
    setSubmitted(false);
    setErrors({});
    setForm(initialForm);
  };

  const budgetValue = form.tripType === "explorer" && form.selectedDestinasi
    ? form.selectedDestinasi.priceMin
    : form.budget;

  /* ── Success state ────────────────────────────────── */
  if (submitted) {
    return (
          <SuccessState
      form={form}
      onReset={resetForm}
    />
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#f8f8f6]">

        {/* ── Page Header — sama persis dengan halaman destinasi ── */}
    <PageHeader />
        {/* ── Content ─────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <form onSubmit={handleSubmit} noValidate>
            <div className="flex flex-col gap-5">

              {/* ── 1. Info Pemesan ──────────────────────────── */}
  <BookingInformationSection
    form={form}
    set={set}
    errors={errors}
  />
              {/* ── 2. Detail Trip ───────────────────────────── */}
  <TripDetailSection
    form={form}
    set={set}
    errors={errors}
    budgetValue={budgetValue}
  />
              {/* ── 3. Pilih Trip ────────────────────────────── */}
  <TripOptionSection
    form={form}
    set={set}
    errors={errors}
    destinationsData={destinationsData}
  />
              {/* ── 4. Custom Trip Dari ──────────────────────── */}
  <TripFromSection
    form={form}
    set={set}
    errors={errors}
  />
              {/* ── Submit bar ───────────────────────────────── */}
  <SubmitBar />

            </div>
          </form>
        </div>
      </main>
      <Subs />
      <Footer />
    </>
  );
}
