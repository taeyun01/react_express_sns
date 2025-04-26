import * as tweetsRepository from "../data/tweet.js";
// controller는 서버에 있는 중요한 비즈니스 로직을 작성하는 곳
// 서버를 통신하고 관련된 데이터를 받아오고 또 데이터가 잘못되었을 때 어떻게 에러를 보여줄것인지

//* tweets와 username이 전달 됐을 때와 안 됐을 때 처리
export const getTweets = async (req, res) => {
  const username = req.query.username; // 값이 없으면 undefined
  const data = await (username
    ? tweetsRepository.getAllByUsername(username)
    : tweetsRepository.getAll()); // username이 없으면 전체 트윗을 할당
  res.status(200).json(data); // 필터링한 데이터를 클라이언트에 반환
};

export const getTweet = async (req, res) => {
  const id = req.params.id;
  const tweet = await tweetsRepository.getById(id);

  if (!tweet) {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }

  res.status(200).json(tweet); // 트윗이 있다면 찾은 트윗을 클라이언트에 반환
};

export const createTweet = async (req, res) => {
  const { text, name, username } = req.body; // 클라이언트에서 보낸 데이터
  const tweet = await tweetsRepository.create(text, name, username);

  if (!tweet) {
    res.status(400).json({ message: "트윗을 생성하지 못했습니다" });
  } // 생성 실패 시 400

  res.status(201).json(tweet); // 생성된 트윗을 클라이언트에 반환
};

export const updateTweet = async (req, res) => {
  const id = req.params.id; // 수정할 트윗의 id
  const text = req.body.text; // 수정할 트윗의 내용
  const tweet = await tweetsRepository.update(id, text); // 수정할 트윗을 찾음

  if (!tweet) {
    res.status(404).json({ message: `트윗 id(${id})를 찾을 수 없습니다` }); // 없으면 404
  }

  res.status(200).json(tweet); // 수정된 트윗을 클라이언트에 반환
};

export const deleteTweet = async (req, res) => {
  const id = req.params.id;
  const success = await tweetsRepository.remove(id);

  if (!success) {
    res.status(404).json({
      message: `트윗 id(${id})를 찾을 수 없습니다. 다시 시도해주세요.`,
    }); // 없으면 404
  }

  res.sendStatus(204); // 삭제되었음을 알리는 204 상태 코드 반환
};
