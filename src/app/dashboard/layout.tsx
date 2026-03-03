// /dashboard/student/layout.tsx
import { ReactNode } from "react";

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional: Add navbar or sidebar here */}
      <main>{children}</main>
    </div>
  );
}