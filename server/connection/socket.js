import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import { config } from "../config.js";

class Socket {
  constructor(server) {
    // 소켓 서버 생성
    this.io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    // 소켓 연결 시 토큰 검증
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token; // 토큰 추출

      // 토큰이 없으면 메시지를 보낼 수 없음
      if (!token) {
        return next(new Error("Authentication error"));
      }

      // 또 jwt로 해독을 했을때 검증된 토큰이 아니라면
      jwt.verify(token, config.jwt.secret, (err, decoded) => {
        // 검증에 실패했다면 에러 발생 (더 이상 소켓이 처리되지 않도록 만듬)
        if (err) {
          return next(new Error("Authentication error"));
        }
        // socket.userId = decoded.id;
        next();
      });
    });

    // 위 검증이 정상적으로 끝나면 소켓 연결이 됨
    this.io.on("connection", (socket) => {
      console.log("새로운 클라이언트 접속이 확인되었습니다. ID: ", socket.id);
    });
  }
}

let socket;

//* class Socket에 해당하는 인스턴스를 한번만 생성
export const initSocket = (server) => {
  // 소켓이 만들어있지 안다면
  if (!socket) {
    socket = new Socket(server); // 소켓 서버 생성
  }
  return socket; // 이미 만들어져있으면 그대로 반환
};

export const getSocketIO = () => {
  if (!socket) {
    throw new Error("소켓이 초기화되지 않았습니다.");
  }
  return socket.io;
};
