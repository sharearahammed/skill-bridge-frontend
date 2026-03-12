"use client";

import TutorSidebar from "@/src/components/Tutor/TutorSidebar";

export default function TutorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <TutorSidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
}
