export default class TweetService {
  constructor(baseURL) {
    // this.baseURL = "http://localhost:8080";
    this.baseURL = baseURL;
  }

  // 더미데이터
  // tweets = [
  //   {
  //     id: 1,
  //     text: "더미더미 데이터 테스트",
  //     createdAt: "2021-05-09T04:20:57.000Z",
  //     name: "Bob",
  //     username: "bob",
  //     url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkxMuo6NOHcNx-aO-wOo3eyVnB2oTq-ZwA&s",
  //   },
  // ];

  async getTweets(username) {
    // username이 있으면 해당 username의 트윗만 가져오고, 없으면 모든 트윗을 가져오도록 조건 추가
    const query = username ? `?username=${username}` : "";

    // 서버에서 데이터를 가져오는 요청
    const response = await fetch(`${this.baseURL}/tweets${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // 받아온 데이터 json으로 변환
    const data = await response.json();

    // 서버에서 데이터를 가져오는 요청이 실패하면, 즉, 200이 아니라면 에러 던지기
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data;
  }

  async postTweet(text) {
    const response = await fetch(`${this.baseURL}/tweets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, name: "Taeyun", username: "taeyun" }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message);
    }
    return data;
  }

  async deleteTweet(tweetId) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // DELETE는 따로 데이터를 받아오지 않음

    // 삭제를 실패해서, 상태코드가 204가 아니라면 에러 던지기
    if (response.status !== 204) {
      throw new Error("트윗 삭제에 실패했습니다");
    }
  }

  async updateTweet(tweetId, text) {
    const response = await fetch(`${this.baseURL}/tweets/${tweetId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();

    // 수정을 실패해서, 상태코드가 200이 아니라면 에러 던지기
    if (response.status !== 200) {
      throw new Error(data.message);
    }
    return data; // 수정된 트윗을 반환하여 적용
  }
}
