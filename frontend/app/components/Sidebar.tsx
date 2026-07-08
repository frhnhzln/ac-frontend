"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open,setOpen] = useState(true);

  const getLinkClass = (path:string)=>{
    const baseStyle ="flex items-center px-4 py-3 rounded-xl text-sm transition font-medium";
    const activeStyle ="bg-blue-50 text-blue-600 font-semibold";
    const inactiveStyle ="text-gray-500 hover:bg-gray-50 hover:text-gray-900";
    return `${baseStyle} ${ pathname === path ? activeStyle : inactiveStyle }`;
  };

  return (
    <aside className={`h-screen bg-white border-r border-gray-100 p-6 flex flex-col justify-between shadow-sm shrink-0 transition-all duration-300 ${open ? "w-64" : "w-20"}`}>
      <div className="space-y-8">
        {/* Logo + Hamburger */}
        <div
          className={`flex items-center ${open ? "justify-between" : "justify-center"} px-2`}>

          {open && (
            <div className="flex items-center gap-3">
              <img src="/images/LLA_logo2.jpeg" alt="LLA Logo" className="h-9 w-9 rounded-full object-cover"/>
              <span className="font-bold text-gray-800 text-lg tracking-wide">LLA Admin</span>
            </div>
          )}

          <button onClick={()=>setOpen(!open)} className="p-2 rounded-xl hover:bg-gray-100 text-gray-600 transition">
            {open ?
              <X size={22}/>
              :
              <Menu size={22}/>
            }
          </button>
        </div>
        {/* Navigation */}
        <nav className="flex flex-col gap-1">
          <Link href="/dashboard" className={getLinkClass("/dashboard")}>{open && "Dashboard"}</Link>
          <Link href="/tasks" className={getLinkClass("/tasks")}>{open && "Tasks"}</Link>
          <Link href="/team" className={getLinkClass("/team")}>{open && "Team"}</Link>
          <Link href="/configuration" className={getLinkClass("/configuration")}>{open && "Configuration"}</Link>
        </nav>
      </div>
      {open && (
        <div className="text-xs text-gray-400 px-4">© AC Management System</div>
      )}
    </aside>
  );
}