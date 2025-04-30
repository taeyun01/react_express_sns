import jwt from "jsonwebtoken";
import * as userRepository from "../data/auth.js";
import { config } from "../config.js";
const AUTH_ERROR = { message: "Authentication Error" };

//* 인증 미들웨어
export const isAuth = async (req, res, next) => {
  const authHeader = req.get("Authorization"); // 모든 요청에 대해 헤더에 Authorization가 있는지 확인

  // 헤더가 없으면 401 에러 반환
  if (!(authHeader && authHeader.startsWith("Bearer "))) {
    return res.status(401).json(AUTH_ERROR);
  }

  // Bearer 다음에 있는 토큰이 있는지 확인 후 할당
  const token = authHeader.split(" ")[1];

  // jwt 토큰이 유효한지 검증
  jwt.verify(token, config.jwt.secretKey, async (err, decoded) => {
    if (err) {
      return res.status(401).json(AUTH_ERROR);
    }

    // jwt토큰이 유효하면 사용자 조회 (jwt토큰이 검증이 됐다고 하더라도 사용자가 db에 존재하지 않을 수 있음) 한번 더 검증
    const user = await userRepository.findById(decoded.id);

    // 사용자가 존재하지 않으면 401 에러 반환
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }

    // 사용자가 존재하면 사용자 정보를 요청에 추가
    req.userId = user.id; // request 객체에 사용자 정보 추가 ex) req.customData (계속 동일하게 접근해야하는 데이터라면 이렇게 등록해주어 사용할 수 있음)
    next();
  });
};
