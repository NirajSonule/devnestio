import express from "express";
import {
  register,
  login,
  logout,
  getUser,
} from "../controllers/authController.js";
import isAuthenticated from "../middleware/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/user", isAuthenticated, getUser);
authRouter.post("/logout", logout);

export default authRouter;
