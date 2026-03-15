"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface RoleGuardProps {
  user: {
    role?: string;
  } | null;
  role: "STUDENT" | "TUTOR" | "ADMIN";
  children: React.ReactNode;
}

export default function PrivateRoute({ user, role, children }: RoleGuardProps ) {
  console.log({ user });
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (role && user.role !== role) {
      router.push("/");
    }
  }, [user, role, router]);

  if (!user) {
    return <p className="p-10 text-center">Checking authentication...</p>;
  }

  return <>{children}</>;
}
