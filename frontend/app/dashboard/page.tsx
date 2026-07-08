"use client";

import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function Dashboard(){

  const router=useRouter();

  const [user,setUser]=useState<any>(null);
  const [stats,setStats]=useState({
    total_tasks:0,
    pending_tasks:0,
    completed_tasks:0
  });
  const [teamCount,setTeamCount]=useState(0);
  const [memberCount,setMemberCount]=useState(0);

  useEffect(()=>{

    const token=localStorage.getItem("token");

    if(!token){
      router.push("/");
      return;
    }

    const storedUser=localStorage.getItem("user");

    if(storedUser){
      setUser(JSON.parse(storedUser));
    }

    const fetchData=async()=>{

      try{
        const dashboard=await api.get("/dashboard");
        setStats(dashboard.data);

        const teams=await api.get("/team-tables");

        setTeamCount(teams.data.length);

        setMemberCount(
          teams.data.reduce(
            (total:number,team:any)=>total+team.members.length,
            0
          )
        );
      }catch(error){
        console.log(error);
      }
    };
    fetchData();
  },[router]);

  const handleLogout=async()=>{
    try{
      await api.post("/logout");
    }catch(error){
      console.log(error);
    }finally{

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  };

  return(
    <div className="max-w-5xl mx-auto space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {user?.name || "Admin"}! Here is a summary of your system.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 shadow-sm"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            ✓
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Total Tasks
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.total_tasks}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Manage ongoing and upcoming operations.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            👥
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Team
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {teamCount}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {memberCount} members registered.
          </p>
        </div>

        <div className="p-6 bg-white border rounded-2xl shadow-md hover:shadow-xl transition">
          <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold mb-4">
            📊
          </div>
          <h3 className="text-lg font-bold text-gray-800">
            Reports
          </h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            -
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Analyze system activity and logs.
          </p>
        </div>
      </div>
    </div>
  );
}