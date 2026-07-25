"use client";

import { useState } from "react";
import { Check, Trash2, ChevronDown } from "lucide-react";

const GENDER_OPTIONS = [
  { value: "male", label: "Laki-laki" },
  { value: "female", label: "Perempuan" },
];

const RELATIONSHIP_OPTIONS = [
  "Diri Sendiri", "Pasangan", "Anak", "Orang Tua",
  "Saudara", "Teman", "Lainnya",
];

const isComplete = (p) => {
  return !!(p.fullName.trim() && p.birthDate && p.gender && p.phone.trim());
};

export default function ParticipantCard ({ participant, index, onUpdate, onRemove }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const complete = isComplete(participant);

  return (
    <div
      className={`rounded-xl border overflow-hidden transition-colors ${
        complete
          ? "border-primary/30 bg-primary-light/40"
          : "border-gray-200 bg-white"
      }`}
    >
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
              complete ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {complete ? <Check size={14} strokeWidth={2.5} /> : index + 1}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-gray-900">
              {participant.fullName || `Peserta ${index + 1}`}
            </h4>
            <p className="text-xs text-gray-500">
              {complete
                ? `${participant.gender === "male" ? "Laki-laki" : "Perempuan"} · ${participant.relationship || "—"}`
                : "Lengkapi data peserta"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`hidden sm:inline-flex items-center px-2 py-0.5 rounded-[5px] text-[11px] font-medium border ${
              complete
                ? "bg-primary-light text-primary border-primary/30"
                : "bg-gray-100 text-gray-500 border-transparent"
            }`}
          >
            {complete ? "Lengkap" : "Belum lengkap"}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(participant.id);
            }}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white bg-red-500 hover:bg-red-500/80 transition-colors"
            aria-label="Hapus peserta"
          >
            <Trash2 size={15} />
          </button>

          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Nama Lengkap Peserta *</label>
              <input
                type="text"
                placeholder="Sesuai KTP / Paspor"
                value={participant.fullName}
                onChange={(e) => onUpdate(participant.id, "fullName", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Tanggal Lahir *</label>
              <input
                type="date"
                value={participant.birthDate}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => onUpdate(participant.id, "birthDate", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Jenis Kelamin *</label>
              <div className="flex gap-2">
                {GENDER_OPTIONS.map(({ value, label }) => {
                  const sel = participant.gender === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onUpdate(participant.id, "gender", value)}
                      className={`flex-1 py-2 rounded-lg border text-xs font-medium transition-colors ${
                        sel
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Nomor Telepon *</label>
              <input
                type="tel"
                placeholder="08xxxxxxxxxx"
                value={participant.phone}
                onChange={(e) => onUpdate(participant.id, "phone", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Email <span className="text-gray-400 font-normal">(opsional)</span></label>
              <input
                type="email"
                placeholder="email@contoh.com"
                value={participant.email}
                onChange={(e) => onUpdate(participant.id, "email", e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg text-sm text-gray-900 bg-white border border-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div className="sm:col-span-2 flex flex-col gap-1">
              <label className="text-xs font-medium text-gray-700">Hubungan dengan Pemesan</label>
              <div className="flex flex-wrap gap-1.5">
                {RELATIONSHIP_OPTIONS.map((rel) => {
                  const sel = participant.relationship === rel;
                  return (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => onUpdate(participant.id, "relationship", rel)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        sel
                          ? "bg-primary border-primary text-white"
                          : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
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
};