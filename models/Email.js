import mongoose from "mongoose";

const emailSchema = mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: "Please enter a title.",
    },
    message: {
      type: String,
      required: "Please enter a message.",
    },
    attachments: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Emails = mongoose.model("Emails", emailSchema);

export default Emails;
