import express from 'express'
import { publicController } from '../controllers/public.controller'
import { authChecker, roleChecker } from '../middleware/auth.middleware';

const publicRouter = express.Router()

publicRouter.get('/products',publicController.getProducts)
publicRouter.post("/addreview",authChecker,roleChecker(['customer']),publicController.addReview);

export default publicRouter