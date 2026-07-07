"use client";

import { useEffect, useState } from "react";
import { AdminLayoutWrapper } from "../dashboard/layout";

interface Task {
  id:number;
  customer_name:string;
  phone:string;
  address:string;
  unit:number;
  description:string;
  deal_time:string;
  status:string;
  created_at:string;
}

export default function TasksPage() {
  const [tasks,setTasks] = useState<Task[]>([]);
  const [loading,setLoading] = useState(true);

  useEffect(()=>{
    fetchTasks();
  },[]);

  const fetchTasks = async()=>{
    try{

      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:8000/api/tasks",
        {
          headers:{
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
          }
        }
      );
      const data = await res.json();

      setTasks(data);

    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <AdminLayoutWrapper>
      <div className="max-w-5xl mx-auto space-y-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
            Tasks
          </h1>

          <p className="text-gray-500 mt-1">
            Manage, track, and complete your assigned system tasks.
          </p>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-3">
        {
          loading ? (

            <p className="text-gray-500">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (

            <p className="text-gray-500">
              No tasks available.
            </p>
          ) : (

          tasks.map((task,index)=>(
            <div
              key={task.id}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-slate-50 transition"
            >

              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold">
                  {String(index+1).padStart(2,"0")}
                </div>
                <div>

                  <h3 className="font-semibold text-gray-800">
                    {task.customer_name}
                  </h3>

                  <p className="text-xs text-gray-400 mt-1">
                    {task.phone}
                  </p>

                  <p className="text-xs text-gray-400">
                    {task.address}
                  </p>

                  <p className="text-xs text-gray-400">
                    {task.description}
                  </p>
                </div>
              </div>

              <div className="text-right">

                <span
                className={`px-3 py-1 text-xs font-semibold rounded-full
                ${
                  task.status === "completed"
                  ?
                  "bg-emerald-50 text-emerald-600"
                  :
                  "bg-blue-50 text-blue-600"
                }
                `}
                >

                  {task.status}

                </span>

                <p className="text-xs text-gray-400 mt-2">
                  {task.deal_time}
                </p>
              </div>
            </div>
          ))
          )
        }
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}