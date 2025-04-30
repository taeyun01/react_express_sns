import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors()); // 배포할때 옵션추가
app.use(morgan("dev"));

app.use("/tweets", tweetsRouter);
app.use("/auth", authRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

// 에러 핸들러
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
