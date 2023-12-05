const router = require("express").Router();
const chatController = require("../controllers/chatController")
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyAndAuthorization, chatController.accessChat);

router.get("/", verifyAndAuthorization, chatController.getChat);

module.exports = router;
