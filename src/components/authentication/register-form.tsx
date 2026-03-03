"use client";

import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useState } from "react";

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

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name */}
        <form.Field name="name">
          {(field) => (
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Name"
              className="border p-2 w-full"
            />
          )}
        </form.Field>

        {/* Email */}
        <form.Field name="email">
          {(field) => (
            <input
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Email"
              className="border p-2 w-full"
            />
          )}
        </form.Field>

        {/* Password */}
        <form.Field name="password">
          {(field) => (
            <input
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Password"
              className="border p-2 w-full"
            />
          )}
        </form.Field>

        {/* Role */}
        <form.Field name="role">
          {(field) => (
            <select
              value={field.state.value}
              onChange={(e) =>
                field.handleChange(e.target.value as "STUDENT" | "TUTOR")
              }
              className="border p-2 w-full"
            >
              <option value="STUDENT">Student</option>
              <option value="TUTOR">Tutor</option>
            </select>
          )}
        </form.Field>

        {/* Image Upload */}
        <form.Field name="image">
          {(field) => (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const base64String = reader.result as string;
                    field.handleChange(base64String);
                    setPreview(base64String);
                  };
                  reader.readAsDataURL(file);
                }}
                className="border p-2 w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 object-cover rounded mt-2"
                />
              )}
            </>
          )}
        </form.Field>

        <button
          type="submit"
          disabled={form.state.isSubmitting}
          className="bg-blue-600 text-white p-2 w-full"
        >
          {form.state.isSubmitting ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
}