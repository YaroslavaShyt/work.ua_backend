const router = require("express").Router();
const messageController = require("../controllers/messageController")
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, messageController.sendMessage);

router.get("/:id", verifyAndAuthorization, messageController.getAllMessage);

module.exports = router
