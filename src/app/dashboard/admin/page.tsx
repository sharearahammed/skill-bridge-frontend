// app/dashboard/tutor/page.tsx
import { redirect } from "next/navigation";

export default function StudentIndex() {
  // Redirect immediately to availability-slots
  redirect("/dashboard/admin/users");
}