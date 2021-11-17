import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  nickname: { type: String, unique: true, required: true },
  password: { type: String, unique: false, required: true },
  isActivated: { type: Boolean, default: false },
  activationLink: { type: String },
  role: [{ type: String, default: "user" }],
  avatar: { type: String, default: "defaultAvatar.jpeg" },
});

export default model("User", UserSchema);
