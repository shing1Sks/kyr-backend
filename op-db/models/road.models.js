import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    images: [{ type: String }],
    description: {
      type: String,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Road = mongoose.model("Road", schema);
