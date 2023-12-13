const router = require("express").Router();
const messageController = require("../controllers/messageController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, messageController.sendMessage);

router.get("/", verifyToken, messageController.getAllMessage);

module.exports = router;
