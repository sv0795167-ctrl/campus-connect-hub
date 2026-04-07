import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import SidebarLink from "../components/SidebarLink";
import {
  LayoutDashboard, Briefcase, FileText, ClipboardList,
  MessageSquare, Users, PlusCircle, Building2, Megaphone,
  LogOut, Menu, X
} from "lucide-react";
import { useState } from "react";

const studentLinks = [
  { to: "/student", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/student/jobs", icon: <Briefcase size={18} />, label: "Job Listings" },
  { to: "/student/resume", icon: <FileText size={18} />, label: "Resume Builder" },
  { to: "/student/tracker", icon: <ClipboardList size={18} />, label: "Application Tracker" },
  { to: "/student/interview", icon: <MessageSquare size={18} />, label: "Mock Interview" },
];

const recruiterLinks = [
  { to: "/recruiter", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/recruiter/post", icon: <PlusCircle size={18} />, label: "Post Job" },
  { to: "/recruiter/applicants", icon: <Users size={18} />, label: "Applicants" },
];

const adminLinks = [
  { to: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { to: "/admin/companies", icon: <Building2 size={18} />, label: "Company Approval" },
  { to: "/admin/announcements", icon: <Megaphone size={18} />, label: "Announcements" },
];

export default function DashboardLayout() {
  const { role, name, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const links = role === "student" ? studentLinks : role === "recruiter" ? recruiterLinks : adminLinks;
  const roleLabel = role === "student" ? "Student" : role === "recruiter" ? "Recruiter" : "Admin";

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-sidebar flex flex-col transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary-foreground">
            Hire<span className="text-sidebar-primary">Loop</span>
          </h1>
          <p className="text-xs text-sidebar-foreground mt-1">{roleLabel} Portal</p>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map((link) => (
            <div key={link.to} onClick={() => setSidebarOpen(false)}>
              <SidebarLink {...link} />
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground text-sm font-medium">
              {name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-accent-foreground truncate">{name}</p>
              <p className="text-xs text-sidebar-foreground capitalize">{role}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-sm text-sidebar-foreground hover:text-destructive w-full px-2 py-1.5 rounded transition-colors"
          >
            <LogOut size={16} />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-20 h-14 bg-card border-b flex items-center px-4 lg:px-6">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted"
          >
            <Menu size={20} />
          </button>
          <div className="ml-auto text-sm text-muted-foreground">
            Welcome, <span className="font-medium text-foreground">{name}</span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
