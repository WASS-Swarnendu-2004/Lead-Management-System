import React from "react";
import { Menu, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ setMobileOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6">

      {/* Left */}
      <div className="flex items-center gap-3">

        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
        >
          <Menu size={21} />
        </button>

        <div className="lg:hidden">
          <h1 className="font-bold text-blue-600">
            LeadFlow
          </h1>
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <div className="hidden sm:flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <User size={18} />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-800">
              {user?.name}
            </p>

            <p className="text-xs text-slate-500 capitalize">
              {user?.role}
            </p>
          </div>

        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition"
        >
          <LogOut size={17} />
          <span className="hidden sm:inline">
            Logout
          </span>
        </button>

      </div>

    </header>
  );
};

export default Navbar;