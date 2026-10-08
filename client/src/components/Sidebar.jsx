import React from "react";
import {
  LayoutDashboard,
  Users,
  UserRound,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user } = useSelector((state) => state.auth);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Leads",
      path: "/leads",
      icon: Users,
    },
  ];

  if (user?.role === "admin") {
    menuItems.push({
      name: "Users",
      path: "/users",
      icon: UserRound,
    });
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-slate-200">

        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <div>
            <h1 className="text-xl font-bold text-blue-600">
              LeadFlow
            </h1>

            <p className="text-xs text-slate-400">
              Lead Management System
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={19} />
                {item.name}
              </NavLink>
            );
          })}

        </nav>

        <div className="p-4 border-t border-slate-200">
          <div className="rounded-lg bg-slate-50 p-3">

            <p className="text-xs text-slate-400">
              Logged in as
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-800 truncate">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500 capitalize">
              {user?.role}
            </p>

          </div>
        </div>

      </aside>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">

          <div
            className="absolute inset-0 bg-slate-900/40"
            onClick={() => setMobileOpen(false)}
          />

          <aside className="relative w-72 h-full bg-white shadow-xl">

            <div className="h-16 flex items-center justify-between px-5 border-b border-slate-200">

              <h1 className="text-xl font-bold text-blue-600">
                LeadFlow
              </h1>

              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-slate-500 hover:bg-slate-100"
              >
                <X size={20} />
              </button>

            </div>

            <nav className="p-4 space-y-1">

              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition ${
                        isActive
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50"
                      }`
                    }
                  >
                    <Icon size={19} />
                    {item.name}
                  </NavLink>
                );
              })}

            </nav>

          </aside>

        </div>
      )}
    </>
  );
};

export default Sidebar;