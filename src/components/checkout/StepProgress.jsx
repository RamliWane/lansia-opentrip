"use client";

const ACCENT = "#df7224";

const STEPS = [
  { id: "details", label: "Detail Perjalanan", sublabel: "Info & peserta" },
  { id: "payment", label: "Pembayaran", sublabel: "Pilih metode" },
  { id: "confirmation", label: "Konfirmasi", sublabel: "Selesai" },
];

const STEP_ORDER = ["details", "payment", "confirmation"];



export default function StepProgress({ currentStep }) {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Background track */}
        <div
          className="absolute top-5 h-0.5 bg-gray-200 dark:bg-zinc-700 z-0"
          style={{ left: "28px", right: "28px" }}
        />
        {/* Active track */}
        <div
          className="absolute top-5 h-0.5 z-0 transition-all duration-500"
          style={{
            left: "28px",
            right: `calc(${100 - (currentIdx / (STEPS.length - 1)) * 100}% + 28px)`,
            backgroundColor: ACCENT,
          }}
        />

        {STEPS.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isActive = idx === currentIdx;
          const isInactive = !isDone && !isActive;

          const circleStyle = isDone
            ? { backgroundColor: ACCENT, borderColor: ACCENT, color: "#fff" }
            : isActive
            ? { backgroundColor: "transparent", borderColor: ACCENT, color: ACCENT }
            : {};

          const circleClass = `w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300${
            isInactive ? " bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700 text-gray-400" : ""
          }`;

          const labelStyle = isDone || isActive ? { color: ACCENT } : { color: "#9ca3af" };

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div className={circleClass} style={isInactive ? {} : circleStyle}>
                {isDone ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <span className="text-sm font-bold">{idx + 1}</span>
                )}
              </div>
              <div className="text-center">
                <p className="text-xs font-bold leading-tight" style={labelStyle}>
                  {step.label}
                </p>
                <p className="text-[10px] text-gray-400 hidden sm:block">{step.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
