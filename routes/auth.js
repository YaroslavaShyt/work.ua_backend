const router = require("express").Router();
const authController = require("../controllers/authController");

// Candidate Registration

router.post("/register", authController.createUser);


module.exports = router;