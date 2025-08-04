import mongoose  from "mongoose";
import { envConfig } from "./env.config";
import { UserModel } from "../model/user.model";

export const connectDb = async ():Promise<void>=>{
  try {
    await mongoose.connect(envConfig.MONGODB_URL,{
        dbName:envConfig.MONGODB_DB_NAME,
        serverSelectionTimeoutMS:5000
    })

    await UserModel.init()
    
    console.log("Mongodb connected")
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}