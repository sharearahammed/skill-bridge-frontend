"use client";

import Link from "next/link";
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
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Explore Popular Categories
          </h2>
          <p className="text-gray-500 mt-4 text-lg max-w-xl mx-auto">
            Discover expert tutors across a variety of subjects and boost your learning journey.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={index}
                href={`/tutors?category=${category.name}`}
                className="group relative flex flex-col items-center bg-[#f0fbfb] rounded-xl p-10 shadow-md 
                           hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
              >
                {/* Icon in Gradient Circle (primary → secondary) */}
                <div  className="bg-[#00B5BA] text-white p-6 rounded-full mb-6 shadow-md 
             transform transition-transform duration-300 group-hover:scale-110 
             group-hover:shadow-lg">
                  <Icon size={36} />
                </div>

                {/* Category Name */}
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#00B5BA] transition-colors">
                  {/* {category.name} */}
                </h3>

                {/* Small Description */}
                <p className="text-gray-500 text-sm mt-2 text-center group-hover:text-[#5672C4] transition-colors">
                  Expert tutors to help you master {category.name}.
                </p>

                {/* Decorative Tilted Shape with secondary color */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#5672C4]/10 rotate-12 rounded-xl hidden md:block"></div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}