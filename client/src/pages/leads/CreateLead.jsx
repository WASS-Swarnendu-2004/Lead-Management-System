import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CreateLead = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    status: "new",
    source: "other",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const handleChange = (e) => {
    setFormData( {
      ...formData,
      [e.target.name] : e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    if (!/^[1-9][0-9]{9}$/.test(formData.phone)) {
      setError(
        "Phone number must be exactly 10 digits and cannot start with 0"
      )
      return
    }
    try {
      setLoading(true)
      await api.post("/leads", formData)
      navigate("/leads")
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create lead"
      )
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="min-h-screen bg-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => navigate("/leads")}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Leads
        </button>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h1 className="text-2xl font-semibold text-slate-900">
              Create Lead
          </h1>
          <p className="text-sm text-slate-600 mt-1 mb-6">
            Add a new Lead
          </p>
          {error && (
            <p className="text-sm text-red-600 mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="text" name="email" value={formData.email} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} required className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                <input type="text" name="company" value={formData.company} onChange={handleChange} required className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500"/>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500">
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="converted">Converted</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

               <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Source</label>
                <select name="source" value={formData.source} onChange={handleChange} className="w-full border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-slate-500">
                  <option value="website">Website</option>
                  <option value="referral">Referral</option>
                  <option value="social_media">Social Media</option>
                  <option value="advertisement">Advertisement</option>
                  <option value="other">Other</option>
                </select>
              </div>

            </div>

            <div className="flex justify-end mt-6">
              <button type="submit" disabled={loading} className="bg-slate-900 text-white px-5 py-7 rounded-lg textsm disabled:opacity-50">
                {loading ? "Creating..." : "Create Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default CreateLead