import { Request,Response,NextFunction } from "express";
import { sendError } from "../utils/response.formatter";

export const errorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
    console.log(err)
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
    return sendError(res,message,err,statusCode)

}