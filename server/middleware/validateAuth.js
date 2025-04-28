import { body } from "express-validator";

export const validateCredential = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("username을 입력해주세요")
    .isLength({ min: 1 })
    .withMessage("username은 최소 1글자 이상이어야 합니다")
    .isLength({ max: 8 })
    .withMessage("username은 최대 8글자 이하여야 합니다"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password를 입력해주세요")
    .isLength({ min: 6 })
    .withMessage("password는 최소 6글자 이상이어야 합니다")
    .isLength({ max: 20 })
    .withMessage("password는 최대 20글자 이하여야 합니다"),
];

export const validateSignup = [
  ...validateCredential,
  body("name").trim().notEmpty().withMessage("name을 입력해주세요"),
  body("email").trim().notEmpty().withMessage("email을 입력해주세요"),
  body("url") // url은 옵셔널임
    .isURL() // url 형식이 맞는지 확인
    .withMessage("url을 입력해주세요")
    .optional({
      nullable: true, // null이어도 통과
      checkFalsy: true, // url이 없어도 통과 (빈 문자열이어도 통과)
    }),
];
