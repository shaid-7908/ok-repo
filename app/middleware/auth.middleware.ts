import { Request ,Response,NextFunction } from "express";
import { sendError } from "../utils/response.formatter";
import STATUS_CODES from "../utils/status.codes";
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from "../utils/token.handler";


declare global{
    namespace Express{
        interface Request{
            user?:any
        }
    }
}

export const authChecker = async (req:Request,res:Response,next:NextFunction)=>{
const autheader = req.headers.authorization
const token = autheader?.split(" ")[1]
if(!token){
    return sendError(res,"Invalid token",null,STATUS_CODES.UNAUTHORIZED)
}
try{
   const decodedUser = await verifyAccessToken(token)
   req.user = decodedUser
   next()
}catch(err){
   return sendError(
     res,
     "Invalid or expired access token",
     null,
     STATUS_CODES.UNAUTHORIZED
   );
}
}

export const roleChecker = (allowedRoles:string[])=>{
 return (req:Request,res:Response,next:NextFunction)=>{
       if(!req.user){
          return sendError(res,'Login required',null,STATUS_CODES.UNAUTHORIZED)
       }
       const userRole = req.user.role
       if(!userRole){
        return sendError(res,'No roles found',null,STATUS_CODES.FORBIDDEN)
       }
       if(!allowedRoles.includes(userRole)){
        return sendError(res, "Insufficient permissions",null,STATUS_CODES.FORBIDDEN);
       }
       next()
 }
}

