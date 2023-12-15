const mongoose = require("mongoose");

const VacancySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true, unique: false },
  title: { type: String, required: true, unique: false },
  salary: { type: String, required: true, unique: false },
  format: { type: String, required: true, unique: false },
  timeType: { type: String, required: true, unique: false },
  experience: { type: String, required: true, unique: false },
  description: { type: String, required: true, unique: false },
});

module.exports = mongoose.model("Vacancy", VacancySchema);
