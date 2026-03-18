"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-in/email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(value),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Login failed");

        toast.success("Logged in successfully!");
        router.push("/");
        router.refresh();
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login to Your Account
        </h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-5"
        >
          {/* Email */}
          <form.Field name="email">
            {(field) => (
              <input
                type="email"
                placeholder="Email Address"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] shadow-sm hover:shadow-md transition"
                required
              />
            )}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => (
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] shadow-sm hover:shadow-md transition"
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            )}
          </form.Field>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || form.state.isSubmitting}
            className="w-full bg-[#00B5BA] hover:bg-[#00a7aa] text-white py-3 rounded-lg font-semibold transition transform hover:scale-105"
          >
            {loading || form.state.isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-gray-500 text-sm">
          Don&apos;t have an account?{" "}
          <a
            href="/register"
            className="text-[#00B5BA] font-medium hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}
