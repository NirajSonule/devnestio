import User from "../models/user.js";

const profileForm = async (req, res) => {
  const userId = req.user._id;

  const {
    profile_image,
    bio,
    location,
    tech_stack,
    links,
    experience,
    education,
    githubUsername,
  } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profile_image,
        bio,
        location,
        tech_stack,
        links,
        experience,
        education,
        githubUsername,
      },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile successfully updated",
      updatedUser,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

const deleteAccount = async (req, res) => {
  const userId = req.user._id;

  try {
    await User.findByIdAndDelete(userId);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting account" });
  }
};

export { profileForm, deleteAccount };
