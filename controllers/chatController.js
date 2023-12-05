const Chat = require("../models/Chat");
const UserCandidate = require("../models/UserCandidate");

module.exports = {
  accessChat: async (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      res.status(400).json("invalid user id");
    }
    var isChat = await Chat.fint({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user.id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await UserCandidate.populate(isChat, {
      path: "latestMessage.sender",
      select: "username profile email",
    });
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: req.user.id,
        isGroupChat: false,
        users: [req.user.id, userId],
      };
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        res.status(200).json(FullChat);
      } catch (error) {
        res.status(500).json({ error: error });
      }
    }
  },

  getChat: async (req, res) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user.id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await UserCandidate.populate(results, {
            path: "latestMessage.sender",
            select: "username profile email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  },
};
