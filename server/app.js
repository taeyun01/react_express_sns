import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { initSocket } from "./connection/socket.js";
import { db } from "./db/database.js";

const app = express();

const corsOptions = {
  origin: config.cors.allowedOrigins,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(helmet());
app.use(cors(corsOptions)); // 배포할때 옵션추가
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

db.getConnection().then(() => console.log("MySQL DB 연결 성공!"));

const server = app.listen(config.port, () => {
  console.log(`Server is running... ${new Date().toLocaleString()}`);
});

initSocket(server);
