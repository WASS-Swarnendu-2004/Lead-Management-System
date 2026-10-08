import Lead from "../models/Lead.js"

export const createLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, source } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).json({
        message:"Name, email, phone are required."
      })
    }
    const phoneRegex = /^[1-9][0-9]{9}$/;

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: "Phone number must be exactly 10 digits and cannot start with 0"
      })
    }
    const lead = await Lead.create({
      name : String(name).trim(),
      email : String(email).toLowerCase().trim(),
      phone : String(phone).trim(),
     company : company ? String(company).trim() : undefined,
      status,
      source,
      createdBy:req.user._id
    })
    return res.status(200).json({
      message: "Lead Created Successfully.",
      lead
    })
  } catch (error) {
    return res.status(500).json({message:`Create Lead Error: ${error}`})
  }
}

export const getAllLeads = async (req, res) => {
  try {
    let filter = {}

    if (req.user.role === "sales") {
      filter = {
        createdBy: req.user._id
      }
    }

    const leads = await Lead.find(filter)
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 })
    
    return res.status(200).json({
      count: leads.length,
      leads
    })
  } catch (error) {
    return res.status(500).json({
      message: `Get all Leads ERROR: ${error}`
    })
  }
}

export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate("createdBy", "name email role")
    
    if (!lead) {
      return res.status(404).json({message:"Lead not found"})
    }
    if (req.user.role === "sales" && lead.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:"You do not have permission to view this lead"
      })
    }

    return res.status(200).json({lead})
  } catch (error) {
    return res.status(500).json({
      message:`Get lead By ID error: ${error}`
    })
  }
}

export const updateLead = async (req, res) => {
  try {
    const { name, email, phone, company, status, source } = req.body
    
    const lead = await Lead.findById(req.params.id)

    if(!lead){
      return res.status(404).json({
        message: "Lead not found"
      })
    }

    if (req.user.role === "sales" && lead.createdBy._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You do not have permission to update this lead"
      })
    }

    if (phone) {
      const phoneRegex = /^[1-9][0-9]{9}$/
      if (!phoneRegex.test(phone)) {
        return res.status(400).json({
          message: "Phone number must be exactly 10 digits and cannot start with 0"
        })
      }
    }

    if (name) {
      lead.name = name.trim()
    }
    if (email) {
      lead.email = email.toLowerCase().trim()
    }
    if (phone) {
      lead.phone = phone.trim()
    }
    if (company !== undefined) {
      lead.company = company.trim()
    }
    if (status) {
      lead.status = status
    }
    if (source) {
      lead.source = source
    }
    await lead.save()

    return res.status(200).json({
      message:"Lead updated successfully"
    })
  } catch (error) {
    return res.status(500).json({
      message:`Update Lead error ${error}`
    })
  }
}

export const deleteLead = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)

    if (!lead) {
      return res.status(404).json({message:"Lead not found"})
    }

    await Lead.findByIdAndDelete(req.params.id)

    return res.status(200).json({
      message:"Lead Deleted successfully"
    })
  } catch (error) {
    return res.status(500).json({message:`Delete Lead error: ${error}` })
  }
}