const router = require("express").Router();
const chatController = require("../controllers/chatController");
const {
  verifyToken,
  verifyAndAuthorization,
} = require("../middleware/verifyToken");

router.post("/", verifyToken, chatController.createChat);

router.get("/", verifyToken, chatController.getChatsForUser);

router.get("/:id", verifyToken, chatController.getSpecificChat);

//router.get("/:id", verifyToken, chatController.getChatById);

module.exports = router;
