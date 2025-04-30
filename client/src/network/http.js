export default class HttpClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  // 서버에서 데이터를 가져오는 요청
  async fetch(url, options) {
    const res = await fetch(`${this.baseURL}${url}`, {
      ...options, // 옵션 확장
      headers: {
        "Content-Type": "application/json",
        ...options.headers, // 원하는 헤더 확장
      },
    });

    let data;

    try {
      // 상태 코드가 204인 경우 JSON 파싱을 건너뜀 (삭제시 데이터가 없기 때문에 콘솔에 SyntaxError에러 발생)
      if (res.status !== 204) {
        data = await res.json();
      }
    } catch (error) {
      console.error(error);
    }

    if (!res.ok) {
      const errorMessage =
        data && data.message
          ? data.message
          : "알 수 없는 에러가 발생했습니다. 다시 시도해주세요.";
      const error = new Error(errorMessage);
      throw error;
    }

    // 서버에서 오류가 발생했을 때 오류 메시지를 반환
    // if (res.status > 299 || res.status < 200) {
    //   // data가 있고, 서버에서 body에 에러메세지에 대한 정보가 있다면 그 정보를 사용하고, 없다면 상태코드에 대한 정보를 사용
    //   const message =
    //     data && data.message
    //       ? data.message
    //       : "알 수 없는 에러가 발생했습니다. 다시 시도해주세요.";
    //   throw new Error(message);
    // }

    return data;
  }
}
