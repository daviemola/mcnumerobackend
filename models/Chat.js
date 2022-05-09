import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    chatName: {
      type: String,
      required: "Please enter a chat name.",
    },
    isClientChat: {
      type: Boolean,
      default: false,
    },
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  },
  {
    timestamps: true,
  }
);

const Notes = mongoose.model("Chats", chatSchema);

export default Notes;
