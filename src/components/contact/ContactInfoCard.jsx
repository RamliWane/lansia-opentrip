import { Phone, Mail, MapPin, Clock } from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    title: "Telepon / WhatsApp",
    value: "+62 812-3456-7890",
    href: "tel:+6281234567890",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@lansiaopentrip.id",
    href: "mailto:info@lansiaopentrip.id",
  },
  {
    icon: MapPin,
    title: "Alamat Kantor",
    value: "Jl. Merdeka No. 10, Bandung, Jawa Barat",
    href: null,
  },
  {
    icon: Clock,
    title: "Jam Operasional",
    value: "Senin – Sabtu, 09.00 – 18.00 WIB",
    href: null,
  },
];

const ContactInfoCard = () => {
  return (
    <div className="lg:col-span-2 bg-gray-50 border-b lg:border-b-0 lg:border-r border-gray-200 p-6 sm:p-8 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Informasi Kontak
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-8">
          Silakan hubungi kami melalui saluran resmi di bawah ini atau kunjungi kantor operasional kami.
        </p>

        <div className="space-y-6">
          {contactItems.map((item, idx) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary-light text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{item.title}</p>
                  <p className="text-sm font-semibold text-gray-900">{item.value}</p>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={idx}
                href={item.href}
                className="block hover:opacity-80 transition-opacity"
              >
                {content}
              </a>
            ) : (
              <div key={idx}>{content}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
