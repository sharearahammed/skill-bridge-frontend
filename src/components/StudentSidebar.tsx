"use client";

import Link from "next/link";

export default function StudentSidebar() {
  return (
    <div className="w-64 h-screen border-r p-5 space-y-4">
      <h2 className="text-xl font-semibold">Student Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard/student/my-booking">My Booking</Link>
      </nav>
    </div>
  );
}
