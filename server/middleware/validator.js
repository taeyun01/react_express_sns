import { validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0].msg }); // 클라이언트에게 하나의 메세지만 전달하고 싶다면 이렇게 해주면 됨.
  }

  // 유효성 검사를 통과했으면 다음 미들웨어로 넘어감
  return next();
};

export default validate;
