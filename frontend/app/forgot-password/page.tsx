"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ForgotPassword() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);

        try {

            const res = await fetch(
                "http://localhost:8000/api/forgot-password",
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json",
                        "Accept":"application/json"
                    },
                    body:JSON.stringify({
                        email
                    })
                }
            );

            const data = await res.json();

            if(!res.ok){

                alert(data.message || "Something went wrong");

                setLoading(false);

                return;
            }

            alert(
                "Reset password link has been sent to your email"
            );

            router.push("/");

        } catch(error){
            console.error(error);
            alert("Server error");
        }
        setLoading(false);
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-5">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="/images/LLA_logo2.jpeg"
                            className="h-16 w-16 rounded-full object-cover"
                            alt="LLA Logo"
                        />
                    </div>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Forgot Password?
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Enter your email and we will send you a reset link.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">

                                Email Address

                            </label>

                            <input
                                type="email"
                                required
                                placeholder="example@email.com"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <button
                            disabled={loading}
                            className="w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            {
                                loading 
                                ? "Sending..."
                                : "Send Reset Link"
                            }
                        </button>
                    </form>

                    <button
                        onClick={()=>router.push("/")}
                        className="w-full mt-5 text-sm text-gray-500 hover:text-blue-600"
                    >
                        ← Back to Login
                    </button>
                </div>

                <p className="text-center text-sm text-gray-500 mt-6">

                    © {new Date().getFullYear()} AC Management System

                </p>
            </div>
        </main>
    );
}