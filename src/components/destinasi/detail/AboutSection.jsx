import { Check } from "lucide-react";

const AboutSection = ({ dest }) => {
  const { description, highlights } = dest;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-xl font-bold mb-3 flex items-center gap-2 text-gray-900">
          <span className="w-1.5 h-6 rounded-full bg-primary" />
          <span>Tentang Destinasi</span>
        </h2>
        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
          {description}
        </p>
      </section>

      <section>
        <h3 className="text-lg font-bold mb-3 text-gray-900">Sorotan Utama & Fasilitas Lansia</h3>
        <div className="flex flex-wrap gap-2.5">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-primary-light text-primary border border-primary/20 text-xs sm:text-sm font-semibold"
            >
              <Check size={16} className="text-primary" />
              <span>{h}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AboutSection;