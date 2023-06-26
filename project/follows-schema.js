import mongoose from "mongoose";
const followsSchema = mongoose.Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    followed: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "follows" }
);

export default mongoose.model("Follows", followsSchema);
