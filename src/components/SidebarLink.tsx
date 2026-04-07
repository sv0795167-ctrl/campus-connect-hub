import { NavLink as RouterNavLink } from "react-router-dom";
import { ReactNode } from "react";

interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
}

export default function SidebarLink({ to, icon, label }: SidebarLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
          isActive
            ? "bg-sidebar-accent text-sidebar-primary font-medium"
            : "text-sidebar-foreground hover:bg-sidebar-accent/50"
        }`
      }
    >
      {icon}
      <span>{label}</span>
    </RouterNavLink>
  );
}
