const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserCandidate",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserCandidate",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);