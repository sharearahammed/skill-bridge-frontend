"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useState, DragEvent } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "next/image";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TUTOR";
  image?: string | undefined;
};

export default function RegisterForm() {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<RegisterFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
      image: undefined,
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/sign-up/email`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
          },
        );

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Registration failed");

        toast.success("Registered successfully");
        router.push("/login");
      } catch (err: unknown) {
        if (err instanceof Error) toast.error(err.message);
        else toast.error("Registration failed");
      }
    },
  });

  const handleDrop = (e: DragEvent<HTMLLabelElement>, field: any) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      field.handleChange(base64String);
      setPreview(base64String);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md mx-auto w-full">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Your Account
      </h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Full Name"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition shadow-sm hover:shadow-md"
            />
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email Address"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition shadow-sm hover:shadow-md"
            />
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition shadow-sm hover:shadow-md pr-12"
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

        {/* Role Dropdown */}
        <form.Field name="role">
          {(field) => (
            <div className="relative w-full">
              <select
                value={field.state.value}
                onChange={(e) =>
                  field.handleChange(e.target.value as "STUDENT" | "TUTOR")
                }
                className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B5BA] transition shadow-sm hover:shadow-md pr-10 bg-white"
              >
                <option value="STUDENT">Student</option>
                <option value="TUTOR">Tutor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400 select-none">
                ▼
              </div>
            </div>
          )}
        </form.Field>

        {/* File Upload with Drag & Drop */}
        <form.Field name="image">
          {(field) => (
            <div>
              <label
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                }}
                onDrop={(e) => handleDrop(e, field)}
                className={`flex flex-col items-center justify-center px-6 py-5 w-full border-2 border-dashed rounded-lg cursor-pointer transition text-gray-600 text-center ${
                  isDragging
                    ? "border-[#00B5BA] bg-[#e6f9f9]"
                    : "border-gray-300 bg-white hover:border-[#00B5BA] hover:bg-[#f0fdfd]"
                }`}
              >
                <span className="mb-2 max-w-full truncate" title={fileName}>
                  {fileName || "Click or drag & drop profile image"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    setFileName(file.name);

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      const base64String = reader.result as string;
                      field.handleChange(base64String);
                      setPreview(base64String);
                    };
                    reader.readAsDataURL(file);
                  }}
                  className="hidden"
                />
              </label>

              {preview && (
                <div className="mt-4 w-28 h-28 rounded-full overflow-hidden mx-auto shadow-md border border-gray-200">
                  <Image
                    src={preview}
                    alt="Preview"
                    width={112}
                    height={112}
                    className="object-cover w-full h-full"
                    unoptimized={true}
                  />
                </div>
              )}
            </div>
          )}
        </form.Field>

        {/* Submit */}
        <button
          type="submit"
          disabled={form.state.isSubmitting}
          className="w-full bg-[#00B5BA] hover:bg-[#00a7aa] text-white py-3 rounded-lg font-semibold transition transform hover:scale-105 cursor-pointer"
        >
          {form.state.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{" "}
        <a href="/login" className="text-[#00B5BA] font-medium hover:underline">
          Login
        </a>
      </p>
    </div>
  );
}
