import jwt, { JwtPayload } from 'jsonwebtoken'
import { envConfig  } from '../config/env.config'

export const generateAccessToken = async (user:JwtPayload)=>{
   const accessToken = await jwt.sign(user, envConfig.JWT__ACCESSTOKEN_SECRET, {
     expiresIn: "7d",
   });
   return accessToken
}

export const generateRefeshToken = async (user: JwtPayload) => {
  const refreshToken = await jwt.sign(
    user,
    envConfig.JWT__REFRESHTOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return refreshToken;
};

export const verifyAccessToken = async (token:string)=>{
      const decodeUser = await jwt.verify(token,envConfig.JWT__ACCESSTOKEN_SECRET) as JwtPayload
      return decodeUser
}

export const verifyRefreshToken = async (token:string)=>{
   const decodeUser = await jwt.verify(token,envConfig.JWT__REFRESHTOKEN_SECRET) as JwtPayload
   return decodeUser
}

