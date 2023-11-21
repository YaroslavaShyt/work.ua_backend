const router = require("express").Router();
const authController = require("../controllers/authController");

// Candidate Registration

router.post("/register", authController.createUser);

router.post("/login", authController.loginUser);

module.exports = router;
