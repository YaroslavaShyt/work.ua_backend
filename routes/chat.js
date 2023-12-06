const router = require("express").Router();
const chatController = require("../controllers/chatController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, chatController.accessChat);

router.get("/", verifyToken, chatController.getChat);

module.exports = router;
