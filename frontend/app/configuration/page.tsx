"use client";

import { useEffect, useState } from "react";
import { AdminLayoutWrapper } from "../dashboard/layout";
import api from "@/lib/api";

export default function ConfigurationPage() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const [showMemberModal, setShowMemberModal] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [memberName, setMemberName] = useState("");
  const [memberPhone, setMemberPhone] = useState("");
  const [memberRole, setMemberRole] = useState("Technician");
  const [addingMember, setAddingMember] = useState(false);

  const [showEditMemberModal, setShowEditMemberModal] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<number | null>(null);
  const [editMemberName, setEditMemberName] = useState("");
  const [editMemberPhone, setEditMemberPhone] = useState("");
  const [editMemberRole, setEditMemberRole] = useState("Technician");
  const [updatingMember, setUpdatingMember] = useState(false);

  const [search, setSearch] = useState("");

  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await api.get("/team-tables");
      setTeams(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const createTeam = async () => {
    if (!teamName.trim()) {
      alert("Team name is required");
      return;
    }

    try {
      setCreating(true);

      await api.post("/team-tables", {
        team_name: teamName,
        description,
      });

      setShowModal(false);
      setTeamName("");
      setDescription("");

      fetchTeams();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed creating team");
    } finally {
      setCreating(false);
    }
  };

  const deleteTeam = async (id: number) => {
    if (!confirm("Are you sure you want to delete this team?")) return;

    try {
      await api.delete(`/team-tables/${id}`);
      fetchTeams();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed deleting team");
    }
  };

  const addMember = async () => {
    if (!memberName || !memberPhone) {
      alert("Please fill all fields");
      return;
    }

    try {
      setAddingMember(true);
      await api.post(`/team-tables/${selectedTeamId}/members`, {
        name: memberName,
        phone: memberPhone,
        role: memberRole,
      });

      setShowMemberModal(false);

      setMemberName("");
      setMemberPhone("");
      setMemberRole("Technician");

      fetchTeams();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed adding member");
    } finally {
      setAddingMember(false);
    }
  };

  const editMember = (member: any) => {
    setEditingMemberId(member.id);
    setEditMemberName(member.name);
    setEditMemberPhone(member.phone);
    setEditMemberRole(member.role);

    setShowEditMemberModal(true);
  };

  const updateMember = async () => {
    if (!editMemberName || !editMemberPhone) {
      alert("Please fill all fields");
      return;
    }
    try {
      setUpdatingMember(true);
      await api.put(`/members/${editingMemberId}`, {
        name: editMemberName,
        phone: editMemberPhone,
        role: editMemberRole,
      });

      setShowEditMemberModal(false);

      fetchTeams();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed updating member");
    } finally {
      setUpdatingMember(false);
    }
  };

  const deleteMember = async (id: number) => {
    if (!confirm("Delete this member?")) return;

    try {
      await api.delete(`/members/${id}`);

      fetchTeams();
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed deleting member");
    }
  };

  return (
    <AdminLayoutWrapper>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Configuration</h1>
            <p className="text-gray-500 mt-1">
              Configure technician teams and assign members.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700"
          >
            + Create Team
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <p className="text-gray-500 text-sm">Total Teams</p>
            <h2 className="text-3xl font-bold mt-2">{teams.length}</h2>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <p className="text-gray-500 text-sm">Technicians</p>
            <h2 className="text-3xl font-bold mt-2">
              {teams.reduce((t, team) => t + team.members.length, 0)}
            </h2>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <p className="text-gray-500 text-sm">Available</p>
            <h2 className="text-3xl font-bold mt-2 text-green-600">-</h2>
          </div>
          <div className="bg-white rounded-2xl border shadow-sm p-6">
            <p className="text-gray-500 text-sm">Assigned Today</p>
            <h2 className="text-3xl font-bold mt-2 text-blue-600">-</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl border shadow-sm p-5">
          <input
            placeholder="Search team..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border px-4 py-3"
          />
        </div>

        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading teams...
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-white rounded-2xl border shadow-sm p-6"
            >
              <div className="flex justify-between">
                <div>
                  <h2 className="text-xl font-bold">{team.team_name}</h2>

                  <p className="text-sm text-gray-500">
                    {team.description || "-"}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Members</span>
                  <span>{team.members.length}/5</span>
                </div>

                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${(team.members.length / 5) * 100}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {team.members.map((member: any) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {member.name.charAt(0)}
                      </div>

                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editMember(member)}
                        className="h-8 w-8 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200"
                        title="Edit Member"
                      >
                        ✏️
                      </button>

                      <button
                        onClick={() => deleteMember(member.id)}
                        className="h-8 w-8 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                        title="Delete Member"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedTeamId(team.id);
                    setShowMemberModal(true);
                  }}
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-white font-semibold"
                >
                  + Add Member
                </button>
                <button
                  onClick={() => deleteTeam(team.id)}
                  className="flex-1 rounded-xl bg-red-600 py-3 text-white font-semibold hover:bg-red-700"
                >
                  Delete Team
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE TEAM MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-5">Create Team</h2>

              <input
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-4"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 border rounded-xl py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={createTeam}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3"
                >
                  {creating ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ADD MEMBER MODAL */}
        {showMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-5">Add Member</h2>

              <input
                placeholder="Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-3"
              />

              <input
                placeholder="Phone"
                value={memberPhone}
                onChange={(e) => setMemberPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-3"
              />

              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Technician</option>
              </select>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowMemberModal(false)}
                  className="flex-1 border rounded-xl py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={addMember}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3"
                >
                  {addingMember ? "Adding..." : "Add"}
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditMemberModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-5">Edit Member</h2>
              <input
                placeholder="Name"
                value={editMemberName}
                onChange={(e) => setEditMemberName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-3"
              />
              <input
                placeholder="Phone"
                value={editMemberPhone}
                onChange={(e) => setEditMemberPhone(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-3"
              />
              <select
                value={editMemberRole}
                onChange={(e) => setEditMemberRole(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Technician</option>
              </select>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowEditMemberModal(false)}
                  className="flex-1 border rounded-xl py-3"
                >
                  Cancel
                </button>
                <button
                  onClick={updateMember}
                  className="flex-1 bg-blue-600 text-white rounded-xl py-3"
                >
                  {updatingMember ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayoutWrapper>
  );
}
