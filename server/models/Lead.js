import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["new", "contacted", "qualified", "converted", "lost"],
    default:"new"
  },
  source: {
    type: String,
    enum: ["website", "referral", "social_media", "advertisement", "other"],
    default:"other"
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  }
}, { timestamps: true })

const Lead = mongoose.model("Lead", leadSchema)
export default Lead