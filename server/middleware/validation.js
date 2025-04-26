import { body } from "express-validator";

const validateTweet = [
  body("text")
    .trim()
    .isLength({ min: 1 })
    .withMessage("텍스트는 최소 1글자 이상이어야 합니다")
    .isLength({ max: 700 })
    .withMessage("텍스트는 최대 700글자 이하여야 합니다"),
];

export { validateTweet };
