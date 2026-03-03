import Link from "next/link";
import Image from "next/image";
import { Tutor } from "../app/tutors/page";

export default function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 p-6 flex flex-col">
      
      {/* Top Section */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src={tutor.user.image || "/default-avatar.png"}
          alt={tutor.user.name}
          width={60}
          height={60}
          className="rounded-full object-cover"
        />

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {tutor.user.name}
          </h3>
          <p className="text-sm text-gray-500">
            {/* {tutor.category?.name || "General Tutor"} */}
          </p>
        </div>
      </div>

      {/* Bio */}
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">
        {tutor.bio || "Experienced tutor helping students achieve their academic goals."}
      </p>

      {/* Rating + Price */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 text-[#00B5BA] font-medium">
          ⭐ {tutor.rating?.toFixed(1) || "0.0"}
        </div>

        <div className="text-[#00B5BA] font-bold text-lg">
          ${tutor.pricePerHour}
          <span className="text-sm text-gray-500 font-normal"> /hr</span>
        </div>
      </div>

      {/* Button */}
      <Link
        href={`/tutors/${tutor.id}`}
        className="mt-auto bg-[#00B5BA] text-white text-center py-2 rounded-lg font-semibold hover:bg-[#5672C4] transition-colors"
      >
        View Profile
      </Link>
    </div>
  );
}