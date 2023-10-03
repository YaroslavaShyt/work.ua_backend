const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.put("/:id", verifyAndAuthorization, userController.updateUserCandidate);

//router.post("/login_candidate", authController.loginUser);

module.exports = router;
