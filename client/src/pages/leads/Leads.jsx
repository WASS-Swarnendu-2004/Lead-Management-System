import React, { useEffect, useState } from "react";
import { Plus, Eye, Pencil, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../../api/axios";

const Leads = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const leadsPerPage = 5;

  const fetchLeads = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/leads");

      setLeads(response.data.leads);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?",
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setDeletingId(id);
      setError("");

      await api.delete(`/leads/${id}`);

      await fetchLeads();
    } catch (error) {
      setError(error.response?.data?.message || "Unable to delete lead");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      lead.name?.toLowerCase().includes(searchText) ||
      lead.email?.toLowerCase().includes(searchText) ||
      lead.phone?.includes(searchText) ||
      lead.company?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "all" || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const startIndex = (currentPage - 1) * leadsPerPage;

  const endIndex = startIndex + leadsPerPage;

  const currentLeads = filteredLeads.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center w-9 h-9 border border-slate-300 rounded-lg bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Leads</h1>

            <p className="text-sm text-slate-600 mt-1">Manage your leads</p>
          </div>
        </div>

        <button
          onClick={() => navigate("/leads/create")}
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={18} />
          Add Lead
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
              placeholder="Search by name, email, phone or company"
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Status
            </label>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto">
        {loading ? (
          <p className="p-6 text-slate-600">Loading Leads...</p>
        ) : filteredLeads.length === 0 ? (
          <p className="p-6 text-slate-600">No leads found</p>
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
                    Phone
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Company
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Status
                  </th>

                  <th className="px-4 py-3 text-sm font-medium text-slate-600">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentLeads.map((lead) => (
                  <tr key={lead._id} className="border-b border-slate-100">
                    <td className="px-4 py-3 text-sm">{lead.name}</td>

                    <td className="px-4 py-3 text-sm">{lead.email}</td>

                    <td className="px-4 py-3 text-sm">{lead.phone}</td>

                    <td className="px-4 py-3 text-sm">{lead.company}</td>

                    <td className="px-4 py-3 text-sm">{lead.status}</td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        
                        <button
                          onClick={() => navigate(`/leads/${lead._id}`)}
                          className="text-slate-600 hover:text-slate-900"
                          title="View"
                        >
                          <Eye size={18} />
                        </button>

                        
                        <button
                          onClick={() => navigate(`/leads/${lead._id}/edit`)}
                          className="text-slate-600 hover:text-slate-900"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>

                        
                        {user?.role === "admin" && (
                          <button
                            onClick={() => handleDelete(lead._id)}
                            disabled={deletingId === lead._id}
                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-4 py-4 border-t border-slate-200">
              <p className="text-sm text-slate-600">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredLeads.length)} of{" "}
                {filteredLeads.length}
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

export default Leads;
