"use client";

import { useEffect, useState } from "react";

type Booking = {
  id: string;
  startTime: string;
  endTime: string;
  student: { name: string; email: string };
  tutor: { user: { name: string; email: string } };
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/bookings`, {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch bookings");

        const data = await res.json();
        setBookings(data.data || []);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg animate-pulse">Loading bookings...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-red-500 text-center mt-4 font-medium">
        Error: {error}
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto mt-8 p-6 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 tracking-wide">
        Bookings
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-3">
          <thead>
            <tr className="bg-gradient-to-r from-[#00B5BA]/20 to-[#5672C4]/20 text-gray-700 uppercase text-sm tracking-wider">
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Tutor</th>
              <th className="p-3 text-left">Start Time</th>
              <th className="p-3 text-left">End Time</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="p-6 text-center text-gray-500 font-medium"
                >
                  No bookings found
                </td>
              </tr>
            )}
            {bookings.map((b) => (
              <tr
                key={b.id}
                className="bg-white rounded-xl hover:shadow-lg transition-all duration-200"
              >
                <td className="p-3 text-gray-800 font-medium">
                  {b.student.name} <br />
                  <span className="text-gray-500 text-sm">{b.student.email}</span>
                </td>
                <td className="p-3 text-gray-800 font-medium">
                  {b.tutor.user.name} <br />
                  <span className="text-gray-500 text-sm">{b.tutor.user.email}</span>
                </td>
                <td className="p-3 text-gray-600">
                  {new Date(b.startTime).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="p-3 text-gray-600">
                  {new Date(b.endTime).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}