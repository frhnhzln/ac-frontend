"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const year = new Date().getFullYear();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // ✅ store token (Sanctum style)
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect
      router.push("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md">

        {/* Card */}
        <div className="rounded-2xl bg-white shadow-2xl p-8 border border-gray-100">

          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/LLA_logo2.jpeg"
              alt="LLA Logo"
              className="h-16 w-16 rounded-full object-cover"
            />
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Admin
            </h1>
            <p className="text-gray-500 mt-2">Sign in to LLA</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleLogin}>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              />
            </div>

            {/* Remember */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="rounded border-gray-300" />
                Remember Me
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold transition hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="border-t"></div>
            <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-gray-400 text-sm">
              OR
            </span>
          </div>

          {/* Google */}
          <button className="w-full rounded-lg border border-gray-300 py-3 font-medium hover:bg-gray-50 transition">
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold text-blue-600 hover:underline">
              Register
            </a>
          </p>
        </div>

        {/* Copyright */}
        <p className="mt-6 text-center text-sm text-gray-500">
          © {year} AC Management System
        </p>
      </div>
    </main>
  );
}