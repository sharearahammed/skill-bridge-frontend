"use client";

import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"; // ✅ Next.js router

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
};

export default function BookingForm({
  availability,
}: {
  availability: Availability[];
}) {
  const [availabilityId, setAvailabilityId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // ✅ initialize router

  const handleBooking = async () => {
    if (!availabilityId) {
      toast.error("Please select a slot");
      return;
    }

    // SweetAlert confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to book this slot?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      await confirmBooking();
    } else {
      toast("Booking cancelled");
    }
  };

  const confirmBooking = async () => {
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availabilityId }),
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Booking failed");

      toast.success("Booking successful!");

      // ✅ redirect to My Booking page
      router.push("/my-booking");

      setAvailabilityId(""); // reset
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <select
        className="border border-gray-300 rounded-lg p-2 mb-4 w-full"
        onChange={(e) => setAvailabilityId(e.target.value)}
        value={availabilityId}
      >
        <option value="">Select a slot</option>
        {availability.map((slot: Availability) => (
          <option key={slot.id} value={slot.id}>
            {new Date(slot.startTime).toLocaleTimeString()} -{" "}
            {new Date(slot.endTime).toLocaleTimeString()}
          </option>
        ))}
      </select>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="bg-[#00B5BA] hover:bg-[#009ca1] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}