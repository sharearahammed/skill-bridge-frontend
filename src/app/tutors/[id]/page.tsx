"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import defaultImage from "../../../assets/people avatar.png";
import { getTutorById, bookTutor } from "@/src/services/tutor.service";

type PageProps = {
  params: { id: string };
};

export default async function TutorProfilePage({ params }: PageProps) {
  const { id } = params;
  const response = await getTutorById(id);
  const tutor = response.data;

  return <TutorProfile tutor={tutor} />;
}

// Client Component
function TutorProfile({ tutor }: any) {
  const [selectedAvailability, setSelectedAvailability] = useState<string>("");

  const averageRating =
    tutor?.reviews.length > 0
      ? (
          tutor?.reviews.reduce(
            (acc: number, review: any) => acc + review.rating,
            0
          ) / tutor?.reviews?.length
        ).toFixed(1)
      : "0.0";

  const handleBooking = async () => {
    if (!selectedAvailability) {
      alert("Please select an availability slot first.");
      return;
    }

    try {
      const res = await bookTutor(selectedAvailability);
      alert("Booking successful!");
      console.log("Booking response:", res);
    } catch (err: any) {
      alert(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">

        {/* Top Section */}
        <div className="flex items-center gap-6 mb-8">
          <div className="relative w-28 h-28">
            <Image
              src={tutor?.user?.image || defaultImage}
              alt={tutor?.user?.name}
              fill
              className="rounded-full object-cover ring-4 ring-[#00B5BA]/20"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-800">{tutor?.user?.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-yellow-500">
              <FaStar />
              <span className="font-semibold">{averageRating}</span>
              <span className="text-gray-500 text-sm">
                ({tutor?._count?.reviews} reviews)
              </span>
            </div>
            <p className="text-[#00B5BA] font-semibold mt-3 text-xl">
              ${tutor?.pricePerHour} / hour
            </p>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">About Tutor</h2>
          <p className="text-gray-600 leading-relaxed">{tutor?.bio || "No bio available."}</p>
        </div>

        {/* Subjects */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Subjects</h2>
          <div className="flex flex-wrap gap-3">
            {tutor?.tutorSubjects.map((subject: any) => (
              <span
                key={subject.id}
                className="bg-[#00B5BA]/10 text-[#00B5BA] px-4 py-2 rounded-full text-sm font-medium"
              >
                {subject.category.name}
              </span>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Availability</h2>
          <select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3"
          >
            <option value="">Select a slot</option>
            {tutor?.availability.map((slot: any) => (
              <option key={slot.id} value={slot.id}>
                {new Date(slot.startTime).toLocaleTimeString()} -{" "}
                {new Date(slot.endTime).toLocaleTimeString()}
              </option>
            ))}
          </select>
        </div>

        {/* Book Now Button */}
        <div className="mt-6 text-center">
          <button
            onClick={handleBooking}
            className="bg-[#00B5BA] hover:bg-[#009ca1] text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}