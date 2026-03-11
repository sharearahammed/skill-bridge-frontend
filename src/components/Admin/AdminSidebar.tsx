"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/dashboard/admin/users", label: "Users" },
    { href: "/dashboard/admin/bookings", label: "Bookings" },
    { href: "/dashboard/admin/categories", label: "Categories" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r shadow-lg p-6 flex flex-col">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Admin Dashboard</h2>

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