"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bannerImage from "../../assets/hero-image.webp";

export default function Banner() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    // Redirect with query parameter
    router.push(`/tutors/all?search=${encodeURIComponent(search)}`);
  };

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[650px] flex items-center overflow-hidden">
      <Image src={bannerImage} alt="Find the perfect tutor" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Find the Perfect Tutor for Your Success
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Browse verified tutors by subject, rating, and price. Book sessions instantly and start learning today.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-white p-2 md:rounded-full rounded-2xl shadow-lg max-w-xl">
            <input
              type="text"
              placeholder="Search by subject (e.g. Math, Programming)"
              className="flex-1 px-4 py-3 rounded-full outline-none text-gray-700 text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              className="bg-[#00B5BA] text-white px-6 py-3 rounded-full hover:bg-[#5672C4] transition font-semibold text-sm sm:text-base"
              onClick={handleSearch}
            >
              Find Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}