"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

type Subject = {
  id: string;
  name: string;
};

export default function AvailabilitySection() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [availability, setAvailability] = useState<{
    [key: string]: { startTime: string; endTime: string };
  }>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/category`,
        );
        const data = await res.json();
        setSubjects(data.data || []);
      } catch {
        toast.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  const toggleSubject = (id: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id],
    );
  };

  const handleAvailabilityChange = (
    subjectId: string,
    field: "startTime" | "endTime",
    value: string,
  ) => {
    setAvailability((prev) => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], [field]: value },
    }));
  };

  const handleAddAvailability = async (subjectId: string) => {
    const avail = availability[subjectId];
    if (!avail?.startTime || !avail?.endTime)
      return toast.error("Select start and end time");

    setLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorSubject/subjects`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ categoryIds: [subjectId] }),
        },
      );

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/availability`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            subjectId,
            startTime: avail.startTime,
            endTime: avail.endTime,
          }),
        },
      );

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to add availability");

      toast.success("Subject & Availability added!");
    } catch (err: unknown) {
      if (err instanceof Error) toast.error(err.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 px-0 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center">
        All Subjects
      </h1>

      {/* Subjects Selection */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Select Subjects</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <button
              key={subject.id}
              onClick={() => toggleSubject(subject.id)}
              className={`px-1 py-2 rounded-lg border font-medium transition-all w-full text-center whitespace-nowrap ${
                selectedSubjects.includes(subject.id)
                  ? "bg-[#00B5BA] text-white border-[#00B5BA] shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:shadow-sm hover:border-[#00B5BA]"
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      {selectedSubjects.map((subjectId) => {
        const avail = availability[subjectId] || { startTime: "", endTime: "" };
        const subjectName =
          subjects.find((s) => s.id === subjectId)?.name || "Subject";
        const now = new Date().toISOString().slice(0, 16);
        return (
          <div
            key={subjectId}
            className="bg-white p-6 rounded-2xl shadow-md space-y-4"
          >
            <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
              {subjectName} Availability
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <input
                type="datetime-local"
                value={avail.startTime}
                min={now} // ✅ prevent past date
                onChange={(e) =>
                  handleAvailabilityChange(
                    subjectId,
                    "startTime",
                    e.target.value,
                  )
                }
                className="border rounded-lg p-3 flex-1 min-w-0 focus:ring-2 focus:ring-[#00B5BA] outline-none transition w-full sm:w-auto"
              />

              <input
                type="datetime-local"
                value={avail.endTime}
                min={now} // ✅ prevent past date
                onChange={(e) =>
                  handleAvailabilityChange(subjectId, "endTime", e.target.value)
                }
                className="border rounded-lg p-3 flex-1 min-w-0 focus:ring-2 focus:ring-[#00B5BA] outline-none transition w-full sm:w-auto"
              />
              <button
                onClick={() => handleAddAvailability(subjectId)}
                disabled={loading}
                className="px-6 py-3 bg-[#00B5BA] text-white rounded-lg font-medium hover:bg-[#009fa3] transition flex-1 sm:flex-none w-full sm:w-auto"
              >
                {loading ? "Adding..." : "Add Availability"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
