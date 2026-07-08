"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const getLinkClass = (path: string) => {
    const baseStyle = "flex items-center px-4 py-3 rounded-xl text-sm transition font-medium";
    const activeStyle = "bg-blue-50 text-blue-600 font-semibold";
    const inactiveStyle = "text-gray-500 hover:bg-gray-50 hover:text-gray-900";
    
    return `${baseStyle} ${pathname === path ? activeStyle : inactiveStyle}`;
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-100 p-6 flex flex-col justify-between shadow-sm shrink-0">
      <div className="space-y-8">
        {/* Logo Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <img
            src="/images/LLA_logo2.jpeg"
            alt="LLA Logo"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="font-bold text-gray-800 text-lg tracking-wide">
            LLA Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>
            Dashboard
          </Link>
          <Link href="/tasks" className={getLinkClass("/tasks")}>
            Tasks
          </Link>
          <Link href="/team" className={getLinkClass("/team")}>
            Team
          </Link>
          <Link href="/configuration" className={getLinkClass("/configuration")}>
            Configuration
          </Link>
        </nav>
      </div>

      <div className="text-xs text-gray-400 px-4">
        © AC Management System
      </div>
    </aside>
  );
}