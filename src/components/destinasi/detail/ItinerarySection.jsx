const ItinerarySection = ({ dest, shortLocation }) => {
  const { itinerary } = dest;

  return (
    <section>
      <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
        <span className="w-1.5 h-6 rounded-full bg-primary" />
        <span>Rencana Perjalanan</span>
      </h2>
      <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
        {itinerary?.map((item, idx) => (
          <div key={idx} className="relative flex items-start gap-4 md:gap-8 md:even:flex-row-reverse group">
            <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-white bg-primary text-white shadow-xs shrink-0 z-10 font-bold text-xs">
              {item.day}
            </div>
            <div className="flex-1 p-5 rounded-xl bg-white shadow-xs border border-gray-200 transition-colors hover:border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-primary">Hari {item.day}</span>
                <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">
                  {shortLocation}
                </span>
              </div>
              <h3 className="font-bold text-base text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ItinerarySection;