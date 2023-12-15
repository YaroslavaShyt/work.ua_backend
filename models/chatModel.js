const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    position: { type: String, required: true },
    companyName: { type: String, required: true },
    isGroupChat: { type: Boolean, default: false },
    user: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    latestMessage: {
      type: mongoose.Schema.ObjectId,
      ref: "Message",
      required: false,
    },
    groupAdmin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", chatSchema);
