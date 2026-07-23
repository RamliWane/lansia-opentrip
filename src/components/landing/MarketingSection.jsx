import { ArrowDownToLine, ShieldCheck, BadgePercent, Headset } from "lucide-react";

export default function MarketingSection() {
  return (
    <section className="relative bg-white py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-snug mb-6 max-w-md">
              Kenapa Harus Pilih{" "}
              <span className="text-[#df7224]">OpenTrip Ini</span>?
            </h2>
            <p className="text-gray-500 mb-8 max-w-md leading-relaxed">
              Kami bantu setiap perjalanan mu jadi lebih mudah, aman, dan
              terjangkau dari pemesanan sampai mu sampai di destinasi.
            </p>

            <div className="space-y-5 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 round flex items-center justify-center shrink-0">
                  <ShieldCheck size={27} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-[20px]">
                    Banyak Pilihan Destinasi
                  </p>
                  <p className="text-[17px] text-gray-500">
                    Mau liburan ke Bandung, Lembang, Yogyakarta, Semarang, Surabaya, Gunung ataupun Laut semuanya ada di sini
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <BadgePercent size={27} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-[20px]">
                    Transaksi Mudah & Transparan
                  </p>
                  <p className="text-sm text-gray-500 text-[17px]">
                    Keamanan dan privasi transaksi online Anda menjadi prioritas kami.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  <Headset size={27} className="text-black" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-[20px]">
                    Layanan 24/7
                  </p>
                  <p className="text-sm text-gray-500 text-[17px]">
                    Tim support kami siap membantu ada kapanpun dan dimana pun
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=600&h=500&fit=crop"
                alt="Family on beach"
                className="w-full h-[420px] object-cover"
              />
            </div>

            <a
              href="#book"
              className="relative mt-6 flex items-center justify-center gap-3 rounded-2xl overflow-hidden h-20 group"
            >
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=200&fit=crop"
                alt="Book a trip"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 flex items-center justify-center gap-3 px-6">
                <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0">
                  <ArrowDownToLine size={18} className="text-gray-900" />
                </div>
                <span className="text-white font-bold text-xl tracking-wide">
                  Book A Trip Now
                </span>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}