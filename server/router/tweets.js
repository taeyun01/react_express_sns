import express from "express";
import * as tweetsRepository from "../data/tweet.js";

const router = express.Router();

// GET /tweets
// GET /tweets?username=username

//* tweets와 username이 전달 됐을 때와 안 됐을 때 처리
router.get("/", (req, res, next) => {
  const username = req.query.username; // 값이 없으면 undefined
  console.log("username: ", username);
  const data = username
    ? tweetsRepository.getAllByUsername(username)
    : tweetsRepository.getAll(); // username이 없으면 전체 트윗을 할당
  res.status(200).json(data); // 필터링한 데이터를 클라이언트에 반환
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweetsRepository.getById(id);

  if (!tweet) {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }

  res.status(200).json(tweet); // 트윗이 있다면 찾은 트윗을 클라이언트에 반환
});

// POST /tweets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body; // 클라이언트에서 보낸 데이터
  const tweet = tweetsRepository.create(text, name, username);

  if (!tweet) {
    res.status(400).json({ message: "트윗을 생성하지 못했습니다" });
  } // 생성 실패 시 400

  res.status(201).json(tweet); // 생성된 트윗을 클라이언트에 반환
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id; // 수정할 트윗의 id
  const text = req.body.text; // 수정할 트윗의 내용
  const tweet = tweetsRepository.update(id, text); // 수정할 트윗을 찾음

  if (!tweet) {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }

  res.status(200).json(tweet); // 수정된 트윗을 클라이언트에 반환
});

// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  const success = tweetsRepository.remove(id);

  if (!success) {
    res.status(404).json({
      message: `트윗 id(${id})를 찾을 수 없습니다. 다시 시도해주세요.`,
    }); // 없으면 404
  }

  res.sendStatus(204); // 삭제되었음을 알리는 204 상태 코드 반환
});

export default router;
