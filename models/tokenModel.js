const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: false },
  value: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Token", TokenSchema);
