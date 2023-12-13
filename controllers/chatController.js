const Chat = require("../models/chatModel");
const User = require("../models/userModel");

module.exports = {
  createChat: async (req, res) => {
    const userId = req.body.user;
    console.log(userId);
    if (!userId) {
      res.status(400).json("invalid user id");
    }
    var isChat = await Chat.find({
      isGroupChat: req.body.isGroupChat,
      $and: [
        { user: { $elemMatch: { $eq: req.user.id } } },
        { user: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("user", "-password")
      .populate("latestMessage");

    console.log(isChat);

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profile email",
    });
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        position: req.body.position,
        companyName: req.body.companyName,
        isGroupChat: true,
        user: [req.user.id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "user",
          "-password"
        );

        res.status(200).json(FullChat);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  },

  getChatsForUser: async (req, res) => {
    try {
      Chat.find({ user: req.user.id })
        .populate("user", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "username profile email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },

  getSpecificChat: async (req, res) => {
    const chatId = req.params.id; // Припустимо, що chatId передається як частина URL
    console.log(chatId);
    try {
      let specificChat;
      specificChat = await Chat.findById(chatId)
        .populate("user", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .exec();

      if (!specificChat) {
        // Якщо чат не знайдено за заданим ідентифікатором
        return res.status(404).json({ message: "Chat not found" });
      }

      // Популюю інші додаткові дані за необхідності
      specificChat = await User.populate(specificChat, {
        path: "latestMessage.sender",
        select: "username profile email",
      });

      res.status(200).json(specificChat);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
