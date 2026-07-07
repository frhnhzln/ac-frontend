"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8000/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(form),
            });

            const data = await res.json();

            console.log("Response:", data);

            if (res.ok) {
            alert("Account created successfully!");
            router.push("/");
            } else {
            alert(data.message || "Registration failed");
            }

        } catch (err) {
            console.error("Fetch error:", err);
            alert("Cannot connect to backend");
        }
        };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-5">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded-lg">
            Create Account
          </button>

          <button
                type="button"
                onClick={() => router.push("/")}
                className="w-full border border-gray-300 text-gray-700 p-3 rounded-lg hover:bg-gray-100 transition"
            >
                ← Back to Login
            </button>
        </form>
      </div>
    </main>
  );
}
