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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            Hire<span className="text-primary">Loop</span>
          </h1>
          <p className="text-muted-foreground mt-2">Campus Recruitment Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl border p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Select Role</label>
            <div className="grid grid-cols-3 gap-3">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setSelectedRole(r.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all text-center ${
                    selectedRole === r.value
                      ? "border-primary bg-accent"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <div className={selectedRole === r.value ? "text-primary" : "text-muted-foreground"}>
                    {r.icon}
                  </div>
                  <span className="text-sm font-medium">{r.label}</span>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              {roles.find((r) => r.value === selectedRole)?.desc}
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Login as {roles.find((r) => r.value === selectedRole)?.label}
          </button>
        </form>
      </div>
    </div>
  );
}
