export default class AuthService {
  constructor(http, tokenStorage) {
    this.http = http;
    this.tokenStorage = tokenStorage;
  }

  async signup(username, password, name, email, url) {
    const data = await this.http.fetch("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ username, password, name, email, url }),
    });
    this.tokenStorage.saveToken(data.token); // 회원가입 성공 시 토큰 저장
    return data;
  }

  // 로그인
  async login(username, password) {
    const data = await this.http.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    this.tokenStorage.saveToken(data.token); // 로그인 성공 시 토큰 저장
    return data;
  }

  //
  async me() {
    const token = this.tokenStorage.getToken(); // 토큰 가져오기
    if (!token) {
      return null;
    }

    // 토큰 확인 후 토큰이 있으면 헤더에 토큰을 포함하여 서버에 보내주어 요청
    const data = await this.http.fetch("/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  }

  // 로그아웃
  async logout() {
    this.tokenStorage.clearToken(); // 토큰 삭제
    return;
  }
}
