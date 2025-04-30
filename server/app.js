import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import tweetsRouter from "./router/tweets.js";
import authRouter from "./router/auth.js";
import { config } from "./config.js";
import { Server } from "socket.io";

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

const server = app.listen(config.host.port, () => {
  console.log(`Server is running on port ${config.host.port}`);
});
const socketIO = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

socketIO.on("connection", (socket) => {
  console.log("새로운 클라이언트 접속이 확인되었습니다. ID: ", socket.id);
  socketIO.emit("twitter", "Welcome to Socket.io");
  socketIO.emit("twitter", "Welcome to Socket.io");
});

setInterval(() => {
  socketIO.emit("twitter", "안녕 클라이언트?");
}, 1000);
