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

  // Fetch all subjects
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/category`);
        const data = await res.json();
        setSubjects(data.data || []);
      } catch (err) {
        toast.error("Failed to fetch subjects");
      }
    };
    fetchSubjects();
  }, []);

  // Handle subject select/unselect
  const toggleSubject = (id: string) => {
    setSelectedSubjects(prev =>
      prev.includes(id) ? prev.filter(sid => sid !== id) : [...prev, id]
    );
  };

  // Handle availability change
  const handleAvailabilityChange = (
    subjectId: string,
    field: "startTime" | "endTime",
    value: string
  ) => {
    setAvailability(prev => ({
      ...prev,
      [subjectId]: { ...prev[subjectId], [field]: value },
    }));
  };

  // Combined function: add subject if not added, then add availability
  const handleAddAvailability = async (subjectId: string) => {
    const avail = availability[subjectId];
    if (!avail?.startTime || !avail?.endTime)
      return toast.error("Select start and end time");

    setLoading(true);
    try {
      // 1️⃣ Add subject (if not already selected on backend)
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tutorSubject/subjects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ categoryIds: [subjectId] }),
      });

      // 2️⃣ Add availability
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/availability`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          subjectId,
          startTime: avail.startTime,
          endTime: avail.endTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add availability");

      toast.success("Subject & Availability added!");
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Tutor Dashboard</h1>

      {/* Subjects Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Select Subjects</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {subjects.map(subject => (
            <button
              key={subject.id}
              onClick={() => toggleSubject(subject.id)}
              className={`px-4 py-2 rounded-lg border ${
                selectedSubjects.includes(subject.id)
                  ? "bg-[#00B5BA] text-white border-[#00B5BA]"
                  : "bg-white text-gray-700 border-gray-300"
              } transition`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* Availability Section */}
      {selectedSubjects.map(subjectId => {
        const avail = availability[subjectId] || { startTime: "", endTime: "" };
        const subjectName = subjects.find(s => s.id === subjectId)?.name || "Subject";
        return (
          <div key={subjectId} className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">{subjectName} Availability</h2>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="datetime-local"
                value={avail.startTime}
                onChange={e => handleAvailabilityChange(subjectId, "startTime", e.target.value)}
                className="border rounded-lg p-2 flex-1"
              />
              <input
                type="datetime-local"
                value={avail.endTime}
                onChange={e => handleAvailabilityChange(subjectId, "endTime", e.target.value)}
                className="border rounded-lg p-2 flex-1"
              />
              <button
                onClick={() => handleAddAvailability(subjectId)}
                disabled={loading}
                className="px-4 py-2 bg-[#00B5BA] text-white rounded-lg hover:bg-[#009fa3] transition"
              >
                Add Availability
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}