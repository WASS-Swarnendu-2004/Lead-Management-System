import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const EditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "sales",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/users/${id}`);

      const user = response.data.user;

      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "sales",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to fetch user"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);
      setError("");

      await api.put(`/users/${id}`, formData);

      navigate(`/users/${id}`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update user"
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <p className="text-slate-600">
          Loading User...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-2xl mx-auto">

      
        <button
          onClick={() => navigate(`/users/${id}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to User
        </button>

        <div className="bg-white border border-slate-200 rounded-lg p-6">

         
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Edit User
            </h1>

            <p className="text-sm text-slate-600 mt-1">
              Update user information
            </p>
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4">
              {error}
            </p>
          )}

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
                  Role
                </label>

                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="sales">
                    Sales
                  </option>

                  <option value="manager">
                    Manager
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </div>

            </div>

           
            <div className="flex items-center gap-3 mt-6">

              <button
                type="button"
                onClick={() => navigate(`/users/${id}`)}
                className="border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={updating}
                className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update User"}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EditUser;