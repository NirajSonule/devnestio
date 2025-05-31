import express from "express";
import { deleteAccount, profileForm } from "../controllers/userController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.patch("/profile-form", isAuthenticated, profileForm);
userRouter.delete("/delete-account", isAuthenticated, deleteAccount);

export default userRouter;
