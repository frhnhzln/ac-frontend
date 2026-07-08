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

  const [showModal,setShowModal] = useState(false);
  const [creating,setCreating] = useState(false);

  const [form,setForm] = useState({
    customer_name:"",
    phone:"",
    address:"",
    unit:1,
    description:"",
    deal_time:"",
    status:"pending"
  });

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

  const handleChange = ( e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    const {name,value}=e.target;
    setForm(prev=>({...prev, [name]: name==="unit" ? Number(value) : value}));
  };

  const createTask = async()=>{
    try{
      setCreating(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:8000/api/tasks",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            "Accept":"application/json",
            "Authorization":`Bearer ${token}`
          },
          body:JSON.stringify(form)
        }
      );

      if(!res.ok){
        throw new Error("Failed creating task");
      }

      setShowModal(false);
      setForm({
        customer_name:"",
        phone:"",
        address:"",
        unit:1,
        description:"",
        deal_time:"",
        status:"pending"
      });

      fetchTasks();
    }catch(error){
      console.log(error);
      alert("Failed adding task");
    }
    finally{
      setCreating(false);
    }
  };

  return (
    <AdminLayoutWrapper>
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Tasks</h1>
            <p className="text-gray-500 mt-1">Manage, track, and complete your assigned system tasks.</p>
          </div>
          <button
            onClick={()=>setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold"
          >
            + Add Task
          </button>
        </div>

        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-3">
          { loading ? ( <p className="text-gray-500">Loading tasks...</p>) : tasks.length===0 ? ( <p className="text-gray-500">No tasks available.</p>)
            :
            tasks.map((task,index)=>(
            <div key={task.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-slate-50 transition">
              <div className="flex items-center gap-4">
                <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold">{String(index+1).padStart(2,"0")}</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{task.customer_name}</h3>
                      <p className="text-xs text-gray-400">{task.phone}</p>
                      <p className="text-xs text-gray-400">{task.address}</p>
                      <p className="text-xs text-gray-400">{task.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${task.status==="completed" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"}`}>{task.status}</span>
                    <p className="text-xs text-gray-400 mt-2">{task.deal_time}</p>
                </div>
            </div>
          ))}
        </div>

        {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-5">Add Manual Task</h2>
              <div className="space-y-3">
                <input name="customer_name" placeholder="Customer Name" value={form.customer_name} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
                <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
                <textarea name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
                <input name="unit" type="number" placeholder="Unit" value={form.unit} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
                <input name="deal_time" placeholder="Deal Time (example: 9 AM - 10 AM)" value={form.deal_time} onChange={handleChange} className="w-full border rounded-xl px-4 py-3"/>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>setShowModal(false)} className="flex-1 border rounded-xl py-3">Cancel</button>
                <button onClick={createTask} className="flex-1 bg-blue-600 text-white rounded-xl py-3">{creating ? "Saving..." : "Add Task"}</button>
              </div>
          </div>
        </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}