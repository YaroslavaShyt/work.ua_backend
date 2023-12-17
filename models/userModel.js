const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // for both
  usertype: { type: String, required: true, unique: false },
  name: { type: String, required: true, unique: false },
  city: { type: String, required: true, unique: false },
  contactNumber: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  socialMediaLinks: { type: Array, required: false, unique: false },
  password: { type: String, required: true, unique: false },
  profilePhoto: {
    type: String,
    required: false,
    default:
      "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1695570648~exp=1695571248~hmac=7bc19d9ab602ed742103799d5c406404f59d4300a2194f9141f0ccc2446ebe71",
    unique: false,
  },

  // only for candidate profile
  surname: { type: String, required: false, unique: false },
  patronymic: { type: String, required: false, unique: false },
  birthDate: { type: String, required: false, unique: false },

  // only for company profile
  title: { type: String, required: false, unique: false },
  workersQuantity: { type: String, required: false, unique: false },
  serviceType: { type: String, required: false, unique: false },
  description: { type: String, required: false, unique: false },
});

module.exports = mongoose.model("User", UserSchema);
