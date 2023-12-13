const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    position: { type: String },
    companyName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
