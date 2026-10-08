import React, { useState } from "react";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "sales",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      await api.post("/users", formData);
      navigate("/users");
    } catch (error) {
      setError(error.response?.data?.message || "Unable to create user");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6" onClick={()=>navigate("/users")}>
          <ArrowLeft size={18} />
          Back to Users
        </button>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Create User
            </h1>

            <p className="text-sm text-slate-600 mt-1">
              Add a new application user
            </p>
          </div>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 pr-10 outline-none focus:border-slate-500"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="sales">Sales</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate("/users")}
                className="border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
