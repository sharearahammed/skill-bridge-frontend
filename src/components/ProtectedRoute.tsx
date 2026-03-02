"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: "ADMIN" | "STUDENT" | "TUTOR";
}) {
  const router = useRouter();
  const { user, role: userRole } = useAuthStore();

  useEffect(() => {
    if (!user) router.push("/login");
    if (role && userRole !== role) router.push("/");
  }, [user, role, userRole]);

  return <>{children}</>;
}
