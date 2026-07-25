import { User, Phone, Mail, Users } from "lucide-react";
import Field from "./Field";
import SectionCard from "./SectionCard";
import { inputCls } from "./helpers/helpers";

const BookingInformationSection = ({ form, set, errors }) => {
  return (
    <SectionCard
      icon={<User className="w-4 h-4 text-primary" />}
      title="Informasi Pemesan"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nama Pemesan" required error={errors.nama}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <User size={16} />
            </span>
            <input
              type="text"
              placeholder="Sesuai KTP"
              value={form.nama}
              onChange={(e) => set("nama", e.target.value)}
              className={inputCls(errors.nama, "pl-10")}
            />
          </div>
        </Field>

        <Field label="Nomor Ponsel / WA" required error={errors.phone}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Phone size={16} />
            </span>
            <input
              type="tel"
              placeholder="08xxxxxxxxxx"
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={inputCls(errors.phone, "pl-10")}
            />
          </div>
        </Field>

        <Field label="Email" hint="Konfirmasi akan dikirim ke email ini">
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail size={16} />
            </span>
            <input
              type="email"
              placeholder="nama@email.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
              className={inputCls(null, "pl-10")}
            />
          </div>
        </Field>

        <Field label="Jumlah Peserta Lansia & Pendamping" required error={errors.peserta}>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <Users size={16} />
            </span>
            <input
              type="number"
              min="1"
              placeholder="Jumlah peserta"
              value={form.peserta}
              onChange={(e) => set("peserta", e.target.value)}
              className={inputCls(errors.peserta, "pl-10")}
            />
          </div>
        </Field>
      </div>
    </SectionCard>
  );
};

export default BookingInformationSection;