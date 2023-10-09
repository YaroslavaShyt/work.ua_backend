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

router.get("/:id", verifyAndAuthorization, userController.getUserCandidate);

router.get(
  "/allUsers",
  verifyAndAuthorization,
  userController.getAllUsersCandidate
);

module.exports = router;
