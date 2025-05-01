import socket from "socket.io-client";

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }), // 소켓을 만들때 getAccessToken() 콜백함수를 이용해 토큰을 전달, 토큰을 전달할 때는 다양한 방법이 있지만 소켓에 있는 auth 옵션을 이용해 토큰을 전달
    });

    this.io.on("connect_error", (error) => {
      console.log("소켓 에러 연결 실패", error.message);
    });
  }

  // 소켓 연결 시 이벤트 리스너 추가 (event: 무엇을 듣고 싶은지, callback: 이벤트가 발생했을 때 실행할 함수)
  onSync(event, callback) {
    // 소켓(io)이 연결되지 않았다면 연결
    if (!this.io.connected) {
      this.io.connect();
    }

    // 이벤트가 발생하면 전달받은 메시지를 콜백함수에 전달
    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event); // 이벤트 리스너 제거 (io에 대해서 더 이상 듣지 않도록 끔)
  }
}
