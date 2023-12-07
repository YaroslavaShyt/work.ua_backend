const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  value: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Token", TokenSchema);
