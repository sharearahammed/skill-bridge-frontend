"use client";

import backgroundImage from "../assets/getAccess.jpg";
import Link from "next/link";

export default function GetAccessToday() {
  return (
    <section
      className="relative w-full min-h-[700px] flex items-center bg-fixed bg-center bg-cover"
      style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}
    >
      {/* Soft dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-white">

          {/* Tagline */}
          <p className="uppercase tracking-widest text-sm text-[#00B5BA] font-semibold mb-4">
            Learn Smarter
          </p>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Unlock Your Potential <br /> With Expert Tutors
          </h1>

          {/* Description */}
          <p className="text-lg text-gray-200 mb-10 leading-relaxed">
            Personalized tutoring sessions designed to help you achieve
            academic excellence and real-world skills. Learn at your pace,
            from the best.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/register"
              className="bg-[#00B5BA] hover:bg-[#009ca1] text-white px-10 py-4 rounded-md font-semibold text-lg transition-all duration-300"
            >
              Get Started
            </Link>

            <Link
              href="/tutors"
              className="border border-white text-white hover:bg-white hover:text-black px-10 py-4 rounded-md font-semibold text-lg transition-all duration-300"
            >
              Browse Tutors
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}