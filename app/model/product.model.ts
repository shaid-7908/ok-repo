import { model,Schema } from "mongoose";
import { ProductDocument } from "../interface/product.types";

const ProductSchema = new Schema<ProductDocument>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    seller:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'users'
    }
},
{timestamps:true}
)
ProductSchema.index({category:1,price:1})
const ProductModel = model<ProductDocument>('products',ProductSchema)

export {ProductModel}