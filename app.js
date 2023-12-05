const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("../work.ua_backend/routes/auth");
const userRoute = require("../work.ua_backend/routes/user");
const jobRoute = require("../work.ua_backend/routes/jobs");
const cvRoute = require("../work.ua_backend/routes/cv");
const chatRoute = require("../work.ua_backend/routes/chat");
const messageRoute = require("../work.ua_backend/routes/message")

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
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);




const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
