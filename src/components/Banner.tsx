"use client";
import Image from "next/image";
import bannerImage from "../assets/hero-image.webp";

export default function Banner() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] flex items-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={bannerImage}
        alt="Banner"
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Optional overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left text-white flex flex-col items-center md:items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#464646]">
          Discover a limitless world of learning
        </h1>
        <p className="mb-6 text-[#464646] text-lg md:text-xl lg:text-2xl text-center md:text-left">
          Explore 38,000+ teacher-created worksheets, hands-on activities, and learning games that build real skills!
        </p>
        <button className="bg-[#5672c4] text-white px-16 sm:px-20 py-3 rounded-full hover:bg-[#6483DF] transition font-bold text-[16px] sm:text-[17px]">
          Join for free
        </button>
      </div>
    </section>
  );
}