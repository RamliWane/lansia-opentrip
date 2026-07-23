"use client";

import { useState } from "react";
import { Participant } from "@/domain/entities/Order";

interface Props {
  participant: Participant;
  index: number;
  onUpdate: (id: string, field: keyof Participant, value: string) => void;
  onRemove: (id: string) => void;
}

const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];

const RELATIONSHIP_OPTIONS = [
  "Diri Sendiri", "Pasangan", "Anak", "Orang Tua",
  "Saudara", "Teman", "Kolega", "Lainnya",
];

function isComplete(p: Participant) {
  return !!(p.fullName.trim() && p.birthDate && p.gender && p.phone.trim());
}

export default function ParticipantCard({ participant, index, onUpdate, onRemove }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const complete = isComplete(participant);

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all duration-200"
      style={complete
        ? { borderColor: "#df722430", backgroundColor: "#df722408" }
        : { borderColor: "", backgroundColor: "" }
      }
      {...(!complete ? { className: "rounded-2xl border border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden transition-all duration-200" } : {})}
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={complete
              ? { backgroundColor: "#df7224", color: "#fff" }
              : { backgroundColor: "", color: "" }
            }
            {...(!complete ? { className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 bg-gray-100 dark:bg-zinc-800 text-gray-500" } : {})}
          >
            {complete ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <div>
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {participant.fullName || `Peserta ${index + 1}`}
            </p>
            <p className="text-[10px] text-gray-400">
              {complete
                ? `${participant.gender === "male" ? "Laki-laki" : "Perempuan"} · ${participant.relationship || "—"}`
                : "Lengkapi data peserta"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Status pill */}
          <span
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold"
            style={complete
              ? { backgroundColor: "#df722415", color: "#df7224", border: "1px solid #df722430" }
              : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: complete ? "#df7224" : "#9ca3af" }}
            />
            {complete ? "Lengkap" : "Belum lengkap"}
          </span>

          {/* Delete */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(participant.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6M9 6V4h6v2" />
            </svg>
          </button>

          {/* Chevron */}
          <div className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>
      </div>

      {/* Expandable form */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-gray-100 dark:border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Sesuai KTP / Paspor"
                value={participant.fullName}
                onChange={(e) => onUpdate(participant.id, "fullName", e.target.value)}
                className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Tanggal Lahir <span className="text-red-400">*</span>
              </label>
              <input
                type="date"
                value={participant.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => onUpdate(participant.id, "birthDate", e.target.value)}
                className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Jenis Kelamin <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map((opt) => {
                  const sel = participant.gender === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => onUpdate(participant.id, "gender", opt.value)}
                      className="flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all"
                      style={sel
                        ? { backgroundColor: "#df7224", borderColor: "#df7224", color: "#fff" }
                        : { backgroundColor: "#f9fafb", borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      {opt.value === "male" ? "♂ " : "♀ "}{opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Nomor HP <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={participant.phone}
                onChange={(e) => onUpdate(participant.id, "phone", e.target.value)}
                className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email <span className="text-gray-300 font-normal normal-case">(opsional)</span>
              </label>
              <input
                type="email"
                placeholder="email@contoh.com"
                value={participant.email}
                onChange={(e) => onUpdate(participant.id, "email", e.target.value)}
                className="glass-input w-full px-3 py-2.5 rounded-xl text-sm font-semibold focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Hubungan dengan Pemesan
              </label>
              <div className="flex flex-wrap gap-1.5">
                {RELATIONSHIP_OPTIONS.map((rel) => {
                  const sel = participant.relationship === rel;
                  return (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => onUpdate(participant.id, "relationship", rel)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={sel
                        ? { backgroundColor: "#df7224", borderColor: "#df7224", color: "#fff" }
                        : { backgroundColor: "transparent", borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      {rel}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
