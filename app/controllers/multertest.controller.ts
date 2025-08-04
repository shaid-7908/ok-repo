import { asyncHandler } from "../utils/async.hanlder";

class MulterTestController{
    uploadToLocal = asyncHandler(async (req,res)=>{
      console.log(req.file)
      const toupdateIndb = req.file?.filename
    })
}

const multerTestController = new MulterTestController()

export {multerTestController}