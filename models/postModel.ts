import { Schema, model } from "mongoose";

const author = new Schema(
  {
    author: { type: String, required: true, _id: false },
    userId: { type: Schema.Types.ObjectId, ref: "User", _id: false },
  },
  { _id: true }
);

const PostModel = new Schema({
  user: author,
  title: { type: String, unique: true, required: true },
  content: [Schema.Types.Mixed],
  rating: { type: Number, default: 0 },
  creatingDate: { type: String, required: false },
});

export default model("Posts", PostModel);
