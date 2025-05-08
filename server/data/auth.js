//* 123456: $2b$12$rP7OYGfDwqN81XHQW3thq.EtbEGO6GYCxFSh8FR7CwiPrv4sfs.2a
// let users = [
//   {
//     id: "1",
//     username: "taeyun",
//     password: "$2b$12$rP7OYGfDwqN81XHQW3thq.EtbEGO6GYCxFSh8FR7CwiPrv4sfs.2a",
//     name: "태윤",
//     email: "taeyun@gmail.com",
//     url: "https://item.kakaocdn.net/do/c620e34ce78db64b44ff1e422a35e2787154249a3890514a43687a85e6b6cc82",
//   },
//   {
//     id: "2",
//     username: "hahaha",
//     password: "$2b$12$rP7OYGfDwqN81XHQW3thq.EtbEGO6GYCxFSh8FR7CwiPrv4sfs.2a",
//     name: "하하하",
//     email: "hahaha@gmail.com",
//   },
// ];

import { db } from "../db/database.js";

//* 사용자 조회 (주어진 username에 해당하는 사용자 조회 있다면 해당 사용자 반환)
export const findByUsername = async (username) => {
  return db
    .execute("SELECT * FROM users WHERE username = ?", [username])
    .then((result) => {
      // console.log(result[0][0]); // 조회된 사용자 정보 (이중배열로 되어있음)
      return result[0][0];
    });
};

//* 사용자 id 조회 (주어진 id에 해당하는 사용자 조회 있다면 해당 사용자 반환)
export const findById = async (id) => {
  return db.execute("SELECT * FROM users WHERE id = ?", [id]).then((result) => {
    // console.log("findById", result[0][0]);
    return result[0][0];
  });
};

//* 사용자 생성 (사용자 정보를 받아서 데이터베이스에 저장)
export const createUser = async (user) => {
  const { username, password, name, email, url } = user;
  return db
    .execute(
      "INSERT INTO users (username, password, name, email, url) VALUES (?, ?, ?, ?, ?)",
      [username, password, name, email, url]
    )
    .then((result) => {
      // console.log(result);
      return result[0].insertId;
    });
};
