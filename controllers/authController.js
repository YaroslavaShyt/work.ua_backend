const User = require("../models/userCadidateModel");

module.exports = {
  createUser: async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      patronymic: req.body.patronymic,
      birthDate: req.body.birthDate,
      city: req.body.city,
      contactNumber: req.body.contactNumber,
      email: req.body.email,
      socialMediaLinks: req.body.socialMediaLinks,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
      profilePhoto: req.body.profilePhoto,
    });
    try {
      const savedUser = await newUser.save();
      res.status(201).json(savedUser); // {success: true, statuscode: res.status(201)}
    } catch (error) {
      res.status(500).json(error); // {success: false, statuscode: res.status(500)}
    }
  },
};
