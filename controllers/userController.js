const User = require("../models/userModel");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUser: async (req, res) => {
   // console.log("in update user candidate");
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_WORD
      ).toString();
    }

    try {
      const UpdateUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // console.log(UpdateUser);
      // const { password, __v, createdAt, ...others } = this.UpdateUser._doc;

      res.status(200).json({ UpdateUser }); // ...others });
    } catch {
      res.status(500).json("Some error occured");
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      req.status(200).json({ success: true });
    } catch (error) {
      res.status(404).json({ success: false, error: error });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(404).json({ success: false, error: error });
    }
  },

  getAllUsers: async (req, res) => {
    // try {
    console.log("in function");
    const users = await User.find();
    console.log(users);
    res.status(200).json(users);
    // } catch (error) {
    //  res.status(404).json({ success: false, error: error });
    // }
  },
};
