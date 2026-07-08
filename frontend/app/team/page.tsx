"use client";

import { useEffect, useState } from "react";
import { AdminLayoutWrapper } from "../dashboard/layout";
import api from "@/lib/api";

export default function TeamPage() {
  const [teams,setTeams] = useState<any[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    fetchTeams();
  },[]);

  const fetchTeams = async()=>{
    try{
      const response = await api.get("/team-tables");
      setTeams(response.data);
    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <AdminLayoutWrapper>
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Team</h1>
          <p className="text-gray-500 mt-1">View available technician teams.</p>
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-500">Loading teams...</div>
        )}

        {!loading && teams.length === 0 && (
          <div className="bg-white rounded-2xl border p-6 text-center text-gray-500">No teams available.</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teams.map((team)=>(
            <div key={team.id} className="p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center gap-4 mb-5">
                <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-blue-600 text-white font-bold flex items-center justify-center">
                  {team.team_name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-gray-800">{team.team_name}</h3>
                  <p className="text-sm text-gray-500">{team.assignments?.length || 0} tasks assigned</p>
                </div>

              </div>
              <div className="space-y-3">
                {team.assignments?.length === 0 ? (
                  <p className="text-sm text-gray-400">No tasks assigned.</p>
                ):(
                  team.assignments.map((assignment:any)=>(

                <div key={assignment.id} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between">
                    <div><h4 className="font-semibold text-gray-800">{assignment.sequence}. {assignment.task.customer_name}</h4>
                    <p className="text-xs text-gray-500 mt-1">{assignment.task.address}</p>
                </div>

                {/* <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">{assignment.status}</span> */}
              </div>

              <p className="text-xs text-gray-400 mt-3">{assignment.task.phone}</p>
              <p className="text-xs text-gray-400">{assignment.task.description}</p>
            </div>
            ))
          )}
          </div>
          </div>
          ))}
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}