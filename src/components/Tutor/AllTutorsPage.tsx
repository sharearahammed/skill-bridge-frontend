"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import defaultImage from "../../assets/people avatar.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { debounce } from "lodash";
import { useSearchParams, useRouter } from "next/navigation";

interface Tutor {
  user: { id: string; name: string; image: string };
  rating: number;
  pricePerHour: number;
  tutorSubjects: { category: { id: string; name: string } }[];
  _count: { reviews: number };
}

type Category = { id: string; name: string; createdAt: string };

export default function AllTutorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState({
    search: initialSearch,
    categoryId: "all",
    minRating: 0,
    maxRate: 1000,
  });

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);
      const data = await res.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  // Fetch tutors
  const fetchTutors = async (filt = filters) => {
    try {
      const params = new URLSearchParams();
      if (filt.search) params.append("search", filt.search);
      if (filt.categoryId && filt.categoryId !== "all") params.append("categoryId", filt.categoryId);
      if (filt.minRating) params.append("minRating", filt.minRating.toString());
      if (filt.maxRate) params.append("maxRate", filt.maxRate.toString());

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/allTutors?${params.toString()}`);
      const data = await res.json();
      setTutors(data.data || []);
    } catch (error) {
      console.error("Failed to fetch tutors", error);
    }
  };

  // Debounced search
  const debouncedSearch = debounce((searchValue: string) => {
    fetchTutors({ ...filters, search: searchValue });
    const params = new URLSearchParams();
    if (searchValue) params.append("search", searchValue);
    if (filters.categoryId && filters.categoryId !== "all") params.append("categoryId", filters.categoryId);
    router.replace(`/tutors/all?${params.toString()}`);
  }, 500);

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchTutors({ ...filters, search: initialSearch });
  }, []);

  // Sync search from URL
  useEffect(() => {
    if (initialSearch) {
      setFilters((prev) => ({ ...prev, search: initialSearch }));
    }
  }, [initialSearch]);

  // Live search
  useEffect(() => {
    if (filters.search) {
      debouncedSearch(filters.search);
    }
    return () => debouncedSearch.cancel();
  }, [filters.search]);

  // Apply Filters button
  const handleApplyFilters = () => {
    fetchTutors(filters);

    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.categoryId && filters.categoryId !== "all") params.append("categoryId", filters.categoryId);
    if (filters.minRating) params.append("minRating", filters.minRating.toString());
    if (filters.maxRate) params.append("maxRate", filters.maxRate.toString());

    router.replace(`/tutors/all?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center sm:text-left">
        Find Your Tutor
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* FILTER SIDEBAR */}
        <div className="lg:w-1/4 flex-shrink-0 space-y-6">
          <Card className="p-6 space-y-6 shadow-lg border border-gray-100">
            <h3 className="font-semibold text-lg text-gray-700">Filters</h3>

            {/* Category */}
            <div className="space-y-1">
              <p className="text-sm font-medium text-gray-600">Category</p>
              <Select
                value={filters.categoryId}
                onValueChange={(value) => setFilters({ ...filters, categoryId: value })}
              >
                <SelectTrigger className="border-gray-300 hover:border-[#00B5BA] focus:border-[#00B5BA]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Min Rating */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                Min Rating: <span className="text-[#00B5BA]">{filters.minRating}</span>
              </p>
              <Slider
                defaultValue={[0]}
                min={0}
                max={5}
                step={0.5}
                className="accent-[#00B5BA]"
                onValueChange={(value) => setFilters({ ...filters, minRating: value[0] })}
              />
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                Max Price: <span className="text-[#00B5BA]">${filters.maxRate}</span>
              </p>
              <Slider
                defaultValue={[1000]}
                max={1000}
                step={5}
                className="accent-[#00B5BA]"
                onValueChange={(value) => setFilters({ ...filters, maxRate: value[0] })}
              />
            </div>

            <Button
              onClick={handleApplyFilters}
              className="w-full bg-[#00B5BA] hover:bg-[#00979b] text-white font-semibold shadow-md transition-colors rounded-lg"
            >
              Apply Filters
            </Button>
          </Card>
        </div>

        {/* TUTOR GRID */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <Card
              key={tutor.user.id}
              className="p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1 rounded-lg border border-gray-100 flex flex-col"
            >
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 relative rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                  <Image
                    src={tutor.user.image || defaultImage}
                    alt={tutor.user.name || "Tutor profile image"}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{tutor.user.name}</p>
                  <p className="text-sm text-gray-500">
                    ⭐ <span className="text-[#00B5BA]">{(tutor.rating || 0).toFixed(1)}</span> ({tutor._count.reviews} reviews)
                  </p>
                </div>
              </div>

              {/* Subjects */}
              <div className="flex flex-wrap gap-2 mt-3">
                {tutor.tutorSubjects.map((sub) => (
                  <span
                    key={sub.category.id}
                    className="text-xs bg-[#E6F7F7] text-[#00B5BA] px-2 py-1 rounded-full font-medium"
                  >
                    {sub.category.name}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="mt-4 font-semibold text-[#00B5BA] text-lg">
                ${tutor.pricePerHour}/hr
              </p>

              <Link href={`/tutors/${tutor.user.id}`} className="mt-auto">
                <Button
                  variant="outline"
                  className="w-full mt-3 border-[#00B5BA] text-[#00B5BA] hover:bg-[#00B5BA] hover:text-white transition-colors font-medium"
                >
                  View Profile
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}