import { Schema, model } from "mongoose";

const user = new Schema(
  {
    nickname: { type: String, required: true, _id: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", _id: false },
  },
  { _id: true }
);

const PostModel = new Schema(
  {
    id: { type: String, unique: true, required: true },
    user: user,
    title: { type: String, unique: true, required: true },
    content: [Schema.Types.Mixed],
    rating: { type: Number, default: 0 },
    creatingDate: { type: String, required: false },
  },
  { _id: true }
);

export default model("Posts", PostModel);
