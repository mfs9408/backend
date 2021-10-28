export {};
require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cookies = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/userRouter/userRouter");
const errorMiddleWare = require("./middlewares/errorMiddleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", router);
app.use(errorMiddleWare);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`works on ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
