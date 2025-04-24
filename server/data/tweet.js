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

//* 나중에 DB에서 데이터를 가져올것이므로 비동기로 처리)

// 모든 트윗 조회
export const getAll = async () => tweets;

// 특정한 username을 가진 트윗 조회
export const getAllByUsername = async (username) =>
  tweets.filter((tweet) => tweet.username === username);

// 특정한 id를 가진 트윗 조회
export const getById = async (id) => tweets.find((tweet) => tweet.id === id);

// 트윗 생성
export const create = async (text, name, username) => {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date().toISOString(),
    name,
    username,
  };

  tweets = [tweet, ...tweets]; // 최신순으로 정렬

  return tweet;
};

// 트윗 수정
export const update = async (id, text) => {
  const tweet = tweets.find((tweet) => tweet.id === id);

  if (tweet) {
    tweet.text = text;
  }

  return tweet;
};

// 트윗 삭제 (js에서 delete키워드를 사용하므로 함수명으로 사용못함)
export const remove = async (id) => {
  tweets = tweets.filter((tweet) => tweet.id !== id); // 삭제할 트윗의 id와 일치하지 않는 트윗만 남김
  if (tweets.length === 0) {
    return false;
  }

  return true;
};
