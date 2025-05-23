import dotenv from "dotenv";

dotenv.config();

const required = (key, defaultValue = undefined) => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Key ${key} is not defined in environment variables`);
  }
  return value;
};

export const config = {
  jwt: {
    secretKey: required("JWT_SECRET"),
    expiresInSec: parseInt(required("JWT_EXPIRES_SEC", 86400)), // 숫자를 전달해줘야 하는 곳은 parseInt로 변환
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 12)),
  },
  port: parseInt(required("PORT", 8080)),
  db: {
    host: required("DB_HOST"),
    user: required("DB_USER"),
    database: required("DB_DATABASE"),
    password: required("DB_PASSWORD"),
  },
  cors: {
    allowedOrigins: required("CORS_ALLOWED_ORIGINS"),
  },
};
