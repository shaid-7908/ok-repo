import express from "express";
import { connectDb } from "./app/config/db.connection";
import { envConfig } from "./app/config/env.config";
import cookieParser from "cookie-parser";
import { errorHandler } from "./app/middleware/error.handler";
import authRouter from "./app/routes/auth.routes";
import morgan from 'morgan'
import adminRouter from "./app/routes/admin.routes";
import sellerRouter from "./app/routes/seller.routes";
import publicRouter from "./app/routes/product.routes";
import path from "path";
import multerRouter from "./app/routes/multer.routes";
import rateLimit from "express-rate-limit";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'upload')))

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5, // 5 attempts per 10 minutes
  message: "Too many login attempts, please try again later.",
});
app.use('/auth',authRouter)
app.use('/admin',adminRouter)
app.use('/seller',sellerRouter)
app.use('/api',publicRouter)
app.use(multerRouter)

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDb();
    app.listen(envConfig.PORT, () => {
      console.log(`Server running of http://localhost:${envConfig.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
