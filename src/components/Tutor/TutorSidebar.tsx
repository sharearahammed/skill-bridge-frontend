"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TutorSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/tutor/availability", label: "Availability Slots" },
    { href: "/dashboard/tutor/subjects", label: "My Subjects" },
    { href: "/dashboard/tutor/sessions", label: "My Sessions" },
    { href: "/dashboard/tutor/reviews", label: "Reviews" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Tutor Dashboard</h2>

      <nav className="flex flex-col gap-3">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                isActive
                  ? "bg-[#00B5BA] text-white"
                  : "text-gray-700 hover:bg-[#00B5BA]/10 hover:text-[#00B5BA]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}