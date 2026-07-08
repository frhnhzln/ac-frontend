"use client";

import { AdminLayoutWrapper } from "../dashboard/layout";

const teams = [
  {
    id: 1,
    name: "Team Alpha",
    leader: "Ahmad",
    maxMembers: 5,
    members: ["Ali", "Abu", "Hakim"],
    status: "Active",
  },
  {
    id: 2,
    name: "Team Bravo",
    leader: "Zaki",
    maxMembers: 5,
    members: ["Firdaus", "Daniel", "Amir", "Syafiq", "Faiz"],
    status: "Full",
  },
];

export default function ConfigurationPage() {
  return (
    <AdminLayoutWrapper>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Configuration
            </h1>
            <p className="text-gray-500 mt-1">
              Configure technician teams and assign members.
            </p>
          </div>

          <button className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition">
            + Create Team
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Total Teams</p>
            <h2 className="text-3xl font-bold mt-2">2</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Technicians</p>
            <h2 className="text-3xl font-bold mt-2">8</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Available</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">3</h2>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-gray-500 text-sm">Assigned Today</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">5</h2>
          </div>

        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <input
            type="text"
            placeholder="Search team..."
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600"
          />
        </div>

        {/* Team Cards */}
        <div className="grid lg:grid-cols-2 gap-6">

          {teams.map((team) => (

            <div
              key={team.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6"
            >

              {/* Header */}
              <div className="flex justify-between items-start">

                <div>

                  <h2 className="text-xl font-bold text-gray-800">
                    {team.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Team Leader
                  </p>

                  <p className="font-medium">
                    {team.leader}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    team.status === "Full"
                      ? "bg-red-50 text-red-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {team.status}
                </span>

              </div>

              {/* Members Counter */}
              <div className="mt-6">

                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Members</span>

                  <span>
                    {team.members.length} / {team.maxMembers}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-blue-600"
                    style={{
                      width: `${
                        (team.members.length / team.maxMembers) * 100
                      }%`,
                    }}
                  />

                </div>

              </div>

              {/* Members */}
              <div className="mt-6 space-y-3">

                {team.members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3"
                  >

                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                      {member.charAt(0)}
                    </div>

                    <div>
                      <p className="font-medium text-gray-800">
                        {member}
                      </p>

                      <p className="text-xs text-gray-500">
                        Technician
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-3">
                <button className="flex-1 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition">
                  + Add Member
                </button>
                <button className="rounded-xl border border-gray-300 px-5 hover:bg-gray-50">
                  Edit
                </button>
                <button className="rounded-xl border border-red-300 text-red-600 px-5 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}