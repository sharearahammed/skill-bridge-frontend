"use client";

import Link from "next/link";

export default function TutorSidebar() {
  return (
    <div className="w-64 h-screen border-r p-5 space-y-4">
      <h2 className="text-xl font-semibold">Tutor Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard/tutor/availability">Availability Slots</Link>
        <Link href="/dashboard/tutor/subjects">My Subjects</Link>

        <Link href="/dashboard/tutor/sessions">My Sessions</Link>
      </nav>
    </div>
  );
}
