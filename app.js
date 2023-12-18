const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("../work.ua_backend/routes/auth");
const userRoute = require("../work.ua_backend/routes/user");
const jobRoute = require("../work.ua_backend/routes/jobs");
const cvRoute = require("../work.ua_backend/routes/cv");
const chatRoute = require("../work.ua_backend/routes/chat");
const messageRoute = require("../work.ua_backend/routes/message");
const { Server } = require("socket.io");

dotenv.config();

const DATABASE = process.env.MONGO_URL;

mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`Error connecting database: ${err}`));

app.use(express.json());
app.use("/api/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/jobs/", jobRoute);
app.use("/api/cvs/", cvRoute);
app.use("/api/chats/", chatRoute);
app.use("/api/messages/", messageRoute);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server started on port ${PORT}`));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5000",
  },
});

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("setup", (userId) => {
    socket.join(userId);
    socket.broadcast.emit("online-user", userId);
    console.log(userId);
  });

  socket.on("typing", (room) => {
    console.log("typing");
    console.log("room");
    socket.to(room).emit("typing", room);
  });

  socket.on("stop typing", (room) => {
    console.log("stop typing");
    console.log("room");
    socket.to(room).emit("stop typing", room);
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined room");
  });

  socket.on("new message", (newMessageReceived) => {
    console.log("send message event");
    var chat = newMessageReceived.chat;
    console.log(newMessageReceived.content);
    console.log("chat id" + chat);
    var room = chat;
    var sender = newMessageReceived.sender;
    if (!sender) {
      console.log("sender not defined");
      return;
    }
    const senderId = sender;

    console.log(senderId + " message sender");
    const users = chat.user;

    // if (!users) {
    // console.log("Users not defined");
    // return;
    //}
    var content = newMessageReceived.content;
    socket.to(room).emit("message received", content);
    socket.to(room).emit("message sent", "New message");
  });

  socket.off("setup", () => {
    console.log("user ofline");
    console.log(userId);
  });

  socket.on("chat_created", (data) => {
    console.log(data);
    console.log("suka blieatb");
    socket.to(data).emit("got your id beach");
  });
});

module.exports = io;
