const mongoose = require("mongoose");

const CVSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  position: { type: String, required: true, unique: false },
  city: { type: Array, required: false, unique: false },
  description: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("CV", CVSchema);
