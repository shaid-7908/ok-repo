import express from 'express'
import { multerTestController } from '../controllers/multertest.controller'
import { upload } from '../middleware/multer.middleware'

const multerRouter = express.Router()

multerRouter.post('/test-file',upload.single('image'),multerTestController.uploadToLocal)

export default multerRouter