import { ProductModel } from "../model/product.model";
import { asyncHandler } from "../utils/async.hanlder";
import STATUS_CODES from "../utils/status.codes";
import { sendError,sendSuccess } from "../utils/response.formatter";
import { Request,Response } from "express";
import { UserModel } from "../model/user.model";

class SellerController{
    addProduct = asyncHandler(async (req:Request,res:Response)=>{
         const { name, description, price, category } = req.body;
         const currentuser = req.user
         console.log(currentuser)
         const currentuserDetails = await UserModel.findOne({email:currentuser.email})
         if(!currentuserDetails) return sendError(res,'Invalid user or user not found',null,STATUS_CODES.BAD_GATEWAY)
         const prodcutToBeCreated = {
            name,description,price,category,seller:currentuserDetails._id
         }
         const createdProduct = await ProductModel.create(prodcutToBeCreated)
         return sendSuccess(res,'DOne bro',createdProduct,STATUS_CODES.CREATED)
    })

    bulkUpload = asyncHandler(async (req:Request, res:Response )=>{
       const products = req.body
       for (const product of products){
        const newProduct = await ProductModel.create({
            name:product.name,
            price:product.price,
            description:product.description,
            category:product.category,
            seller:req.user.id
        })
        console.log(newProduct)
       }
       return sendSuccess(res,'Done',null)
    })
}

const sellerController = new SellerController()
export {sellerController}