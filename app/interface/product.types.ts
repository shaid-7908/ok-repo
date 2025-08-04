import { Document, Types } from "mongoose";

export interface ProductDocument{
    name:String,
    description:String,
    price:Number,
    category:String,
    seller:Types.ObjectId,
    
}