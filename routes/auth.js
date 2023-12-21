const router = require("express").Router();
const authController = require("../controllers/authController");

// запит реєстрації користувачів
router.post("/register", authController.createUser);
// запит логіну користувачів
router.post("/login", authController.loginUser);

module.exports = router;
