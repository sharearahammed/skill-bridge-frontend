"use client";

import {
  FaCode,
  FaCalculator,
  FaBook,
  FaFlask,
  FaGlobe,
  FaMusic,
} from "react-icons/fa";

const categories = [
  { name: "Programming", icon: FaCode },
  { name: "Mathematics", icon: FaCalculator },
  { name: "English", icon: FaBook },
  { name: "Science", icon: FaFlask },
  { name: "Languages", icon: FaGlobe },
  { name: "Music", icon: FaMusic },
];

export default function CategoriesSection() {
  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Explore Popular Categories
          </h2>

          <p className="text-gray-500 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Discover expert tutors across a variety of subjects and boost your
            learning journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <div
                key={index}
                className="group relative flex flex-col items-center bg-[#f0fbfb] 
                rounded-xl p-6 sm:p-8 md:p-10 shadow-md 
                hover:shadow-xl transition-all duration-300 
                hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className="bg-[#00B5BA] text-white 
                  p-4 sm:p-5 md:p-6 rounded-full mb-5 sm:mb-6 
                  shadow-md transform transition-transform duration-300 
                  group-hover:scale-110 group-hover:shadow-lg"
                >
                  <Icon size={28} className="sm:hidden" />
                  <Icon size={32} className="hidden sm:block md:hidden" />
                  <Icon size={36} className="hidden md:block" />
                </div>

                {/* Category Name */}
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-[#00B5BA] transition-colors">
                  {category.name}
                </h3>

                {/* Description */}
                <p className="text-gray-500 text-xs sm:text-sm mt-2 text-center group-hover:text-[#5672C4] transition-colors">
                  Expert tutors to help you master {category.name}.
                </p>

                {/* Decorative Shape */}
                <div className="absolute -bottom-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-[#5672C4]/10 rotate-12 rounded-xl hidden md:block"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
