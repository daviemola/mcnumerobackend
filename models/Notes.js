import mongoose from "mongoose";

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: "Please enter a title.",
    },
    isWorkOrder: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: "Please enter a description.",
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Notes", noteSchema);

export default Notes;
