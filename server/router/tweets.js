import express from "express";

const router = express.Router();

// 우선 더미데이터로 데이터 조회 (서버에서 let을 선언하는건 좋지 않음, 임시로 쓰는거니 일단 넘어감)
let tweets = [
  {
    id: "1",
    text: "취준생 화이팅!!",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
  },
  {
    id: "2",
    text: "안녕하세요",
    createdAt: Date.now().toString(),
    name: "Taeyun",
    username: "taeyun",
  },
  {
    id: "3",
    text: "오늘 날씨가 정말 좋아요",
    createdAt: Date.now().toString(),
    name: "Bob",
    username: "bob",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
  },
];

// GET /tweets
// GET /tweets?username=username

//* tweets와 username이 전달 됐을 때와 안 됐을 때 처리
router.get("/", (req, res, next) => {
  const username = req.query.username; // 값이 없으면 undefined
  console.log("username: ", username);
  const data = username
    ? tweets.filter((tweet) => tweet.username === username) // 검색한 username과 일치하는 트윗만 필터링
    : tweets; // username이 없으면 전체 트윗을 할당
  console.log(data[0].username);
  // console.log(data[1].username);
  res.status(200).json(data); // 필터링한 데이터를 클라이언트에 반환
});

// GET /tweets/:id
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet); // 트윗이 있다면 찾은 트윗을 클라이언트에 반환
  } else {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }
});

// POST /tweets
router.post("/", (req, res, next) => {
  const { text, name, username } = req.body; // 클라이언트에서 보낸 데이터
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
    name,
    username,
  };
  tweets = [tweet, ...tweets]; // 최신순으로 정렬
  res.status(201).json(tweet); // 생성된 트윗을 클라이언트에 반환
});

// PUT /tweets/:id
router.put("/:id", (req, res, next) => {
  const id = req.params.id; // 수정할 트윗의 id
  const text = req.body.text; // 수정할 트윗의 내용
  const tweet = tweets.find((tweet) => tweet.id === id); // 수정할 트윗을 찾음
  if (tweet) {
    tweet.text = text; // 트윗이 있다면 수정할 트윗의 내용을 수정
    res.status(200).json(tweet); // 수정된 트윗을 클라이언트에 반환
  } else {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }
});
// DELETE /tweets/:id
router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id); // 삭제할 트윗의 id와 일치하지 않는 트윗만 남김
  res.sendStatus(204); // 삭제되었음을 알리는 204 상태 코드 반환
});

export default router;
