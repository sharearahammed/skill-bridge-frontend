"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

type Booking = {
  id: string;
  tutorId: string;
  availabilityId: string;
  startTime: string;
  endTime: string;
  status: "CONFIRMED" | "PENDING" | "CANCELLED";
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

export default function MyBookingsClient() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("bookings", bookings);
  const fetchBookings = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/my-booking`,
        { credentials: "include" },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch bookings");

      setBookings(data.data);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            bookingId,
            status: "CANCELLED",
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to cancel booking");

      toast.success("Booking cancelled");

      fetchBookings(); // refresh list
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    }
  };
  
  useEffect(() => {
    fetchBookings();
  }, []);

  const statusColor = (status: Booking["status"]) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-800";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDateTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Options for 12-hour format without seconds
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return `${startDate.toLocaleString(undefined, options)} - ${endDate.toLocaleString(
      undefined,
      options,
    )}`;
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (bookings.length === 0)
    return <p className="text-center mt-10 text-gray-500">No bookings yet.</p>;

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="flex flex-col md:flex-row justify-between items-center border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow bg-white"
        >
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            {booking.tutor.user.image ? (
              <img
                src={booking.tutor.user.image}
                alt={booking.tutor.user.name}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold">
                {booking.tutor.user.name[0]}
              </div>
            )}

            <div>
              <p className="text-lg font-semibold text-gray-800">
                {booking.tutor.user.name}
              </p>
              <p className="text-gray-600 text-sm">
                {booking.tutor.user.email}
              </p>
              <p className="text-gray-600 text-sm">{booking.tutor.bio}</p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-700 font-medium">
              {formatDateTime(booking.startTime, booking.endTime)}
            </p>
            <p className="text-gray-600">${booking.tutor.pricePerHour}/hour</p>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                booking.status,
              )}`}
            >
              {booking.status}
            </span>
            {(booking.status === "PENDING" ||
              booking.status === "CONFIRMED") && (
              <button
                onClick={() => cancelBooking(booking.id)}
                className="mt-2 px-4 py-1.5 bg-red-400 text-white text-sm rounded-lg hover:bg-red-600 transition"
              >
                Cancel Booking
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
