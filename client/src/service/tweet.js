export default class TweetService {
  constructor(http, tokenStorage, socket) {
    this.http = http;
    this.tokenStorage = tokenStorage;
    this.socket = socket; // new Socket 생성자를 받아옴
  }

  async getTweets(username) {
    // username이 있으면 해당 username의 트윗만 가져오고, 없으면 모든 트윗을 가져오도록 조건 추가
    const query = username ? `?username=${username}` : "";

    // 서버에서 데이터를 가져오는 요청
    return this.http.fetch(`/tweets${query}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
  }

  async postTweet(text) {
    //* 프로미스 형태로 데이터를 반환되는데 fetch안에서 성공한 코드를 아닌 경우에는 에러를 던지니까 에러를 리젝하는 프로미스가 됨
    return this.http.fetch(`/tweets`, {
      method: "POST",
      body: JSON.stringify({ text }), // 트윗 내용만 보내고 나머지는 서버에서 처리
      headers: this.getHeaders(),
    });
  }

  async deleteTweet(tweetId) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    // DELETE는 따로 데이터를 받아오지 않음
  }

  async updateTweet(tweetId, text) {
    return this.http.fetch(`/tweets/${tweetId}`, {
      method: "PUT",
      body: JSON.stringify({ text }),
      headers: this.getHeaders(),
    });
  }

  getHeaders() {
    const token = this.tokenStorage.getToken();
    return {
      Authorization: `Bearer ${token}`,
    };
  }

  // 새로운 트윗이 생겼을 때 어떤 일을 하고 싶은지를 콜백으로 전달
  onSync(callback) {
    return this.socket.onSync("tweets", callback);
  }
}
