import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
  MONGODB_URL: process.env.MONGODB_URL as string,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME as string,
  PORT: process.env.PORT as string,
  JWT__ACCESSTOKEN_SECRET: process.env.JWT__ACCESSTOKEN_SECRET as string,
  JWT__REFRESHTOKEN_SECRET: process.env.JWT__REFRESHTOKEN_SECRET as string
};
