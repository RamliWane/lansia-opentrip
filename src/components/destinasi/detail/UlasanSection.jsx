"use client";

import { useState } from "react";
import { Star } from "lucide-react";

const UlasanSection = ({ dest }) => {
  const [ratingFilter, setRatingFilter] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const { reviewsList } = dest;

  const filteredReviews = ratingFilter
    ? reviewsList?.filter((r) => Math.floor(r.rating) === ratingFilter)
    : reviewsList;

  const displayedReviews = showAllReviews ? filteredReviews : filteredReviews?.slice(0, 2);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <span className="w-1.5 h-6 rounded-full bg-primary" />
          <span>Ulasan Peserta</span>
        </h2>

        <div className="flex items-center gap-2 text-xs font-medium overflow-x-auto pb-2 sm:pb-0">
          <button
            onClick={() => setRatingFilter(null)}
            className={`px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap cursor-pointer ${
              ratingFilter === null
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-600 border-gray-200 hover:border-primary"
            }`}
          >
            Semua
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setRatingFilter(star)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors whitespace-nowrap cursor-pointer ${
                ratingFilter === star
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary"
              }`}
            >
              <span>{star}</span>
              <Star size={12} className={ratingFilter === star ? "fill-white text-white" : "fill-primary text-primary"} />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {displayedReviews && displayedReviews.length > 0 ? (
          displayedReviews.map((review, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-white shadow-xs border border-gray-200">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {review.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{review.author}</h3>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-primary-light border border-primary/20 px-2 py-1 rounded-md">
                  <Star size={12} className="text-primary fill-primary" />
                  <span className="font-bold text-xs text-gray-900">{review.rating.toFixed(1)}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">"{review.comment}"</p>

              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {review.images.map((img, imgIdx) => (
                    <img
                      key={imgIdx}
                      src={img}
                      alt={`Foto ulasan dari ${review.author}`}
                      className="h-16 w-16 object-cover rounded-lg border border-gray-200"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-sm text-gray-500 bg-gray-50 rounded-xl border border-gray-200">
            Belum ada ulasan untuk rating ini.
          </div>
        )}
      </div>

      {filteredReviews && filteredReviews.length > 2 && (
        <button
          onClick={() => setShowAllReviews(!showAllReviews)}
          className="mt-4 w-full py-2.5 rounded-lg border border-gray-300 font-semibold text-xs text-gray-700 hover:border-primary hover:text-primary transition-colors cursor-pointer"
        >
          {showAllReviews ? "Tampilkan Lebih Sedikit" : `Lihat Semua Ulasan (${filteredReviews.length})`}
        </button>
      )}
    </section>
  );
};

export default UlasanSection;