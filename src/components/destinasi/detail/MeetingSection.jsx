import { Clock, MapPin } from "lucide-react";

const MeetingSection = ({ dest }) => {
  const { meetingPoints } = dest;

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <span className="w-1.5 h-6 rounded-full bg-primary" />
        <span>Titik Kumpul Penjemputan</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {meetingPoints?.map((mp, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-white shadow-xs border border-gray-200 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-primary-light text-primary shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <h3 className="font-bold text-base text-gray-900">{mp.time}</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={12} />
                  <span>{mp.location}</span>
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{mp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MeetingSection;