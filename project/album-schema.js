import mongoose from "mongoose";
const albumSchema = mongoose.Schema(
  {
    name: String,
    albumId: String,
    artistName: String,
    likes: { type: Number, default: 0 },
  },
  { collection: "albums" }
);

export default mongoose.model("Album", albumSchema);
