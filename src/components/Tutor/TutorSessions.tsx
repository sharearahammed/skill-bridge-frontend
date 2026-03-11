"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

type Session = {
  id: string;
  startTime: string;
  endTime: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  student: {
    name: string;
    email: string;
    image: string | null;
  };
};

export default function TutorSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/tutor/sessions`,
        { credentials: "include" },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setSessions(data.data);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const updateStatus = async (bookingId: string, status: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/booking/status`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bookingId, status }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Status updated");
      fetchSessions();
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something went wrong");
    }
  };

  const handleStatusChange = async (bookingId: string, status: string) => {
    let confirmText = "";
    switch (status) {
      case "CONFIRMED":
        confirmText = "Do you want to confirm this session?";
        break;
      case "CANCELLED":
        confirmText = "Do you want to reject this session?";
        break;
      case "COMPLETED":
        confirmText = "Do you want to mark this session as completed?";
        break;
      default:
        return;
    }

    const result = await Swal.fire({
      title: "Are you sure?",
      text: confirmText,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    });

    if (result.isConfirmed) {
      updateStatus(bookingId, status);
    }
  };

  const formatDate = (start: string, end: string) => {
    const s = new Date(start);
    const e = new Date(end);
    return `${s.toLocaleDateString(undefined, {
      dateStyle: "medium",
    })} ${s.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - ${e.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      case "COMPLETED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 animate-pulse text-lg">
        Loading sessions...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        My Booking Sessions
      </h2>

      {sessions.length === 0 && (
        <p className="text-gray-500 text-center">No sessions found</p>
      )}

      {sessions.map((session) => (
        <div
          key={session.id}
          className="bg-white shadow-lg rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
        >
          {/* Student Info */}
          <div className="flex items-center gap-4">
            {session.student.image ? (
              <Image
                src={session.student.image}
                alt={session.student.name}
                width={56}
                height={56}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-semibold text-lg">
                {session.student.name[0]}
              </div>
            )}
            <div>
              <p className="font-semibold text-gray-800">{session.student.name}</p>
              <p className="text-sm text-gray-500">{session.student.email}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formatDate(session.startTime, session.endTime)}
              </p>
            </div>
          </div>

          {/* Status + Actions */}
          <div className="flex flex-col sm:items-end gap-3 mt-2 sm:mt-0">
            <span
              className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor(
                session.status,
              )}`}
            >
              {session.status}
            </span>

            {session.status === "PENDING" && (
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => handleStatusChange(session.id, "CONFIRMED")}
                  className="px-4 py-2 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => handleStatusChange(session.id, "CANCELLED")}
                  className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                >
                  Reject
                </button>
              </div>
            )}

            {session.status === "CONFIRMED" && (
              <button
                onClick={() => handleStatusChange(session.id, "COMPLETED")}
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition"
              >
                Mark Completed
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}