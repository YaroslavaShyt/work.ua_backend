const Chat = require("../models/chatModel");
const User = require("../models/userModel");
const io = require("../app");
const { sendChatNotification } = require("../sockets/chatSockets"); // Assuming both files are in the same directory
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types; // Import ObjectId from mongoose

module.exports = {
  createChat: async (req, res) => {
    const userId = req.body.user[1];
    console.log("заходить у запит");
    console.log(userId, req.user.id);
    if (!userId) {
      res.status(400).json("invalid user id");
    }

    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

    if (!isValidObjectId(req.user.id) || !isValidObjectId(userId)) {
      res.status(400).json("invalid ObjectId");
      return;
    }

    var isChat = await Chat.find({
      $and: [
        { user: { $elemMatch: { $eq: req.user.id } } },
        { user: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("user", "-password")
      .populate("latestMessage");

    //console.log(isChat);

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profile email",
    });

    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      const userIds = [
        new mongoose.Types.ObjectId(req.user.id),
        new mongoose.Types.ObjectId(userId),
      ];

      var chatData = {
        position: req.body.position,
        companyName: req.body.companyName,
        isGroupChat: true,
        user: userIds,
      };

      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "user",
          "-password"
        );
        // sendChatNotification(io, FullChat, userId);
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  },

  getChatsForUser: async (req, res) => {
    try {
      // console.log(req.user.id);
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
          // console.log(results);
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getSpecificChat: async (req, res) => {
    const chatId = req.params.id; // Припустимо, що chatId передається як частина URL
    //console.log(chatId);
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
