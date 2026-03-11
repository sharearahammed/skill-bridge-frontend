"use client";

import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import Image from "next/image";

type Student = { id: string; name: string; email: string; image?: string | null };
type Subject = { id: string; name: string };
type Review = { id: string; rating: number; comment: string; createdAt: string; student: Student };
type TutorReviewsPageProps = { user: { id: string; name: string; email: string } };

export default function TutorReviewsPage({ user }: TutorReviewsPageProps) {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const tutorId = user.id;

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorSubject/tutor/${tutorId}/subjects`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSubjects(data.data);
      if (data.data.length > 0) setSelectedSubject(data.data[0]);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
    }
  };

  const fetchReviews = async (categoryId: string) => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/tutor/${tutorId}/${categoryId}/reviews`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setReviews(data.data);
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSubjects(); }, []);
  useEffect(() => { if (selectedSubject) fetchReviews(selectedSubject.id); }, [selectedSubject]);

  const renderStars = (rating: number) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className={`w-5 h-5 ${i <= rating ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.357-2.44a1 1 0 00-1.176 0l-3.357 2.44c-.784.57-1.838-.197-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.044 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.287-3.957z" />
        </svg>
      ))}
    </div>
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      {/* Custom Dropdown */}
      <div className="relative w-64" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full border px-4 py-2 rounded-lg flex justify-between items-center bg-white shadow hover:ring-2 hover:ring-[#00B5BA] transition"
        >
          <span>{selectedSubject?.name || "Select Subject"}</span>
          <svg className={`w-5 h-5 transform transition ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <ul className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-lg shadow-lg">
            {subjects.map((s) => (
              <li
                key={s.id}
                onClick={() => { setSelectedSubject(s); setDropdownOpen(false); }}
                className={`px-4 py-2 cursor-pointer hover:bg-[#00B5BA] hover:text-white transition ${
                  selectedSubject?.id === s.id ? "bg-[#00B5BA] text-white font-semibold" : ""
                }`}
              >
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse mt-6">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">No reviews yet</p>
      ) : (
        <div className="grid gap-6 mt-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col md:flex-row justify-between gap-4 p-6 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <div className="flex gap-4 items-start">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#00B5BA] flex-shrink-0">
                  {review.student.image ? (
                    <Image src={review.student.image} alt={review.student.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-[#00B5BA] text-white font-bold text-xl">
                      {review.student.name[0]}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-gray-800">{review.student.name}</h3>
                  <p className="text-sm text-gray-500">{review.student.email}</p>
                  <p className="text-sm text-gray-600 mt-1">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(review.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
              </div>

              <div className="text-right flex flex-col justify-center items-end gap-2">
                {renderStars(review.rating)}
                <p className="text-sm font-medium text-gray-700">{review.rating}/5</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}