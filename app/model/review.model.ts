import { model, Schema } from "mongoose";
import { ReviewDocument } from "../interface/review.types";

const ReviewSchema = new Schema<ReviewDocument>({
    comment:{
        type:String,
        required:true
    },
    product:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'products'
    },
    customer:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    rating:{
        type:Number,
        required:true,
        min:[1,'Rating must be 1 or more'],
        max:[5,'Rating cannot exceed 5'],
        validate:{
            validator:Number.isInteger,
            message:'Rating must be a whole number'
        }
    }
},{timestamps:true,versionKey:false}
)

ReviewSchema.index({product:1})

const ReviewModel = model<ReviewDocument>('reviews',ReviewSchema)
export {ReviewModel}