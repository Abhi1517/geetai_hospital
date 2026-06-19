import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    image: { type: String, default: "" },
    content: { type: String, required: true },
    category: { type: String, default: "General" },
    tags: { type: [String], default: [] },
    author: { type: String, default: "Geetai Hospitals" },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Blog", blogSchema);
