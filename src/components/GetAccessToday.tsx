"use client";

import Image from "next/image";
import backgroundImage from "../assets/getAccess.jpg";
import Link from "next/link";

export default function GetAccessToday() {
  return (
    <section className="relative w-full min-h-[650px] flex items-center">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Get Access Today"
        className="absolute inset-0 w-full h-full object-cover"
        priority
      />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50"></div>

      {/* Decorative Circles */}
      <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#00B5BA]/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-[#5672C4]/20 rounded-full blur-3xl animate-pulse"></div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center text-white">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          Get Access Today!
        </h1>

        {/* Small Bio */}
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Join thousands of learners and unlock personalized tutoring sessions 
          tailored to your goals. Start improving today and reach your full potential.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link
            href="/register"
            className="bg-[#00B5BA] hover:bg-[#00a7aa] text-white px-12 py-4 rounded-full font-semibold text-lg shadow-lg transform transition-all duration-300 hover:scale-105"
          >
            Join Now
          </Link>

          <Link
            href="/tutors"
            className="border-2 border-white text-white hover:bg-white hover:text-black px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300"
          >
            Browse Tutors
          </Link>
        </div>
      </div>
    </section>
  );
}