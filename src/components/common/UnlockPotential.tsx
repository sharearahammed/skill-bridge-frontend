"use client";
import Image from "next/image";
import { FaBookOpen, FaUserGraduate } from "react-icons/fa";
import middleImage from "../../assets/PremiumContent.webp";

export default function UnlockPotential() {
  return (
    <section className="py-16 sm:py-20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
          Unlock Every Student’s True Potential
        </h2>

        {/* Short Bio */}
        <p className="text-center text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mb-12 md:mb-16">
          Empower students with guided lessons and personalized support. Learn
          at your own pace, master new skills, and achieve academic success.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-12 items-center">

          {/* Guided Lessons */}
          <div className="col-span-12 md:col-span-3 flex flex-col items-center text-center px-2 sm:px-4">

            <div className="bg-[#00B5BA]/20 text-[#00B5BA] 
            p-4 sm:p-5 rounded-full mb-5 sm:mb-6 flex items-center justify-center">
              <FaBookOpen size={24} className="sm:hidden" />
              <FaBookOpen size={26} className="hidden sm:block md:hidden" />
              <FaBookOpen size={28} className="hidden md:block" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Guided Lessons
            </h3>

            <p className="text-gray-600 text-sm sm:text-base">
              Step-by-step lessons designed to improve understanding and
              retention.
            </p>
          </div>

          {/* Middle Image */}
          <div className="col-span-12 md:col-span-6 flex justify-center order-first md:order-none">

            <div className="w-full max-w-xs sm:max-w-md md:max-w-lg relative aspect-square sm:aspect-[1.1]">
              <Image
                src={middleImage}
                alt="Student Learning"
                fill
                className="object-contain"
                priority
              />
            </div>

          </div>

          {/* Individual Support */}
          <div className="md:mt-0 mt-10 col-span-12 md:col-span-3 flex flex-col items-center text-center px-2 sm:px-4">

            <div className="bg-[#5672C4]/20 text-[#5672C4] 
            p-4 sm:p-5 rounded-full mb-5 sm:mb-6 flex items-center justify-center">
              <FaUserGraduate size={24} className="sm:hidden" />
              <FaUserGraduate size={26} className="hidden sm:block md:hidden" />
              <FaUserGraduate size={28} className="hidden md:block" />
            </div>

            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3">
              Support for Individual Learners
            </h3>

            <p className="text-gray-600 text-sm sm:text-base">
              Personalized guidance and mentoring to suit each student’s unique
              needs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}