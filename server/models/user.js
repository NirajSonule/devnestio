import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const LinksSchema = new mongoose.Schema(
  {
    github: { type: String },
    linkedin: { type: String },
    portfolio: { type: String },
  },
  { _id: false }
);

const ExperienceSchema = new mongoose.Schema(
  {
    role: { type: String },
    company: { type: String },
    duration: { type: String },
  },
  { _id: false }
);

const EducationSchema = new mongoose.Schema(
  {
    degree: { type: String },
    institution: { type: String },
    duration: { type: String },
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    profile_image: { type: String },
    bio: { type: String },
    location: { type: String },
    teach_stack: { type: String },

    links: LinksSchema,
    experience: [ExperienceSchema],
    education: [EducationSchema],

    githubUsername: { type: String },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", UserSchema);

export default User;
