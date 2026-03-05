"use client";
import Image from "next/image";
import { FaBookOpen, FaUserGraduate } from "react-icons/fa";
import middleImage from "../../assets/PremiumContent.webp";

export default function UnlockPotential() {
  return (
    <section className="py-20 bg-[#f0fbfb]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Unlock Every Student’s True Potential
        </h2>

        {/* Short Bio */}
        <p className="text-center text-gray-600 text-sm md:text-base max-w-2xl mx-auto mb-16">
          Empower students with guided lessons and personalized support. 
          Learn at your own pace, master new skills, and achieve academic success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-8">
          {/* Guided Lessons - 3 cols */}
          <div className="col-span-12 md:col-span-3 flex flex-col items-center text-center px-4">
            <div className="bg-[#00B5BA]/20 text-[#00B5BA] p-5 rounded-full mb-6">
              <FaBookOpen size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Guided Lessons
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Step-by-step lessons designed to improve understanding and retention.
            </p>
          </div>

          {/* Middle Image - 6 cols */}
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <Image
              src={middleImage}
              alt="Student Learning"
              width={500}
              height={500}
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Support for Individual Learners - 3 cols */}
          <div className="col-span-12 md:col-span-3 flex flex-col items-center text-center px-4">
            <div className="bg-[#5672C4]/20 text-[#5672C4] p-5 rounded-full mb-6">
              <FaUserGraduate size={28} />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
              Support for Individual Learners
            </h3>
            <p className="text-gray-600 text-sm md:text-base">
              Personalized guidance and mentoring to suit each student’s unique needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}