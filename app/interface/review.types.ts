import { Document ,Types} from "mongoose";
export interface ReviewDocument extends Document {
comment:String,
product:Types.ObjectId,
customer:Types.ObjectId,
rating:Number
}