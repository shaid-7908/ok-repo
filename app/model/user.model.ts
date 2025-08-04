import { model, Schema } from "mongoose";
import { UserDocument } from "../interface/user.types";

const UserSchema = new Schema<UserDocument>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["admin","seller","customer"],
        default:"customer"
    },
    refreshToken:{
        type:String
    }
},
{timestamps:true}
)

const UserModel = model<UserDocument>('users',UserSchema)

export {UserModel}