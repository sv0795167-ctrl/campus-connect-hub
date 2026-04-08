import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GraduationCap, Briefcase, Shield } from "lucide-react";

type Role = "student" | "recruiter" | "admin";

const roles = [
  { value: "student" as Role, label: "Student", icon: <GraduationCap size={24} />, desc: "Find jobs and track applications" },
  { value: "recruiter" as Role, label: "Recruiter", icon: <Briefcase size={24} />, desc: "Post jobs and manage applicants" },
  { value: "admin" as Role, label: "Admin", icon: <Shield size={24} />, desc: "Manage the placement portal" },
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState<Role>("student");
  const [name, setName] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    login(selectedRole, name.trim());
    navigate(`/${selectedRole}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold text-slate-900 mb-2">
            Hire<span className="text-purple-600">Loop</span>
          </h1>
          <p className="text-gray-600">Campus Recruitment Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-8 space-y-6 shadow-lg">
          <div>
            <label className="block text-sm font-semibold mb-3 text-slate-900">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-slate-900 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-4 text-slate-900">Select Your Role</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSelectedRole(r.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                    selectedRole === r.value
                      ? "border-purple-600 bg-purple-50"
                      : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                >
                  <div className={selectedRole === r.value ? "text-purple-600" : "text-gray-500"}>
                    {r.icon}
                  </div>
                  <span className="text-sm font-medium text-slate-900">{r.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-600 mt-3 text-center">
              {roles.find((r) => r.value === selectedRole)?.desc}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:from-purple-700 hover:to-purple-600 transition-all transform hover:scale-105"
          >
            Login as {roles.find((r) => r.value === selectedRole)?.label}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-6">
          This is a demo portal. Use any name to login.
        </p>
      </div>
    </div>
  );
}
