"use client";

import { useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";

export default function ResetPassword() {

  const router = useRouter();

  const params = useParams();
  const searchParams = useSearchParams();

  const token = params.token;
  const email = searchParams.get("email");

  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);

  const handleReset = async(e:React.FormEvent)=>{

    e.preventDefault();

    if(password !== confirmPassword){
      alert("Password does not match");
      return;
    }

    setLoading(true);

    try{

      const res = await fetch(
        "http://localhost:8000/api/reset-password",
        {
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json"
          },
          body:JSON.stringify({
            email,
            token,
            password
          })
        }
      );

      const data = await res.json();

      if(!res.ok){
        alert(data.message);
        return;
      }

      alert("Password changed successfully");
      router.push("/");
    }catch(error){

      console.log(error);
      alert("Something went wrong");

    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-100 flex items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Reset Password
            </h1>
            <p className="text-gray-500 mt-2">
              Create your new password
            </p>
          </div>

          <form 
            onSubmit={handleReset}
            className="space-y-5"
          >
            <input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border px-4 py-3"
            />

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
            >
              {
                loading 
                ? "Updating..."
                : "Reset Password"
              }
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}