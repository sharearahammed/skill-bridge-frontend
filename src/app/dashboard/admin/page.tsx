"use client";

import ProtectedRoute from "@/src/components/ProtectedRoute";

export default function TutorDashboard() {
  return (
    <ProtectedRoute role="TUTOR">
      <h2>Tutor Dashboard</h2>
    </ProtectedRoute>
  );
}