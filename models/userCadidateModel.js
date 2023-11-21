const mongoose = require("mongoose");

const UserCandidateSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: false },
  surname: { type: String, required: true, unique: false },
  patronymic: { type: String, required: true, unique: false },
  birthDate: { type: String, required: true, unique: false },
  city: { type: String, required: true, unique: false },
  contactNumber: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: false },
  socialMediaLinks: { type: Array, required: false, unique: false },
  password: { type: String, required: true, unique: false },
  profilePhoto: {
    type: String,
    required: false,
    default:
      "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1695570648~exp=1695571248~hmac=7bc19d9ab602ed742103799d5c406404f59d4300a2194f9141f0ccc2446ebe71",
    unique: false,
  },
});

module.exports = mongoose.model("UserCandidate", UserCandidateSchema);
