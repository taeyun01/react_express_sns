import * as userRepository from "../data/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { config } from "../config.js";
//* 회원가입
export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username); // 이미 존재하는 사용자인지 확인

  if (found) {
    return res
      .status(409)
      .json({ message: `${username} 이미 존재하는 사용자입니다.` });
  }

  const hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds); // 비밀번호 암호화

  // 새로운 사용자 생성
  const userId = await userRepository.createUser({
    username,
    password: hashedPassword,
    name,
    email,
    url,
  });

  const token = createJwtToken(userId); // 토큰 생성
  res.status(201).json({ token, username }); // 회원가입 성공 후 토큰 발급
};

//* 로그인
export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await userRepository.findByUsername(username); // 사용자 조회
  // 메세지를 상세하게 보내지 않는 이유는 보안 때문에
  // 아이디가 일치하지 않으면
  if (!user) {
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
  }

  const isValidPassword = await bcrypt.compare(password, user.password); // 비밀번호 검증 (db에 저장된 해쉬 패스워드와 사용자가 입력한 패스워드가 동일한지 검증)
  // 비밀번호가 일치하지 않다면
  if (!isValidPassword) {
    return res
      .status(401)
      .json({ message: "아이디 또는 비밀번호가 일치하지 않습니다." });
  }

  const token = createJwtToken(user.id); // 토큰 생성
  res.status(200).json({ token, username }); // 로그인 성공 후 토큰 발급
};

//* 토큰 생성 함수
const createJwtToken = (userId) => {
  return jwt.sign({ id: userId }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
};

//* 사용자 정보 조회
export const me = async (req, res) => {
  //* 1. 한번더 db에 사용자 여부 조회 (이 단계까지는 안올거임 이미 미들웨어에서 한번 검증했음)
  const user = await userRepository.findById(req.userId);
  if (!user) {
    return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
  }

  //* 2. 그래도 db에서 읽어오는 이유는 로그인된 사용자라면 토큰에는 userId만 넣어서 만드므로, 해당 사용자에 대한 정보를 읽어오기 위해서 이렇게 따로 토큰과 함께 유저 데이터를 보내줌
  res.status(200).json({
    token: req.token,
    username: user.username,
  });
};
