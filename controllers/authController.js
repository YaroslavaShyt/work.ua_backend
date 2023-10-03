const UserCandidate = require("../models/userCadidateModel");
const UserCompany = require("../models/userCompanyModel");
const CryptoJS = require("crypto-js");

module.exports = {
  createUser: async (req, res) => {
    req.body.usertype == "candidate"
      ? (newUser = new UserCandidate({
          name: req.body.name,
          surname: req.body.surname,
          patronymic: req.body.patronymic,
          birthDate: req.body.birthDate,
          city: req.body.city,
          contactNumber: req.body.contactNumber,
          email: req.body.email,
          socialMediaLinks: req.body.socialMediaLinks,
          password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.SECRET_WORD
          ).toString(),
          isAdmin: req.body.isAdmin,
          profilePhoto: req.body.profilePhoto,
        }))
      : (newUser = new UserCompany({
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
      const savedUser = await newUser.save();
      res.status(201).json(savedUser); // {success: true, statuscode: res.status(201)}
    } catch (error) {
      res.status(500).json(error); // {success: false, statuscode: res.status(500)}
    }
  },

  loginUser: async (req, res) => {
    try {
      let user;
      if (req.body.usertype == "candidate") {
        user = await UserCandidate.findOne({ email: req.body.email });
      } else {
        user = await UserCompany.findOne({ email: req.body.email });
      }

      if (!user) {
        return res.status(401).json("User not found");
      }

      const password = CryptoJS.AES.decrypt(
        user.password,
        process.env.SECRET_WORD
      );
      const depassword = password.toString(CryptoJS.enc.Utf8);

      if (depassword !== req.body.password) {
        console.log(
          `body: ${req.body.password}, depass: ${depassword}, password: ${password}`
        );
        return res.status(401).json("Wrong password");
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
