import bcrypt from 'bcrypt'

export const hashPassword = async (plainpassword:string):Promise<string>=>{
    const saltRound = 10 
    const newHasedPassword = await bcrypt.hash(plainpassword,saltRound)
    return newHasedPassword
}

export const verifyPassword  = async (hashedPassword:string,plainPassword:string):Promise<boolean>=>{
     return await bcrypt.compare(plainPassword,hashedPassword)
}