import {
  Search,
  FileText,
  ClipboardCheck,
  CreditCard,
  Send,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Pilih Destinasi",
    description:
      "Jelajahi berbagai pilihan paket trip ramah lansia. Gunakan filter untuk memilih destinasi, durasi, atau lokasi titik kumpul.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Cek Detail Trip & Fasilitas",
    description:
      "Lihat rincian lengkap perjalanan, termasuk fasilitas pendampingan, aksesbilitas lokasi, akomodasi, dan makanan yang disajikan.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Isi Data Pemesan & Peserta",
    description:
      "Isi data diri pemesan serta info khusus peserta (catatan kesehatan/kebutuhan khusus jika ada) agar tim kami siap memberikan pelayanan terbaik.",
  },
  {
    number: "04",
    icon: CreditCard,
    title: "Pembayaran Aman",
    description:
      "Lakukan pembayaran melalui transfer bank atau e-wallet resmi. Transaksi diproses aman dan transparan tanpa biaya tersembunyi.",
  },
  {
    number: "05",
    icon: Send,
    title: "Terima E-Voucher & Persiapan",
    description:
      "Konfirmasi dan e-voucher perjalanan dikirimkan via WhatsApp & Email. Tim kami akan menghubungi H-1 untuk panduan penjemputan.",
  },
];

const TutorialSection = () => {
  return (
    <section id="tutorial" className="relative bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 lg:sticky lg:top-24 lg:self-start">
            <span className="text-primary font-semibold text-xs uppercase tracking-wider block mb-2">
              CARA PEMESANAN
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-snug mb-4">
              Pemesanan Mudah dalam <span className="text-primary">5 Langkah</span>
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Proses pendaftaran cepat dan mudah, didampingi tim ramah yang siap membantu setiap kebutuhan Anda.
            </p>

            <div className="relative rounded-xl overflow-hidden hidden lg:block shadow-sm border border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=700&fit=crop"
                alt="Pemesanan Trip Lansia"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-lg p-4 flex items-center gap-3 border border-gray-100 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shrink-0">
                  <Send size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    E-Voucher & Panduan
                  </h4>
                  <p className="text-xs text-gray-500">
                    Dikirim langsung ke WhatsApp & Email
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div className="absolute left-6 top-3 bottom-6 w-0.5 bg-gray-200" />

            <div className="space-y-8">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.number} className="relative flex gap-6">
                    <div className="relative z-10 w-12 h-12 rounded-lg bg-primary-light border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                      <Icon size={20} />
                    </div>

                    <div className="flex-1 pt-1">
                      <span className="text-xs font-bold text-primary tracking-wider block mb-1">
                        LANGKAH {step.number}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 sm:ml-18 inline-flex items-center gap-2 bg-primary-light border border-primary/20 text-primary px-5 py-3 rounded-lg text-sm font-semibold">
              <ClipboardCheck size={18} />
              <span>Sudah siap berwisata? Pilih destinasi favorit Anda!</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TutorialSection;