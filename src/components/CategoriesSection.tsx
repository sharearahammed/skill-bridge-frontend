"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaCode,
  FaCalculator,
  FaBook,
  FaFlask,
  FaGlobe,
  FaMusic,
} from "react-icons/fa";
import { IconType } from "react-icons/lib";

type Category = {
  id: string; // backend থেকে আসা unique category id
  name: string;
  description?: string;
};

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
      );
      const data = await res.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const iconMap: Record<string, IconType> = {
    Programming: FaCode,
    Mathematics: FaCalculator,
    English: FaBook,
    Science: FaFlask,
    Languages: FaGlobe,
    Music: FaMusic,
    Chemistry: FaFlask,
    Physics: FaFlask,
    Biology: FaFlask,
    ICT: FaCode,
    "Computer Science": FaCode,
    Accounting: FaCalculator,
    Economics: FaCalculator,
  };

  const SkeletonCard = () => (
    <div className="animate-pulse flex flex-col items-center bg-[#f0fbfb] rounded-xl p-6 sm:p-8 md:p-10 shadow-md">
      <div className="bg-[#00B5BA]/50 w-16 h-16 rounded-full mb-5 sm:mb-6"></div>
      <div className="bg-gray-300 h-5 w-24 rounded mb-2"></div>
      <div className="bg-gray-200 h-3 w-32 rounded"></div>
    </div>
  );

  const handleCardClick = (categoryId: string) => {
    router.push(`/tutors/all?categoryId=${categoryId}&maxRate=1000`);
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8">
            Explore Popular Categories
          </h2>
          <p className="text-gray-500 mt-3 sm:mt-4 text-base sm:text-lg max-w-xl mx-auto">
            Discover expert tutors across a variety of subjects and boost your
            learning journey.
          </p>
        </div>

        {/* Grid */}
        {loadingCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {categories.slice(2, 8).map((category) => {
              const Icon = iconMap[category.name] || FaBook;

              return (
                <div
                  key={category.id}
                  onClick={() => handleCardClick(category.id)}
                  className="cursor-pointer group relative flex flex-col items-center bg-[#f0fbfb] 
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
                    {category.description ||
                      `Expert tutors to help you master ${category.name}.`}
                  </p>

                  {/* Decorative Shape */}
                  <div className="absolute -bottom-4 -right-4 w-16 sm:w-20 h-16 sm:h-20 bg-[#5672C4]/10 rotate-12 rounded-xl hidden md:block"></div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
