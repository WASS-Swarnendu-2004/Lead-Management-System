import React, { useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Navber from "../components/Navber";

const Dashboard = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-slate-100">

      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      <div className="lg:pl-64">

        <Navber setMobileOpen={setMobileOpen} />

        <main className="p-4 sm:p-6">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-900">
              Welcome back, {user?.name}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Here's an overview of your lead management system.
            </p>

          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">
                Your Role
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900 capitalize">
                {user?.role}
              </p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">
                Account
              </p>

              <p className="mt-2 text-lg font-bold text-slate-900 truncate">
                {user?.email}
              </p>
            </div>

          </div>

          <div className="mt-6 bg-white rounded-xl border border-slate-200 p-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Lead Management
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Use the sidebar to manage your leads and, if you are an
              administrator, your users.
            </p>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard;