"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function GoogleCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (error) {
      toast.error("Google login failed. Please try again.");
      router.push("/login");
      return;
    }

    if (token) {
      // Save token
      localStorage.setItem("token", token);
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;

      toast.success("Logged in with Google!");
      router.push("/");
      router.refresh();
    } else {
      toast.error("Something went wrong.");
      router.push("/login");
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#00B5BA] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Logging you in...</p>
      </div>
    </div>
  );
}