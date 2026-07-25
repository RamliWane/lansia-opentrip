import { Star, MapPin } from "lucide-react";
import { formatNumber } from "@/lib/format";

const DestinationHeader = ({ dest }) => {
  const { category, rating, reviewCount, title, location } = dest;

  return (
    <div className="mb-6 mt-4">
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-primary">
          {category}
        </span>
        <span className="flex items-center gap-1.5 text-primary font-semibold bg-primary-light px-3 py-1 rounded-full text-xs border border-primary/20">
          <Star size={14} className="fill-primary text-primary" />
          <span>{rating.toFixed(1)}</span>
          <span className="text-gray-500 font-normal">({formatNumber(reviewCount)} ulasan)</span>
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-gray-900">
        {title}
      </h1>
      <div className="flex items-center gap-2 text-gray-600 text-sm sm:text-base font-medium">
        <MapPin size={18} className="text-primary" />
        <span>{location}</span>
      </div>
    </div>
  );
};

export default DestinationHeader;