import { Document } from "mongoose"
export interface UserDocument extends Document{
    name:String,
    email:String,
    password:String,
    role:String,
    refreshToken:String
}