import express from "express";
import isAuthenticated from "../middleware/authMiddleware.js";
import { follow, unFollow } from "../controllers/followController.js";

const followRouter = express.Router();

followRouter.post("/:id/follow", isAuthenticated, follow);
followRouter.delete("/:id/unfollow", isAuthenticated, unFollow);

export default followRouter;
