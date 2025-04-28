//* 123456: $2b$12$rP7OYGfDwqN81XHQW3thq.EtbEGO6GYCxFSh8FR7CwiPrv4sfs.2a
let users = [
  {
    id: "1",
    username: "taeyun",
    password: "$2b$12$rP7OYGfDwqN81XHQW3thq.EtbEGO6GYCxFSh8FR7CwiPrv4sfs.2a",
    name: "태윤",
    email: "taeyun@gmail.com",
    url: "https://item.kakaocdn.net/do/c620e34ce78db64b44ff1e422a35e2787154249a3890514a43687a85e6b6cc82",
  },
];

export const findByUsername = async (username) => {
  return users.find((user) => user.username === username);
};

export const createUser = async (user) => {
  const newUser = {
    id: Date.now().toString(),
    ...user,
  };
  users.push(newUser);
  return newUser.id;
};

//* 사용자 조회 (주어진 id에 해당하는 사용자 조회 있다면 해당 사용자 반환, 없다면 null 반환)
export const findById = async (id) => {
  return users.find((user) => user.id === id);
};
