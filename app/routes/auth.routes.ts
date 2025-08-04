import express from 'express'
import authController from '../controllers/auth.controller'
import { authChecker } from '../middleware/auth.middleware'
import { roleChecker } from '../middleware/auth.middleware'
const authRouter = express.Router()

authRouter.post('/register',authController.register)
authRouter.post('/login',authController.login)
authRouter.get('/test',authChecker,roleChecker(["admin","seller"]), authController.test)
authRouter.get('/me',authController.refreshaccessToken),
authRouter.post('/bulk',authController.bulkregister)

export default authRouter