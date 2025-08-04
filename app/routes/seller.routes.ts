import express from 'express'
import { sellerController } from '../controllers/seller.controller'
import { authChecker, roleChecker } from '../middleware/auth.middleware'
const sellerRouter = express.Router()

sellerRouter.post('/products',authChecker,roleChecker(['seller']),sellerController.addProduct)
sellerRouter.post('/bulk',authChecker,roleChecker(['seller']),sellerController.bulkUpload)

export default sellerRouter