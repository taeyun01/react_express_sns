import { db } from "../db/database.js";

const SELECT_JOIN =
  "SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId = us.id";
const ORDER_DESC = "ORDER BY tw.createdAt DESC";

//* DB에서 데이터를 가져올것이므로 비동기로 처리
// 모든 트윗 조회
export const getAll = async () => {
  return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result) => {
    console.log("result: ", result[0]); // 게시글 전부 반환 해야하므로 0번째 인덱스만 반환
    return result[0];
  });
};

// 특정한 username을 가진 트윗 조회
export const getAllByUsername = async (username) => {
  return db
    .execute(`${SELECT_JOIN} WHERE us.username=? ${ORDER_DESC}`, [username])
    .then((result) => {
      return result[0];
    });
};

// 특정한 id를 가진 트윗 조회
export const getById = async (id) => {
  return db
    .execute(`${SELECT_JOIN} WHERE tw.id=? ${ORDER_DESC}`, [id])
    .then((result) => {
      return result[0][0];
    });
};

// 트윗 생성
export const create = async (text, userId) => {
  return db
    .execute(`INSERT INTO tweets (text, createdAt, userId) VALUES (?, ?, ?)`, [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
};

// 트윗 수정
export const update = async (id, text) => {
  return (
    db
      // tweets있는걸 업데이트 할거고 어떤걸 업데이트 할것인가? SET을 하고 text를 우리가 변경하고자 하는걸로 변경. 조건은 id가 일치하는 것을 업데이트.
      .execute("UPDATE tweets SET text=? WHERE id=?", [text, id]) // text와 id 순서로 전달 (순서 중요)
      .then(() => getById(id))
  );
};

// 트윗 삭제 (js에서 delete키워드를 사용하므로 함수명으로 사용못함)
export const remove = async (id) => {
  return db.execute("DELETE FROM tweets WHERE id=?", [id]);
};
