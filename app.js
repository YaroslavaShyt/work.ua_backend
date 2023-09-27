const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("../work.ua_backend/routes/auth");


dotenv.config();

const DATABASE = process.env.MONGO_URL;

mongoose
  .connect(DATABASE)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(`Error connecting database: ${err}`));

app.use(express.json());
app.use("/api/", authRoute);


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
