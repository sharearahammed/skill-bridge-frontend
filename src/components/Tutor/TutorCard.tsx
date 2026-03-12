import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import defaultImage from "../../assets/people avatar.png";

type Tutor = {
  id: string;
  bio: string;
  rating: number;
  pricePerHour: number;
  user: {
    id: string;
    name: string;
    image?: string | null;
  };
  reviews: { rating: number; comment: string }[];
  reviewCount: number;
  category: {
    id: string;
    categoryId: string;
    category: { id: string; name: string };
  }[];
};

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  const firstCategory = tutor.category?.[0]?.category?.name || "General Tutor";

  const displayRating =
    tutor.reviewCount > 0
      ? (
          tutor.reviews.reduce((acc, r) => acc + r.rating, 0) /
          tutor.reviews.length
        ).toFixed(1)
      : "0.0";

  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl 
      p-4 sm:p-5 md:p-6
      hover:shadow-xl transition-all duration-300 
      hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Top Section */}
      <div className="flex items-center gap-3 sm:gap-4 mb-4">
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex-shrink-0">
          <Image
            src={tutor.user.image || defaultImage}
            alt={tutor.user.name}
            fill
            className="rounded-full object-cover ring-2 ring-[#00B5BA]/30"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 truncate">
            {tutor.user.name}
          </h3>

          <p className="text-[10px] sm:text-xs text-[#00B5BA] font-medium mt-1 bg-[#00B5BA]/10 px-2 sm:px-3 py-1 rounded-full inline-block">
            {firstCategory}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 sm:mb-5">
        {tutor.bio ||
          "Experienced tutor helping students achieve their academic goals."}
      </p>

      {/* Rating + Price */}
      <div className="flex items-center justify-between mb-4 sm:mb-5 gap-2">
        <div className="flex items-center gap-1 sm:gap-2 bg-yellow-50 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-yellow-600 whitespace-nowrap">
          <FaStar className="text-yellow-500" size={12} />
          {displayRating} ({tutor.reviewCount})
        </div>

        <div className="text-right">
          <p className="text-[10px] sm:text-xs text-gray-500">Starting from</p>

          <p className="text-base sm:text-lg md:text-xl font-bold text-[#00B5BA]">
            ${tutor.pricePerHour}
            <span className="text-xs sm:text-sm text-gray-500 font-normal">
              {" "}
              /hr
            </span>
          </p>
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/tutors/${tutor.user.id}`}
        className="mt-auto bg-[#00B5BA] text-white text-center 
        py-2 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-base
        hover:bg-[#009ca1] transition-all duration-300"
      >
        View Profile
      </Link>
    </div>
  );
}
