"use client";

import { Check } from "lucide-react";

const STEPS = [
  { id: "details", label: "Detail Perjalanan", sublabel: "Info & peserta" },
  { id: "payment", label: "Pembayaran", sublabel: "Pilih metode" },
  { id: "confirmation", label: "Konfirmasi", sublabel: "Selesai" },
];

const STEP_ORDER = ["details", "payment", "confirmation"];

const StepProgress = ({ currentStep }) => {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="w-full flex items-center justify-between relative">
      <div className="absolute top-5 h-0.5 bg-gray-200 z-0" style={{ left: "28px", right: "28px" }} />
      <div
        className="absolute top-5 h-0.5 z-0 transition-all duration-300 rounded-full bg-[#df7224]"
        style={{
          left: "28px",
          right: `calc(${100 - (currentIdx / (STEPS.length - 1)) * 100}% + 28px)`,
        }}
      />

      {STEPS.map((step, idx) => {
        const isDone = idx < currentIdx;
        const isActive = idx === currentIdx;

        return (
          <div key={step.id} className="flex flex-col items-center gap-2 z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                isDone
                  ? "bg-[#df7224] border-[#df7224] text-white shadow-xs"
                  : isActive
                  ? "bg-white border-[#df7224] text-[#df7224] shadow-xs ring-4 ring-[#df7224]/10"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {isDone ? (
                <Check size={18} strokeWidth={2.5} />
              ) : (
                <span className="text-sm font-bold">{idx + 1}</span>
              )}
            </div>
            <div className="text-center">
              <p className={`text-xs font-bold leading-tight ${isDone || isActive ? "text-[#df7224]" : "text-gray-400"}`}>
                {step.label}
              </p>
              <p className="text-[10px] text-gray-400 hidden sm:block">{step.sublabel}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
