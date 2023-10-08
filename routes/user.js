const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.put("/:id", verifyAndAuthorization, userController.updateUserCandidate);

router.delete(
  "/:id",
  verifyAndAuthorization,
  userController.deleteUserCandidate
);

module.exports = router;
