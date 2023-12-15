const User = require("../models/userModel");

const Token = require("../models/tokenModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports = {
  createUser: async (req, res) => {
    req.body.usertype == "candidate"
      ? (newUser = new User({
          usertype: req.body.usertype,
          name: req.body.name,
          surname: req.body.surname,
          patronymic: req.body.patronymic,
          birthDate: req.body.birthDate,
          city: req.body.city,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          // remove links
          socialMediaLinks: req.body.socialMediaLinks,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_WORD
          ).toString(),
          profilePhoto: req.body.profilePhoto,
        }))
      : (newUser = new User({
          usertype: req.body.usertype,
          city: req.body.city,
          name: req.body.name,
          title: req.body.title,
          workersQuantity: req.body.workersQuantity,
          serviceType: req.body.serviceType,
          description: req.body.description,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          socialMediaLinks: req.body.socialMediaLinks,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_WORD
          ).toString(),
          profilePhoto: req.body.profilePhoto,
        }));
    try {
      //console.log(request);
      //console.log("an attempt made");

      const savedUser = await newUser.save();

      const userToken = jwt.sign(
        {
          id: savedUser._id,
          password: savedUser.password,
        },
        process.env.JWT_SEC,
        { expiresIn: "50d" }
      );

      const tokenValue = await new Token({
        userId: savedUser._id,
        value: userToken,
      }).save();

      //console.log(`token ${tokenValue}`);
      const responseData = {
        success: true,
        statuscode: 201,
        data: { token: tokenValue.value, id: savedUser._id },
      };
      //console.log("here1");
      res.status(201).json(responseData); // {success: true, statuscode: res.status(201)}
      //console.log("here");
    } catch (error) {
      console.log(error);

      const errorMessage = error.message || "error on server.";

      res.status(500).json({
        success: false,
        statuscode: 500,
        error: errorMessage,
      }); // {success: false, statuscode: res.status(500)}
    }
  },

  loginUser: async (req, res) => {
    try {
      let user;
      user = await User.findOne({ email: req.body.email });
      if (!user) {
        //console.log("user not found");
        return res.status(404).json({
          success: false,
          statuscode: 404,
          data: { message: "User not found" },
        });
      }

      const decrpassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_WORD
      );
      const depassword = decrpassword.toString(CryptoJS.enc.Utf8);

      if (depassword !== req.body.password) {
        return res.status(401).json("Wrong password");
      }

      const { password, __v, createdAt, ...others } = user._doc;

      const userToken = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SEC,
        { expiresIn: "21d" }
      );

      res.status(200).json({
        ...others,
        data: { token: userToken },
        success: true,
        statuscode: 200,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, statuscode: 500, message: error.message });
    }
  },
};
