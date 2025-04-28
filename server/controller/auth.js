import * as userRepository from "../data/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// TODO: 일단 임시로 써놓고 나중에 보안 처리
const jwtSecretKey = "%3GH)Yu/43>p]4xm5CQ{&;yp%.R+}7LL";
const jwtExpiresInDays = "2d";
const bcryptSaltRounds = 12;

//* 회원가입
export const signup = async (req, res) => {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username); // 이미 존재하는 사용자인지 확인

  if (found) {
    return res
      .status(409)
      .json({ message: `${username} 이미 존재하는 사용자입니다.` });
  }

  const hashedPassword = await bcrypt.hash(password, bcryptSaltRounds); // 비밀번호 암호화

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
  return jwt.sign({ id: userId }, jwtSecretKey, {
    expiresIn: jwtExpiresInDays,
  });
};
