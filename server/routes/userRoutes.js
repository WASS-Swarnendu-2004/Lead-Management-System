import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const userRouter = express.Router();

userRouter.post("/", protect, authorizeRoles("admin"), createUser);
userRouter.get("/", protect, authorizeRoles("admin"), getAllUsers)
userRouter.get("/:id", protect, authorizeRoles("admin"), getUserById)
userRouter.put("/:id", protect, authorizeRoles("admin"), updateUser)
userRouter.delete("/:id", protect, authorizeRoles("admin"), deleteUser)

export default userRouter;