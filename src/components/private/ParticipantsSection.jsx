"use client";

import { useState } from "react";
import { inputCls } from "./helpers/helpers";
import { A } from "./helpers/constants";

const GENDER_OPTIONS = [
  { value: "male",   label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];

const RELATIONSHIP_OPTIONS = [
  "Diri Sendiri", "Pasangan", "Anak", "Orang Tua",
  "Saudara", "Teman", "Kolega", "Lainnya",
];

function generateId() {
  return `pax-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`;
}

function isComplete(p) {
  return !!(p.fullName.trim() && p.birthDate && p.gender && p.phone.trim());
}

/* ── Single participant card ── */
function ParticipantCard({ participant, index, onUpdate, onRemove }) {
  const [expanded, setExpanded] = useState(true);
  const complete = isComplete(participant);

  return (
    <div
      className="rounded-2xl border overflow-hidden transition-all"
      style={complete
        ? { borderColor: `${A}30`, backgroundColor: `${A}05` }
        : { borderColor: "#e5e7eb", backgroundColor: "#fff" }
      }
    >
      {/* Header row */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0"
            style={complete
              ? { backgroundColor: A, color: "#fff" }
              : { backgroundColor: "#f3f4f6", color: "#6b7280" }
            }
          >
            {complete ? (
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              index + 1
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">
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
            className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={complete
              ? { backgroundColor: `${A}15`, color: A, border: `1px solid ${A}30` }
              : { backgroundColor: "#f3f4f6", color: "#9ca3af" }
            }
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: complete ? A : "#9ca3af" }} />
            {complete ? "Lengkap" : "Belum lengkap"}
          </span>

          {/* Delete */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(participant.id); }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-50 transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6l-1 14H6L5 6"/>
              <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
            </svg>
          </button>

          {/* Chevron */}
          <span className={`text-gray-400 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Expandable form */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">

            {/* Nama */}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nama Lengkap <span style={{ color: A }}>*</span>
              </label>
              <input type="text" placeholder="Sesuai KTP / Paspor"
                value={participant.fullName}
                onChange={e => onUpdate(participant.id, "fullName", e.target.value)}
                className={inputCls()} />
            </div>

            {/* Tanggal lahir */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Tanggal Lahir <span style={{ color: A }}>*</span>
              </label>
              <input type="date"
                value={participant.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={e => onUpdate(participant.id, "birthDate", e.target.value)}
                className={inputCls()} />
            </div>

            {/* Jenis kelamin */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Jenis Kelamin <span style={{ color: A }}>*</span>
              </label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map(opt => {
                  const sel = participant.gender === opt.value;
                  return (
                    <button key={opt.value} type="button"
                      onClick={() => onUpdate(participant.id, "gender", opt.value)}
                      className="flex-1 py-2.5 rounded-xl border text-xs font-medium transition-all"
                      style={sel
                        ? { backgroundColor: A, borderColor: A, color: "#fff" }
                        : { backgroundColor: "#f9fafb", borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Nomor HP */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Nomor HP <span style={{ color: A }}>*</span>
              </label>
              <input type="tel" placeholder="08xxxxxxxxxx"
                value={participant.phone}
                onChange={e => onUpdate(participant.id, "phone", e.target.value)}
                className={inputCls()} />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Email <span className="text-gray-300 font-normal normal-case">(opsional)</span>
              </label>
              <input type="email" placeholder="email@contoh.com"
                value={participant.email}
                onChange={e => onUpdate(participant.id, "email", e.target.value)}
                className={inputCls()} />
            </div>

            {/* Hubungan */}
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Hubungan dengan Pemesan
              </label>
              <div className="flex flex-wrap gap-1.5">
                {RELATIONSHIP_OPTIONS.map(rel => {
                  const sel = participant.relationship === rel;
                  return (
                    <button key={rel} type="button"
                      onClick={() => onUpdate(participant.id, "relationship", rel)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                      style={sel
                        ? { backgroundColor: A, borderColor: A, color: "#fff" }
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

/* ── Section utama ── */
export default function ParticipantsSection({ participants, onAdd, onUpdate, onRemove }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Daftar Peserta
          {participants.length > 0 && (
            <span
              className="ml-2 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: A }}
            >
              {participants.length}
            </span>
          )}
        </p>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-white text-xs font-semibold transition-all active:scale-95"
          style={{ backgroundColor: A }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#c8631e")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = A)}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Tambah Peserta
        </button>
      </div>

      {participants.length === 0 ? (
        <div className="py-8 flex flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 bg-gray-50">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${A}15`, color: A }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <p className="text-xs text-gray-500 text-center">
            Belum ada peserta.{" "}
            <button type="button" onClick={onAdd} className="font-semibold underline" style={{ color: A }}>
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
              onUpdate={onUpdate}
              onRemove={onRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
}
