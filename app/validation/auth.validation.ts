import joi from 'joi'

export const registerInputSchema = joi.object({
    name:joi.string().min(3).required(),
    email:joi.string().email(),
    password:joi.string().alphanum().min(8)
})

export const loginInputSchema = joi.object({
    email:joi.string().email(),
    password:joi.string().alphanum().min(7)
})