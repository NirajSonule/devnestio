import User from "../models/user.js";
import { verifyToken } from "../utils/jwt.js";

const isAuthenticated = async (req, res, next) => {
  const token = req.cookies.token;

  try {
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authenticated" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Authentication error" });
  }
};

export default isAuthenticated;
