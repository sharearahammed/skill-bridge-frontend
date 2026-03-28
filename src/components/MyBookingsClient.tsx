"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Types
type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  status: string;
  tutor: {
    id: string;
    user: {
      name: string;
      email: string;
      image?: string;
    };
    bio?: string;
    pricePerHour?: number;
    reviews?: Review[];
  };
  studentId: string; // needed for review API
  tutorId: string; // needed for review API
  availability?: { subjectId: string };
};

type Review = {
  id: string;
  rating: number;
  comment?: string;
  category: { id: string; name: string };
};

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(3);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchBookings = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/my-booking`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      setBookings(data.data || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
      toast.error("Failed to fetch bookings");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Review Handlers
  const startEditReview = (review: Review, booking: Booking) => {
    setReviewText(review.comment || "");
    setReviewRating(review.rating);
    setEditingReviewId(review.id);
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const startNewReview = (booking: Booking) => {
    setSelectedBooking(booking);
    setReviewText("");
    setReviewRating(3);
    setEditingReviewId(null);
    setIsModalOpen(true);
  };
  console.log({ selectedBooking });

  const handleReviewSubmit = async () => {
    if (!selectedBooking) return;

    const url = editingReviewId
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/${editingReviewId}`
      : `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`;
    const method = editingReviewId ? "PATCH" : "POST";

    const body = editingReviewId
      ? { rating: reviewRating, comment: reviewText }
      : {
          studentId: selectedBooking.studentId,
          tutorId: selectedBooking.tutorId,
          categoryId: selectedBooking.availability?.subjectId,
          rating: reviewRating,
          comment: reviewText,
        };

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(
          editingReviewId ? "Review updated!" : "Review submitted!",
        );
      } else {
        toast.error(data.message || "Failed to submit review");
      }

      setReviewText("");
      setReviewRating(3);
      setEditingReviewId(null);
      setSelectedBooking(null);
      setIsModalOpen(false);
      fetchBookings();
    } catch (err) {
      console.error("Failed to submit review:", err);
      toast.error("Failed to submit review");
    }
  };

  // Attend Session Handler
  const handleAttendSession = async (bookingId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/attend/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      const data = await res.json();
      if (data.success) {
        toast.success("Session marked as attended!");
        fetchBookings();
      } else {
        toast.error(data.message || "Failed to attend session");
      }
    } catch (err) {
      console.error("Failed to attend session:", err);
      toast.error("Failed to attend session");
    }
  };
  console.log("bookings", bookings);

  if (!bookings || bookings.length === 0) {
    return <div className="text-center">No bookings found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Bookings List */}
      {bookings?.map((booking) => (
        <div
          key={booking.id}
          className="flex items-center justify-between p-4 border border-gray-200 rounded-xl shadow-md hover:shadow-lg transition duration-200 bg-white"
        >
          {/* Tutor Info */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 relative rounded-full border-2 border-gray-100 overflow-hidden">
              <Image
                src={booking.tutor.user.image || "/default-avatar.png"}
                alt="Tutor"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="overflow-hidden">
              <h3 className="font-semibold text-gray-800 truncate">
                {booking.tutor.user.name}
              </h3>
              {booking.tutor.bio && (
                <p className="text-gray-500 text-sm truncate max-w-xs">
                  {booking.tutor.bio}
                </p>
              )}
              <p className="text-gray-500 text-sm mt-1">
                ${booking.tutor.pricePerHour}/hour
              </p>
            </div>
          </div>

          {/* Booking Info */}
          <div className="text-right space-y-2 flex flex-col justify-between gap-2">
            <p className="text-gray-600 text-sm">
              {new Date(booking.startTime).toLocaleString()} -{" "}
              {new Date(booking.endTime).toLocaleTimeString()}
            </p>
            <div className="flex justify-end items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  booking.status === "COMPLETED"
                    ? "bg-green-100 text-green-800"
                    : booking.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-blue-100 text-blue-800"
                }`}
              >
                {booking.status}
              </span>

              {/* Attend Button */}
              {booking.status === "CONFIRMED" && (
                <button
                  onClick={() => handleAttendSession(booking.id)}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 shadow-md text-sm transition"
                >
                  Attend
                </button>
              )}

              {/* Review Button */}
              {booking.status === "COMPLETED" && (
                <button
                  onClick={() =>
                    booking.tutor.reviews?.length
                      ? startEditReview(booking.tutor.reviews[0], booking)
                      : startNewReview(booking)
                  }
                  className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition text-sm"
                >
                  {booking.tutor.reviews?.length
                    ? "Edit Review"
                    : "Leave Review"}
                </button>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      {isModalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-6 relative animate-fadeIn">
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-2xl font-semibold text-gray-800">
                {editingReviewId ? "Edit Review" : "Leave Review"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition text-xl font-bold"
              >
                ✕
              </button>
            </div>
            {/* Tutor Info */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-14 h-14 relative rounded-full border-2 border-gray-200 overflow-hidden">
                <Image
                  src={
                    selectedBooking.tutor.user.image || "/default-avatar.png"
                  }
                  alt="Tutor"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-gray-800 font-medium text-lg truncate">
                  {selectedBooking.tutor.user.name}
                </p>
                {selectedBooking.tutor.bio && (
                  <p className="text-gray-500 text-sm truncate max-w-xs">
                    {selectedBooking.tutor.bio}
                  </p>
                )}
              </div>
            </div>
            {/* Half-Star Rating */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex flex-row-reverse justify-end gap-1 select-none text-2xl">
                {[...Array(5)].map((_, index) => {
                  const starValue = 5 - index;
                  const halfStarValue = starValue - 0.5;
                  return (
                    <div key={starValue} className="relative">
                      {/* Full star */}
                      <input
                        type="radio"
                        name="rating"
                        value={starValue}
                        className="hidden"
                        checked={reviewRating === starValue}
                        onChange={() => setReviewRating(starValue)}
                      />
                      <label
                        className={`cursor-pointer ${
                          reviewRating >= starValue
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } hover:text-yellow-500`}
                        onClick={() => setReviewRating(starValue)}
                      >
                        ★
                      </label>

                      {/* Half star overlay */}
                      <input
                        type="radio"
                        name="rating"
                        value={halfStarValue}
                        className="hidden"
                        checked={reviewRating === halfStarValue}
                        onChange={() => setReviewRating(halfStarValue)}
                      />
                      <label
                        className={`absolute left-0 w-1/2 overflow-hidden cursor-pointer ${
                          reviewRating >= halfStarValue
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } hover:text-yellow-500`}
                        onClick={() => setReviewRating(halfStarValue)}
                      >
                        ★
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Review Text */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full border border-gray-200 rounded-xl p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-28 shadow-sm"
              />
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-3">
              <button
                onClick={handleReviewSubmit}
                className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md transition font-medium"
              >
                {editingReviewId ? "Update Review" : "Submit Review"}
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 shadow-md transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
