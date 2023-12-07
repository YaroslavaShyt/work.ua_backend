const router = require("express").Router();
const userController = require("../controllers/userController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.put("/:id", verifyAndAuthorization, userController.updateUser);

router.delete("/:id", verifyAndAuthorization, userController.deleteUser);

router.get("/:id", verifyAndAuthorization, userController.getUser);

router.get("/allUsers/:id", verifyAndAuthorization, userController.getAllUsers);

module.exports = router;
