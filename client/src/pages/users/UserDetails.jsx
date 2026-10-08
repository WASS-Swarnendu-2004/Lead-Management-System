import React, { useEffect, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const UserDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(`/users/${id}`);

      setUser(response.data.user);
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

        {/* Back Button */}
        <button
          onClick={() => navigate("/users")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Users
        </button>

        {error ? (
          <p className="text-red-600 text-sm">
            {error}
          </p>
        ) : (
          <div className="bg-white border border-slate-200 rounded-lg p-6">

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-slate-900">
                  User Details
                </h1>

                <p className="text-sm text-slate-600 mt-1">
                  View user information
                </p>
              </div>

              <button
                onClick={() =>
                  navigate(`/users/${id}/edit`)
                }
                className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm"
              >
                <Pencil size={16} />
                Edit User
              </button>
            </div>

            {/* User Information */}
            <div className="space-y-4">

              {/* Name */}
              <div>
                <p className="text-sm text-slate-500">
                  Name
                </p>

                <p className="text-base font-medium text-slate-900 mt-1">
                  {user?.name}
                </p>
              </div>

              {/* Email */}
              <div>
                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="text-base font-medium text-slate-900 mt-1">
                  {user?.email}
                </p>
              </div>

              {/* Role */}
              <div>
                <p className="text-sm text-slate-500">
                  Role
                </p>

                <p className="text-base font-medium text-slate-900 mt-1 capitalize">
                  {user?.role}
                </p>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;