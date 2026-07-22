export default function CTASection() {
  return (
    <section id="hubungi" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative px-8 sm:px-16 py-16 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Siap untuk Petualangan Baru?
            </h2>
            <p className="text-white/80 max-w-xl mx-auto mb-8">
              Jangan lewatkan penawaran spesial kami. Booking sekarang dan dapatkan harga terbaik untuk perjalanan impianmu!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="bg-white text-emerald-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Booking Sekarang
              </button>
              <button className="border-2 border-white/40 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-colors">
                Lihat Semua Trip
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
