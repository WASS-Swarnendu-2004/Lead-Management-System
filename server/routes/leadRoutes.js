import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { authorizeRoles } from "../middleware/roleMiddleware.js"
import { createLead, deleteLead, getAllLeads, getLeadById, updateLead } from "../controllers/leadController.js"

const leadRouter = express.Router()

leadRouter.post("/", protect, authorizeRoles("admin", "manager", "sales"), createLead)

leadRouter.get("/", protect, authorizeRoles("admin", "manager", "sales"), getAllLeads)

leadRouter.get("/:id", protect, authorizeRoles("admin", "manager", "sales"), getLeadById)

leadRouter.put("/:id", protect, authorizeRoles("admin", "manager", "sales"), updateLead)

leadRouter.delete("/:id", protect, authorizeRoles("admin"), deleteLead)

export default leadRouter
