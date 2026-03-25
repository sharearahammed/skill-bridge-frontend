"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

type Category = { id: string; name: string };

export default function AllTutorsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("categoryId") || "all";
  const initialMinRating = Number(searchParams.get("minRating") || 0);
  const initialMaxRate = Number(searchParams.get("maxRate") || 1000);

  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loadingTutors, setLoadingTutors] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [filters, setFilters] = useState({
    search: initialSearch,
    categoryId: initialCategory,
    minRating: initialMinRating,
    maxRate: initialMaxRate,
  });

  // Fetch Categories
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

  // Fetch Tutors
  const fetchTutors = useCallback(
    async (filt = filters) => {
      try {
        setLoadingTutors(true);
        const params = new URLSearchParams();

        if (filt.search) params.append("search", filt.search);
        if (filt.categoryId && filt.categoryId !== "all")
          params.append("categoryId", filt.categoryId);
        if (filt.minRating)
          params.append("minRating", filt.minRating.toString());
        if (filt.maxRate) params.append("maxRate", filt.maxRate.toString());

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/allTutors?${params.toString()}`,
        );

        const data = await res.json();
        setTutors(data.data || []);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      } finally {
        setLoadingTutors(false);
      }
    },
    [filters],
  );

  // Update URL
  const updateURL = useCallback(
    (filt: typeof filters) => {
      const params = new URLSearchParams();

      if (filt.search) params.append("search", filt.search);
      if (filt.categoryId && filt.categoryId !== "all")
        params.append("categoryId", filt.categoryId);
      if (filt.minRating) params.append("minRating", filt.minRating.toString());
      if (filt.maxRate) params.append("maxRate", filt.maxRate.toString());

      router.replace(`/tutors/all?${params.toString()}`);
    },
    [router],
  );

  // Debounced Search
  const debouncedSearch = useMemo(
    () =>
      debounce((searchValue: string) => {
        const newFilters = { ...filters, search: searchValue };
        fetchTutors(newFilters);
        updateURL(newFilters);
      }, 500),
    [filters, fetchTutors, updateURL],
  );

  // Initial Load
  useEffect(() => {
    fetchCategories();
    fetchTutors(filters);
  }, []);

  // Live Search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchTutors(filters);
      updateURL(filters);
    }, 500);

    return () => clearTimeout(handler);
  }, [filters.search]);

  const handleApplyFilters = () => {
    fetchTutors(filters);
    updateURL(filters);
  };

  // Skeleton Component
  const TutorSkeleton = () => (
    <div className="p-5 rounded-lg border border-gray-100 animate-pulse flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-gray-200 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </div>
      <div className="h-3 bg-gray-200 rounded w-1/3 mt-3" />
      <div className="h-6 bg-gray-200 rounded mt-2" />
      <div className="h-10 bg-gray-200 rounded mt-auto" />
    </div>
  );

  const CategorySkeleton = () => (
    <div className="h-10 bg-gray-200 rounded w-full animate-pulse" />
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* TITLE */}
      <h1 className="mt-8 text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center sm:text-left">
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

              {loadingCategories ? (
                <CategorySkeleton />
              ) : (
                <Select
                  value={filters.categoryId}
                  onValueChange={(value) =>
                    setFilters({ ...filters, categoryId: value })
                  }
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
              )}
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                Min Rating:
                <span className="text-[#00B5BA] ml-1">{filters.minRating}</span>
              </p>

              <Slider
                defaultValue={[filters.minRating]}
                min={0}
                max={5}
                step={0.5}
                onValueChange={(value) =>
                  setFilters({ ...filters, minRating: value[0] })
                }
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">
                Max Price:
                <span className="text-[#00B5BA] ml-1">${filters.maxRate}</span>
              </p>

              <Slider
                defaultValue={[filters.maxRate]}
                max={1000}
                step={5}
                onValueChange={(value) =>
                  setFilters({ ...filters, maxRate: value[0] })
                }
              />
            </div>

            <Button
              onClick={handleApplyFilters}
              className="w-full bg-[#00B5BA] hover:bg-[#00979b] text-white font-semibold"
            >
              Apply Filters
            </Button>
          </Card>
        </div>

        {/* TUTORS GRID */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loadingTutors
            ? Array.from({ length: 6 }).map((_, idx) => (
                <TutorSkeleton key={idx} />
              ))
            : tutors.length === 0 && (
                <p className="col-span-full text-center text-gray-500">
                  No tutors found
                </p>
              )}

          {!loadingTutors &&
            tutors.map((tutor) => (
              <Card
                key={tutor.user.id}
                className="p-5 hover:shadow-2xl transition-transform transform hover:-translate-y-1 rounded-lg border border-gray-100 flex flex-col"
              >
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 relative rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={tutor.user.image || defaultImage}
                      alt={tutor.user.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {tutor.user.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      ⭐{" "}
                      <span className="text-[#00B5BA]">
                        {(tutor.rating || 0).toFixed(1)}
                      </span>{" "}
                      ({tutor._count.reviews} reviews)
                    </p>
                  </div>
                </div>

                {/* Subjects */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {tutor.tutorSubjects.map((sub) => (
                    <span
                      key={sub.category.id}
                      className="text-xs bg-[#E6F7F7] text-[#00B5BA] px-2 py-1 rounded-full"
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
                    className="w-full mt-3 border-[#00B5BA] text-[#00B5BA] hover:bg-[#00B5BA] hover:text-white"
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