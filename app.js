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
    origin: "http:localhost:5000",
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
    var chat = newMessageReceived.chat;
    var room = chat._id;
    var sender = newMessageReceived.sender;
    if (!sender || !senderId._id) {
      console.log("sender not defined");
      return;
    }
    var senderId = sender._id;

    console.log(senderId + "message sender");
    const users = chat.users;

    if (!users) {
      console.log("Users not defined");
      return;
    }

    socket.to(room).emit("message received", newMessageReceived);
    socket.to(room).emit("message sent", "New message");
  });

  socket.off("setup", () => {
    console.log("user ofline");
    console.log(userId);
  });
});
