import User from "../models/user.js";

const follow = async (req, res) => {
  const userId = req.user._id;
  const { id: otherUserId } = req.params;

  if (userId === otherUserId) {
    return res
      .status(400)
      .json({ success: false, message: "You cannot follow yourself" });
  }

  try {
    const userToFollow = await User.findById(otherUserId);
    const currentUser = await User.findById(userId);

    if (!userToFollow || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.following.includes(otherUserId)) {
      return res
        .status(400)
        .json({ success: false, message: "You already follow this user" });
    }

    currentUser.following.push(otherUserId);
    userToFollow.followers.push(userId);

    await currentUser.save();
    await userToFollow.save();

    return res
      .status(200)
      .json({ success: true, message: "User followed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error following user" });
  }
};

const unFollow = async (req, res) => {
  const userId = req.user._id;
  const { id: otherUserId } = req.params;

  if (userId === otherUserId) {
    return res
      .status(400)
      .json({ success: false, message: "You cannot unfollow yourself" });
  }

  try {
    const userToUnFollow = await User.findById(otherUserId);
    const currentUser = await User.findById(userId);

    if (!userToUnFollow || !currentUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    currentUser.following = currentUser.following.filter(
      (id) => id.toString() !== otherUserId
    );
    userToUnFollow.followers = userToUnFollow.followers.filter(
      (id) => id.toString() !== userId
    );

    await currentUser.save();
    await userToUnFollow.save();

    return res
      .status(200)
      .json({ success: true, message: "User unfollowed successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Error unfollowing user" });
  }
};

export { follow, unFollow };
