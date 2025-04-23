import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors()); // 배포할때 옵션추가
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("서버 프로젝트 셋팅 완료");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
