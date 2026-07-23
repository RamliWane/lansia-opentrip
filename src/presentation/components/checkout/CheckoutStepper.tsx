"use client";

const A = "#df7224";

type Step = "details" | "payment" | "confirmation";

const STEPS: { id: Step; label: string; icon: React.ReactNode }[] = [
  {
    id: "details",
    label: "Detail Perjalanan",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    id: "payment",
    label: "Pembayaran",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
  },
  {
    id: "confirmation",
    label: "Konfirmasi",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
];

const STEP_ORDER: Step[] = ["details", "payment", "confirmation"];

interface Props {
  currentStep: Step;
}

export default function CheckoutStepper({ currentStep }: Props) {
  const currentIdx = STEP_ORDER.indexOf(currentStep);

  return (
    <nav aria-label="Checkout steps" className="w-full">
      <ol className="flex items-center justify-between relative">
        {/* Background track */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200 dark:bg-zinc-700 mx-10 sm:mx-16 -z-0" />
        {/* Active track */}
        <div
          className="absolute left-0 top-5 h-0.5 mx-10 sm:mx-16 -z-0 transition-all duration-500"
          style={{
            backgroundColor: A,
            right: `${100 - (currentIdx / (STEPS.length - 1)) * 100}%`,
          }}
        />

        {STEPS.map((step, idx) => {
          const isDone = idx < currentIdx;
          const isActive = idx === currentIdx;

          return (
            <li key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={isDone
                  ? { backgroundColor: A, borderColor: A, color: "#fff" }
                  : isActive
                  ? { backgroundColor: "transparent", borderColor: A, color: A }
                  : { backgroundColor: "white", borderColor: "#e5e7eb", color: "#9ca3af" }
                }
              >
                {isDone ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  step.icon
                )}
              </div>
              <span
                className="text-[10px] sm:text-xs font-bold text-center leading-tight"
                style={(isActive || isDone) ? { color: A } : { color: "#9ca3af" }}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
