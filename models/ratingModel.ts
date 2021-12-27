import { Schema, model } from "mongoose";

const ratingModel = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "Users" },
  postId: { type: String, ref: "Posts" },
  rate: { type: Number, default: 0 },
});

export default model("Rating", ratingModel);
