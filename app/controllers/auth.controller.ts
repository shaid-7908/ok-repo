import { UserModel } from "../model/user.model";
import { asyncHandler } from "../utils/async.hanlder";
import { Request,Response } from "express";
import { loginInputSchema, registerInputSchema } from "../validation/auth.validation";
import { sendError, sendSuccess } from "../utils/response.formatter";
import STATUS_CODES from "../utils/status.codes";
import { hashPassword, verifyPassword } from "../utils/password.hasher";
import { UserDocument } from "../interface/user.types";
import { JwtPayload } from "../interface/auth.types";
import { generateAccessToken, generateRefeshToken, verifyRefreshToken } from "../utils/token.handler";

class AuthController{

    register = asyncHandler(async (req:Request,res:Response)=>{
         const {error,value} = await registerInputSchema.validate(req.body)

         if(error){
           return sendError(res,'Validation Error',error)
         }
         const checkEmail = await UserModel.findOne({email:value.email})
         if(checkEmail){
            return sendError(res,"Email already exists",null,STATUS_CODES.CONFLICT)
         }
         const hasedPassword = await hashPassword(value.password)
         const userToBeCreated= {
            name:value.name,
            email:value.email,
            password:hasedPassword
         }
        const newUser = await UserModel.create(userToBeCreated)
        return sendSuccess(res,"User created successfully",{_id:newUser._id,name:newUser.name,email:newUser.email},STATUS_CODES.CREATED)
         
    })
    bulkregister = asyncHandler(async (req,res)=>{
        const users = req.body
        for (const user of users){
            const hasedPassword = await hashPassword(user.password)
          const userC=  await UserModel.create({name:user.name,email:user.email,role:user.role,password:hasedPassword})
          console.log(userC)
        }
        return sendSuccess(res,'done',null,STATUS_CODES.CREATED)
    })

    login = asyncHandler(async (req:Request,res:Response)=>{
        const {error,value} = loginInputSchema.validate(req.body)
        if(error){
            return sendError(res,'Validation failed',error,STATUS_CODES.BAD_REQUEST)
        }
        const getUserToBeLoggedIn = await UserModel.findOne({email:value.email})
        if(!getUserToBeLoggedIn) return sendError(res,"Email is not registered",null,STATUS_CODES.NOT_FOUND);
        const isPasswordValid = await verifyPassword(getUserToBeLoggedIn.password as string,value.password)
        
        if(!isPasswordValid) return sendError(res,"Invalid credentials",null,STATUS_CODES.BAD_REQUEST)
        
        const tokenPayload:JwtPayload ={
            id:getUserToBeLoggedIn._id as string,
            name:getUserToBeLoggedIn.name as string,
            email: getUserToBeLoggedIn.email as string,
            role:getUserToBeLoggedIn.role as string

        }
        const accessToken = await generateAccessToken(tokenPayload)
        const refreshToken = await generateRefeshToken(tokenPayload)

        const responsePlayload ={
            name:getUserToBeLoggedIn.name,
            email:getUserToBeLoggedIn.email,
            accessToken:accessToken
        }

        res.cookie('refreshToken',refreshToken,{httpOnly:true,secure:false,maxAge:60*60*24*7})
        return sendSuccess(res,'User loggin successfull',responsePlayload,STATUS_CODES.ACCEPTED)
        
    })

    test = asyncHandler(async (req:Request,res:Response)=>{
       const user = req.user
       return sendSuccess(res,'Le mc',user,STATUS_CODES.ACCEPTED)
    })

    refreshaccessToken = asyncHandler(async (req:Request,res:Response)=>{
        const token = req.cookies.refreshToken
        if(!token){
            return sendError(res,'Invalid or Token not present',null,STATUS_CODES.UNAUTHORIZED)
        }
        const decodedUser = await verifyRefreshToken(token)
        const user_payload:JwtPayload = {
            id:decodedUser.id,
            role:decodedUser.role,
            email:decodedUser.email,
            name:decodedUser.name
        }
        const newAccessToken = await generateAccessToken(user_payload)
        return sendSuccess(res,"successfuly refreshed token",{token:newAccessToken},STATUS_CODES.ACCEPTED)
    })

}

const authController = new AuthController()
export default authController