"use client";

import backgroundImage from "../../assets/getAccess.jpg";
import Link from "next/link";

export default function GetAccessToday() {
  return (
    <section
      className="relative w-full min-h-[500px] md:min-h-[650px] flex items-center 
      bg-center bg-cover md:bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-white max-w-2xl">

          {/* Tagline */}
          <p className="uppercase tracking-widest text-xs sm:text-sm text-[#00B5BA] font-semibold mb-3 sm:mb-4">
            Learn Smarter
          </p>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6">
            Unlock Your Potential <br className="hidden sm:block" />
            With Expert Tutors
          </h1>

          {/* Description */}
          <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 sm:mb-10 leading-relaxed">
            Personalized tutoring sessions designed to help you achieve
            academic excellence and real-world skills. Learn at your pace,
            from the best.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">

            <Link
              href="/register"
              className="bg-[#00B5BA] hover:bg-[#009ca1] text-white 
              px-6 sm:px-8 md:px-10 py-3 sm:py-4 
              rounded-md font-semibold text-sm sm:text-base md:text-lg 
              text-center transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              href="/tutors"
              className="border border-white text-white hover:bg-white hover:text-black 
              px-6 sm:px-8 md:px-10 py-3 sm:py-4 
              rounded-md font-semibold text-sm sm:text-base md:text-lg 
              text-center transition-all duration-300"
            >
              Browse Tutors
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}