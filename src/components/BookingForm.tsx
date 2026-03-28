"use client";

import { useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { User } from "./Admin/Users";

type Availability = {
  id: string;
  startTime: string;
  endTime: string;
  subjectId: string;
};

type TutorSubject = {
  id: string;
  tutorId: string;
  categoryId: string;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
};

export default function BookingForm({
  user,
  tutorSubjects,
  availability,
}: {
  user: User;
  tutorSubjects: TutorSubject[];
  availability: Availability[];
}) {
  const [availabilityId, setAvailabilityId] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (user.role !== "STUDENT") {
      toast.error("Only students can book sessions");
      return;
    }

    // 2️⃣ Check slot selected
    if (!availabilityId) {
      toast.error("Please select a slot");
      return;
    }

    // 3️⃣ Confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to book this slot?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      reverseButtons: true,
    });

    if (result.isConfirmed) await confirmBooking();
    else toast("Booking cancelled");
  };

const confirmBooking = async () => {
  setLoading(true);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ availabilityId }),
      },
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Booking failed");

    toast.success("Booking successful!");
    router.push("/dashboard/student/my-booking");
    setAvailabilityId("");
  } catch (error: unknown) {
    if (error instanceof Error) toast.error(error.message);
    else toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  const formatTime = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  };

  return (
    <div>
      {/* Custom Dropdown */}
      <div className="relative">
        <div
          className="border border-gray-300 rounded-xl p-3 cursor-pointer flex justify-between items-center shadow-sm transition"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="text-gray-700 font-medium">
            {availabilityId
              ? availability.find((a) => a.id === availabilityId)?.startTime &&
                formatTime(
                  availability.find((a) => a.id === availabilityId)!.startTime,
                  availability.find((a) => a.id === availabilityId)!.endTime,
                )
              : "Select a slot"}
          </span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {dropdownOpen && (
          <div className="absolute z-20 w-full mt-2 max-h-72 overflow-y-auto rounded-xl shadow-lg bg-white border border-gray-200 animate-slideDown">
            {tutorSubjects.map((subject) => {
              const subjectSlots = availability.filter(
                (slot) => slot.subjectId === subject.category.id,
              );
              if (!subjectSlots.length) return null;

              return (
                <div key={subject.category.id} className="mb-2">
                  <div className="sticky top-0 bg-gray-50 px-4 py-2 text-gray-600 font-semibold border-b border-gray-200">
                    {subject.category.name}
                  </div>
                  {subjectSlots.map((slot) => (
                    <div
                      key={slot.id}
                      className={`flex justify-between items-center px-4 py-2 cursor-pointer rounded-lg m-1 hover:bg-[#00B5BA]/20 transition ${
                        availabilityId === slot.id
                          ? "bg-[#00B5BA]/30 font-semibold text-white"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setAvailabilityId(slot.id);
                        setDropdownOpen(false);
                      }}
                    >
                      <span>{formatTime(slot.startTime, slot.endTime)}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button
        onClick={handleBooking}
        disabled={loading}
        className="mt-6 w-full bg-[#00B5BA] hover:bg-[#009ca1] text-white px-6 py-3 rounded-2xl font-semibold shadow-md hover:shadow-lg transition-all duration-300"
      >
        {loading ? "Booking..." : "Book Now"}
      </button>
    </div>
  );
}
