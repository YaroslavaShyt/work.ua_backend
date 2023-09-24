const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const DATABASE = process.env.MONGO_URL;

mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`Error connecting database: ${err}`));

app.get("/", (req, res) => {
  res.send("A simple Node App is " + "running on this server");
  res.end();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
