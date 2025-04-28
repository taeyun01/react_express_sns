import express from "express";
import { validateTweet } from "../middleware/validation.js";
import * as tweetsController from "../controller/tweet.js";
import validate from "../middleware/validator.js";
import { isAuth } from "../middleware/auth.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=username

//! 주의: getTweets() 함수호출을 하면안됨 값이 연결되는게 아닌 함수를 연결 시켜줘야함
//* isAuth미들웨어는 인증이 된 사람만 접근 가능
router.get("/", isAuth, tweetsController.getTweets);

// GET /tweets/:id
router.get("/:id", isAuth, tweetsController.getTweet);

// POST /tweets
router.post("/", isAuth, validateTweet, validate, tweetsController.createTweet);

// PUT /tweets/:id
router.put(
  "/:id",
  isAuth,
  validateTweet,
  validate,
  tweetsController.updateTweet
);

// DELETE /tweets/:id
router.delete("/:id", isAuth, tweetsController.deleteTweet);

export default router;
