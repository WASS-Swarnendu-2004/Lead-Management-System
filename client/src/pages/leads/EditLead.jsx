import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";

const EditLead = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    source:"other",
  })

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchLead = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get(`/leads/${id}`)

      const lead = response.data.lead
      setFormData({
        name: lead.name || "",
        email: lead.email || "",
        phone: lead.phone || "",
        company: lead.company || "",
        status: lead.status || "new",
        source: lead.source || "other",
      })
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to fetch lead"
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLead();
  }, [id])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^[1-9][0-9]{9}$/.test(formData.phone)) {
      setError(
        "Phone number must be exactly 10 digits and cannot start with 0"
      )
      return
    }

    try {
      setSaving(true)
      setError("")
      await api.put(`/leads/${id}`, formData)
      navigate(`/leads/${id}`)
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to update lead"
      )
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <p className="text-slate-600">
          Loading lead...
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate(`/leads/${id}`)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Lead
        </button>
        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-slate-900">
              Edit Lead
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Update lead information
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
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500" required/> 
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500" required/> 
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500" required maxLength={10}/> 
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                
                <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500" required /> 
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Source
                </label>

                <select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"
                >
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social_media">
                    Social Media
                  </option>
                  <option value="advertisement">
                    Advertisement
                  </option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              <button type="button"  onClick={() => navigate(`/leads/${id}`)} className="border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm hover:bg-slate-50">
                Cancel
              </button>

              <button type="submit" disabled={saving} className="bg-slate-900 text-white px-5 py-2 rounded-lg text-sm disabled:opacity-50">
                {saving ? "Updating..." : "Update Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditLead