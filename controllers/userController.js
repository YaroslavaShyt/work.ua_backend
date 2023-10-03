const UserCandidate = require("../models/userCadidateModel");
const CryptoJS = require("crypto-js");

module.exports = {
  updateUserCandidate: async (req, res) => {
    console.log("in update user candidate");
    if (req.body.password) {
      req.body.password = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_WORD
      ).toString();
    }

    try {
      const UpdateUser = await UserCandidate.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      console.log(UpdateUser);
      const { password, __v, createdAt, ...others } = this.UpdateUser._doc;

      res.status(200).json({ ...others });
    } catch {
      res.status(500).json("Some error occured");
    }
  },
};
