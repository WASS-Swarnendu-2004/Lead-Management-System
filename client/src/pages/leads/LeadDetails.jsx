import React, { useEffect, useState } from "react";
import { ArrowLeft, Pencil } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";


const LeadDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const [lead, setLead] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const fetchLead = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get(`/leads/${id}`)
      setLead(response.data.lead)
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
    fetchLead()
  }, [id])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <p className="text-slate-600">
          Loading lead...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <p className="text-red-600">
          {error}
        </p>
      </div>
    )
  }

  if (!lead) {
    return (
      <div className="min-h-screen bg-slate-100 p-4">
        <p className="text-slate-600">
          Lead not found
        </p>
      </div>
    )
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
          <div className="text-2xl font-semibold text-slate-900">
            <h1 className="text-2xl font-semibold text-slate-900">
              Lead Deatils
            </h1>
            <p className="text-sm text-slate-600 mt-1">
                View Lead information
            </p>
          </div>
          <button
            onClick={() => navigate(`/leads/${id}/edit`)}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm"
          >
            <Pencil size={16} />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-slate-500">
              Name
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.name}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Email
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.email}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Phone
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.phone}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Company
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.company}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Status
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.status}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">
              Source
            </p>
            <p className="font-medium text-slate-900 mt-1">
              {lead.source?.replace("_","")}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default LeadDetails