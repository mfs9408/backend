require("dotenv").config();
const mongoose = require("mongoose");
import express from "express";
import cookies from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter/userRouter";
import postRouter from "./routes/postRouter";
import errorMiddleWare from "./middlewares/errorMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(cookies());
app.use(express.json());
app.use(fileUpload({}));
app.use("/api", userRouter);
app.use("/api", postRouter);
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
