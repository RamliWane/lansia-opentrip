const ContactHeader = () => {
  return (
    <section className="relative bg-gray-900 text-white py-20 sm:py-24">
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-primary text-xs uppercase font-semibold tracking-wider block mb-2">
          HUBUNGI KAMI
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Konsultasi & Layanan Informasi <span className="text-primary">Lansia OpenTrip</span>
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Tim konsultan kami siap melayani pertanyaan seputar pilihan paket wisata, pendampingan kesehatan, maupun permintaan khusus untuk perjalanan Anda.
        </p>
      </div>
    </section>
  );
};

export default ContactHeader;
