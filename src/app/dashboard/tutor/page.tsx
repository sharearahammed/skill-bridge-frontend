// app/dashboard/tutor/page.tsx
import { redirect } from "next/navigation";

export default function TutorIndex() {
  // Redirect immediately to availability-slots
  redirect("/dashboard/tutor/availability");
}