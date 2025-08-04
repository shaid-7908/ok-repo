import express from 'express'
import { adminController } from '../controllers/admin.controller'
import { authChecker, roleChecker } from '../middleware/auth.middleware'

const adminRouter = express.Router()


adminRouter.get('/users',authChecker,roleChecker(["admin"]), adminController.getAllUsers)

export default adminRouter