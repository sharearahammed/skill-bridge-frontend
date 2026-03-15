"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import bannerImage from "../../assets/hero-image.webp";

type Category = {
  id: string;
  name: string;
};

export default function Banner() {
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  // fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`
        );
        const data = await res.json();
        setCategories(data.data || []);
      } catch (error) {
        console.log("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = () => {
    if (!selectedCategory) return;

    router.push(`/tutors/all?categoryId=${selectedCategory.id}`);
  };

  return (
    <section className="relative w-full min-h-[520px] md:min-h-[650px] flex items-center overflow-hidden">
      <Image
        src={bannerImage}
        alt="Find the perfect tutor"
        fill
        className="object-cover"
        priority
      />

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full text-white">
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
            Find the Perfect Tutor for Your Success
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
            Browse verified tutors by subject, rating, and price. Book sessions
            instantly and start learning today.
          </p>

          {/* CUSTOM DROPDOWN */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl sm:rounded-full shadow-lg max-w-xl relative">

            {/* Dropdown */}
            <div className="flex-1 relative">
              <button
                onClick={() => setOpen(!open)}
                className="w-full text-left px-4 py-3 rounded-full text-gray-700 text-sm sm:text-base"
              >
                {selectedCategory
                  ? selectedCategory.name
                  : "Select Subject"}
              </button>

              {open && (
                <div className="absolute top-14 left-0 w-full bg-white rounded-xl shadow-xl max-h-60 h-41 overflow-y-auto z-50">
                  {categories.map((cat) => (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer hover:bg-[#E6F7F7] text-gray-700"
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Button */}
            <button
              onClick={handleSearch}
              className="bg-[#00B5BA] text-white px-6 py-3 rounded-full hover:bg-[#5672C4] transition font-semibold text-sm sm:text-base"
            >
              Find Tutor
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}