"use client";

import { useState } from "react";
import { Plus, SquarePen, Trash2, X } from "lucide-react";

export default function AdminUsers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [users, setUsers] = useState([
    {
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      role: { label: "Owner Admin", color: "bg-slate-100 text-slate-800" },
      lastLogin: "2 hours ago",
    },
    {
      name: "Mark Thompson",
      email: "mark.thompson@hospital.com",
      role: { label: "Billing Admin", color: "bg-sky-100 text-sky-800" },
      lastLogin: "1 day ago",
    },
    {
      name: "Lisa Chen",
      email: "lisa.chen@hospital.com",
      role: { label: "Doctor Coordinator", color: "bg-teal-100 text-teal-800" },
      lastLogin: "Never",
    },
  ]);

  const handleAddUser = (event) => {
    event.preventDefault();
    const form = event.target;
    const newUser = {
      name: form.name.value,
      email: form.email.value,
      role: { label: form.role.value, color: "bg-teal-100 text-teal-800" },
      lastLogin: "Never",
    };
    setUsers([...users, newUser]);
    setIsModalOpen(false);
    form.reset();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Admin Users</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Admin</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-stone-50 border-b border-stone-200">
            <tr>
              <th className="text-left py-3 px-4 font-medium text-slate-900">Name</th>
              <th className="text-left py-3 px-4 font-medium text-slate-900">Email</th>
              <th className="text-left py-3 px-4 font-medium text-slate-900">Role</th>
              <th className="text-left py-3 px-4 font-medium text-slate-900">Last Login</th>
              <th className="text-left py-3 px-4 font-medium text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={idx} className="border-b border-stone-100">
                <td className="py-3 px-4 text-slate-900">{user.name}</td>
                <td className="py-3 px-4 text-slate-600">{user.email}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role.color}`}
                  >
                    {user.role.label}
                  </span>
                </td>
                <td className="py-3 px-4 text-slate-600">{user.lastLogin}</td>
                <td className="py-3 px-4">
                  <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Admin Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-slate-500 hover:text-slate-700"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Add Admin
            </h3>

            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  required
                  className="w-full px-4 py-2 border border-stone-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                >
                  <option>Owner Admin</option>
                  <option>Billing Admin</option>
                  <option>Doctor Coordinator</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-stone-300 text-slate-700 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                >
                  Add Admin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
