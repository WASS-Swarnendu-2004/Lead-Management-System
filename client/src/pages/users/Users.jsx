import React, { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const Users = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/users");

      setUsers(response.data.users);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/users/${id}`);

      await fetchUsers();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete user");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText);

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const endIndex = startIndex + usersPerPage;

  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, roleFilter]);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-4"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Users</h1>

          <p className="text-sm text-slate-600 mt-1">
            Manage application users
          </p>
        </div>

        <button
          onClick={() => navigate("/users/create")}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={18} />
          Add User
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Role
            </label>

            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-slate-600">Loading Users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="p-6 text-slate-600">No users found</p>
        ) : (
          <>
            <table className="w-full text-left">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Name
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Email
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Role
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user._id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm">{user.name}</td>

                    <td className="px-4 py-3 text-sm">{user.email}</td>

                    <td className="px-4 py-3 text-sm capitalize">
                      {user.role}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => navigate(`/users/${user._id}`)}
                          className="text-slate-600 hover:text-slate-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          onClick={() => navigate(`/users/${user._id}/edit`)}
                          className="text-slate-600 hover:text-slate-900"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => handleDelete(user._id)}
                          disabled={deletingId === user._id}
                          className="text-red-600 hover:text-red-800 disabled:opacity-50"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredUsers.length)} of{" "}
                {filteredUsers.length}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((page) => page - 1)}
                  disabled={currentPage === 1}
                  className="border border-slate-300 px-3 py-1.5 rounded-lg text-sm disabled:opacity-50"
                >
                  Previous
                </button>

                <span className="text-sm text-slate-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((page) => page + 1)}
                  disabled={currentPage === totalPages}
                  className="border border-slate-300 px-3 py-1.5 rounded-lg text-sm disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Users;
