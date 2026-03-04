"use client";
import Image from "next/image";
import bannerImage from "../assets/hero-image.webp";

export default function Banner() {
  return (
    <section className="relative w-full h-[500px] md:h-[650px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerImage}
        alt="Find the perfect tutor"
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 w-full text-white">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Find the Perfect Tutor for Your Success
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Browse verified tutors by subject, rating, and price. 
            Book sessions instantly and start learning today.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-2 rounded-full shadow-lg max-w-xl">
            <input
              type="text"
              placeholder="Search by subject (e.g. Math, Programming)"
              className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
            />
            <button className="bg-[#00B5BA] text-white px-6 py-2 rounded-full hover:bg-[#5672C4] transition font-semibold">
              Find Tutor
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="mt-6 flex gap-4 flex-wrap">
            <button className="bg-[#00B5BA] px-8 py-3 rounded-full font-semibold hover:bg-[#5672C4] transition">
              Get Started
            </button>

            <button className="border border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition">
              Become a Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}