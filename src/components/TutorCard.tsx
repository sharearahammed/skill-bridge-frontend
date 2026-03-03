import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { Tutor } from "../app/tutors/page";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div
      className="bg-white border border-gray-100 rounded-2xl p-6 
                    hover:shadow-xl transition-all duration-300 
                    hover:-translate-y-1 flex flex-col"
    >
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-4">
        <div className="relative">
          <Image
            src={tutor.user.image || "/default-avatar.png"}
            alt={tutor.user.name}
            width={72}
            height={72}
            className="rounded-full object-cover ring-2 ring-[#00B5BA]/30"
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {tutor.user.name}
          </h3>

          <p className="text-xs text-[#00B5BA] font-medium mt-1 bg-[#00B5BA]/10 px-3 py-1 rounded-full inline-block">
            {tutor.category?.name || "General Tutor"}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-5">
        {tutor.bio ||
          "Experienced tutor helping students achieve their academic goals."}
      </p>

      {/* Rating + Price */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-full text-sm font-medium text-yellow-600">
          <FaStar className="text-yellow-500" size={14} />
          {tutor.rating?.toFixed(1) || "0.0"}
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Starting from</p>
          <p className="text-xl font-bold text-[#00B5BA]">
            ${tutor.pricePerHour}
            <span className="text-sm text-gray-500 font-normal"> /hr</span>
          </p>
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/tutors/${tutor.id}`}
        className="mt-auto bg-[#00B5BA] text-white text-center py-2.5 
                   rounded-xl font-semibold 
                   hover:bg-[#009ca1] transition-all duration-300"
      >
        View Profile
      </Link>
    </div>
  );
}
