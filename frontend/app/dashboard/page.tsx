"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header section matching login welcome vibe */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back! Here is a summary of your system.
          </p>
        </div>

        {/* Styled logout button to match main login button action */}
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 active:scale-[0.98] shadow-sm"
        >
          Logout
        </button>
      </div>

      {/* Cards matching the sleek login card styling */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Tasks Card */}
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            ✓
          </div>
          <h3 className="text-lg font-bold text-gray-800">Tasks</h3>
          <p className="text-sm text-gray-500 mt-1">Manage ongoing and upcoming operations.</p>
        </div>

        {/* Team Card */}
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            👥
          </div>
          <h3 className="text-lg font-bold text-gray-800">Team</h3>
          <p className="text-sm text-gray-500 mt-1">Monitor administrator and staff roles.</p>
        </div>

        {/* Reports Card */}
        <div className="p-6 bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            📊
          </div>
          <h3 className="text-lg font-bold text-gray-800">Reports</h3>
          <p className="text-sm text-gray-500 mt-1">Analyze system activity and logs.</p>
        </div>
      </div>
    </div>
  );
}