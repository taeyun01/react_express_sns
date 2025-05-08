import socket from "socket.io-client";

export default class Socket {
  constructor(baseURL, getAccessToken) {
    //* 소켓 사용시 토큰을 쿼리로 넘기면 안됨
    //* 쿼리를 통해서 보내면 서버에서는 const token = socket.handshake.query && socket.handshake.query.token 이렇게 받아오는데 이렇게 되면 브라우저상에서 토큰이 노출되고 로그에도 남을 수 있다.
    //* 따라서 소켓 이용해 토큰을 주고 받을 때는 auth 옵션을 이용해 토큰을 전달 후 서버에서는 socket.handshake.auth.token 으로 받아온다.
    // const io = socket(this.baseURL, {
    //   query: { token: this.getAccessToken() }
    // })
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
