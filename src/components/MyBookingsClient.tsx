"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type Booking = {
  id: string;
  tutorId: string;
  availabilityId: string;
  availability: {
    subjectId: string;
  };
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
  tutor: {
    user: {
      name: string;
      image: string | null;
      email: string;
    };
    pricePerHour: number;
    bio: string;
  };
};

type ReviewState = {
  subjectId: string;
  reviewed: boolean;
  reviewId?: string;
  tutorId: string;
  categoryId?: string;
  review: {
    comment: string;
    rating: string;
  };
};

export default function MyBookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [reviewStatus, setReviewStatus] = useState<Record<string, ReviewState>>(
    {}
  );

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/my-booking`,
        { credentials: "include" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setBookings(data.data);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // fetch review status
  useEffect(() => {
    const fetchReviewStatus = async () => {
      const status: Record<string, ReviewState> = {};

      await Promise.all(
        bookings.map(async (booking) => {
          if (booking.status === "COMPLETED") {
            try {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/tutor/${booking.tutorId}`,
                { credentials: "include" }
              );

              const data = await res.json();

              if (res.ok) {
                const matchedReview = data.data.find(
                  (r: any) =>
                    r.categoryId === booking.availability.subjectId
                );

                const key = `${booking.tutorId}_${booking.availability.subjectId}`;

                if (matchedReview) {
                  status[key] = {
                    subjectId: booking.availability.subjectId,
                    reviewed: true,
                    reviewId: matchedReview.id,
                    tutorId: booking.tutorId,
                    categoryId: matchedReview.categoryId,
                    review: {
                      comment: matchedReview.comment,
                      rating: matchedReview.rating.toString(),
                    },
                  };
                } else {
                  status[key] = {
                    subjectId: booking.availability.subjectId,
                    tutorId: booking.tutorId,
                    reviewed: false,
                    review: { comment: "", rating: "0" },
                  };
                }
              }
            } catch {
              const key = `${booking.tutorId}_${booking.availability.subjectId}`;

              status[key] = {
                subjectId: booking.availability.subjectId,
                tutorId: booking.tutorId,
                reviewed: false,
                review: { comment: "", rating: "0" },
              };
            }
          }
        })
      );

      setReviewStatus(status);
    };

    if (bookings.length) fetchReviewStatus();
  }, [bookings]);

  const cancelBooking = async (bookingId: string) => {
    const result = await Swal.fire({
      title: "Cancel Booking?",
      text: "Are you sure you want to cancel this booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#00B5BA",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/status`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ bookingId, status: "CANCELLED" }),
          }
        );

        const data = await res.json();

        if (!res.ok) throw new Error(data.message);

        toast.success("Booking cancelled");

        fetchBookings();
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  const submitReview = async (
    tutorId: string,
    rating: number,
    comment: string,
    subjectId: string
  ) => {
    try {
      const key = `${tutorId}_${subjectId}`;
      const reviewInfo = reviewStatus[key];

      const isSameSubject =
        reviewInfo?.reviewed && reviewInfo?.categoryId === subjectId;

      const method = isSameSubject ? "PATCH" : "POST";

      const url = isSameSubject
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/${reviewInfo.reviewId}`
        : `${process.env.NEXT_PUBLIC_BACKEND_URL}/review`;

      const body = isSameSubject
        ? { rating, comment }
        : {
            tutorId,
            categoryId: subjectId,
            rating,
            comment,
          };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success(isSameSubject ? "Review updated" : "Review submitted");

      fetchBookings();
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const viewReviews = async (tutorId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/review/tutor/${tutorId}`,
        { credentials: "include" }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      const reviews = data.data;

      if (!reviews.length) {
        Swal.fire("No reviews yet");
        return;
      }

      const reviewHtml = reviews
        .map(
          (r: any) => `
        <div style="border-bottom:1px solid #eee;padding:10px 0;text-align:left">
          <div style="font-weight:600">${r.student.name}</div>
          <div style="color:#00B5BA;font-size:18px">
            ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
          </div>
          <div style="font-size:14px;color:#555">${r.comment || ""}</div>
        </div>
      `
        )
        .join("");

      Swal.fire({
        title: "Tutor Reviews",
        html: `<div style="max-height:300px;overflow:auto">${reviewHtml}</div>`,
        width: 500,
        confirmButtonColor: "#5672C4",
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  };

  const handleReview = async (tutorId: string, subjectId: string) => {
    const key = `${tutorId}_${subjectId}`;
    const tutorReview = reviewStatus[key];

    const existingReview =
      tutorReview && tutorReview.categoryId === subjectId
        ? tutorReview.review
        : null;

    const existingRating = existingReview?.rating || 0;
    const existingComment = existingReview?.comment || "";

    const { value: formValues } = await Swal.fire({
      title: existingReview ? "Edit Your Review" : "Write a Review",
      html: `
      <div style="display:flex;justify-content:center;margin-bottom:10px;font-size:28px;color:#ccc;">
        <span class="star" data-value="1" style="cursor:pointer;">★</span>
        <span class="star" data-value="2" style="cursor:pointer;">★</span>
        <span class="star" data-value="3" style="cursor:pointer;">★</span>
        <span class="star" data-value="4" style="cursor:pointer;">★</span>
        <span class="star" data-value="5" style="cursor:pointer;">★</span>
      </div>

      <textarea
        id="comment"
        class="swal2-textarea"
        placeholder="Share your experience with this tutor..."
      >${existingComment}</textarea>

      <input type="hidden" id="rating" value="${existingRating}">
    `,
      showCancelButton: true,
      confirmButtonText: existingReview ? "Update Review" : "Submit Review",
      confirmButtonColor: "#5672C4",
      didOpen: () => {
        const stars = document.querySelectorAll(".star");
        const ratingInput = document.getElementById(
          "rating"
        ) as HTMLInputElement;

        stars.forEach((s) => {
          const value = Number(s.getAttribute("data-value"));
          (s as HTMLElement).style.color =
            value <= Number(existingRating) ? "#00B5BA" : "#ccc";
        });

        stars.forEach((star) => {
          star.addEventListener("click", () => {
            const value = star.getAttribute("data-value");

            if (ratingInput) ratingInput.value = value || "0";

            stars.forEach((s) => {
              if (Number(s.getAttribute("data-value")) <= Number(value)) {
                (s as HTMLElement).style.color = "#00B5BA";
              } else {
                (s as HTMLElement).style.color = "#ccc";
              }
            });
          });
        });
      },
      preConfirm: () => {
        const rating = (document.getElementById("rating") as HTMLInputElement)
          .value;

        const comment = (
          document.getElementById("comment") as HTMLTextAreaElement
        ).value;

        if (!rating || rating === "0")
          Swal.showValidationMessage("Please select a rating");

        if (!comment)
          Swal.showValidationMessage("Please write a comment");

        return { rating: Number(rating), comment };
      },
    });

    if (formValues) {
      await submitReview(
        tutorId,
        formValues.rating,
        formValues.comment,
        subjectId
      );
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return `${startDate.toLocaleString(
      undefined,
      options
    )} - ${endDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })}`;
  };

  const statusColor = (status: Booking["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!bookings.length)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">
        No bookings yet
      </p>
    );

  return (
    <div className="grid gap-6">
      {bookings.map((booking) => {
        const key = `${booking.tutorId}_${booking.availability.subjectId}`;
        const isReviewed = reviewStatus[key]?.reviewed;

        return (
          <div
            key={booking.id}
            className="flex flex-col md:flex-row justify-between items-center gap-6 border rounded-2xl p-6 bg-white shadow-sm hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                {booking.tutor.user.image ? (
                  <Image
                    src={booking.tutor.user.image}
                    alt={booking.tutor.user.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#00B5BA] text-white font-bold text-xl">
                    {booking.tutor.user.name[0]}
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-lg text-gray-800">
                  {booking.tutor.user.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {booking.tutor.user.email}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {booking.tutor.bio}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-gray-700 font-medium text-sm">
                {formatDateTime(booking.startTime, booking.endTime)}
              </p>

              <span className="px-3 py-1 text-sm font-medium rounded-full bg-[#00B5BA]/10 text-[#00B5BA]">
                ${booking.tutor.pricePerHour}/hour
              </span>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(
                  booking.status
                )}`}
              >
                {booking.status}
              </span>

              <div className="flex gap-2 mt-2">
                {(booking.status === "PENDING" ||
                  booking.status === "CONFIRMED") && (
                  <button
                    onClick={() => cancelBooking(booking.id)}
                    className="cursor-pointer px-4 py-1.5 text-sm rounded-lg bg-[#00B5BA] text-white"
                  >
                    Cancel
                  </button>
                )}

                {booking.status === "COMPLETED" && (
                  <>
                    <button
                      onClick={() =>
                        handleReview(
                          booking.tutorId,
                          booking.availability.subjectId
                        )
                      }
                      className="cursor-pointer px-4 py-1.5 text-sm rounded-lg bg-[#5672C4] text-white"
                    >
                      {isReviewed ? "Edit Review" : "Leave Review"}
                    </button>

                    <button
                      onClick={() => viewReviews(booking.tutorId)}
                      className="cursor-pointer px-4 py-1.5 text-sm rounded-lg border border-[#5672C4] text-[#5672C4]"
                    >
                      View Reviews
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}