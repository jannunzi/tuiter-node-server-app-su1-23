import mongoose from "mongoose";
const tuitsSchema = new mongoose.Schema(
  {
    topic: String,
    title: String,
    tuit: String,
    created: { type: Date, default: Date.now },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  },
  { collection: "tuits" }
);

export default tuitsSchema;
