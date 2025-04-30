const TOKEN = "token";

//* 우선 임시로 브라우저 로컬스토리지에 저장. (브라우저 로컬스토리지에 저장하는 것은 보안에 취약함)
export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.clear(TOKEN);
  }
}
