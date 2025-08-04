import { ProductModel } from "../model/product.model";
import { ReviewModel } from "../model/review.model";
import { asyncHandler } from "../utils/async.hanlder";
import { sendError, sendSuccess } from "../utils/response.formatter";
import STATUS_CODES from "../utils/status.codes";

class PublicController {
  getProducts = asyncHandler(async (req, res) => {
    const { search, category, minPrice, maxPrice } = req.query;
    const matchStage: any = {};
    if (search) {
      const searchRegx = new RegExp(search as string, "i");
      matchStage.$or = [
        { name: { $regex: searchRegx } },
        { description: { $regex: searchRegx } },
      ];
    }
    if (category) {
      matchStage.category = { $regex: new RegExp(category as string, "i") };
    }
    if (minPrice || maxPrice) {
      matchStage.price = {};
      if (minPrice) matchStage.price.$gte = Number(minPrice);
      if (maxPrice) matchStage.price.$lte = Number(maxPrice);
    }

    const products = await ProductModel.aggregate([{ $match: matchStage }]);
    return sendSuccess(res, "dd", products);
  });

  addReview = asyncHandler(async (req, res) => {
    const userId = req.user.id 
    const {comment,productid,rating} = req.body
    const checkProduct = await ProductModel.findOne({_id:productid})
    
    if(!checkProduct) return sendError(res,'Error occurred',{error:'Can not find product'},STATUS_CODES.BAD_REQUEST)
    const newReview = await ReviewModel.create({
        product:productid,
        comment:comment,
        customer:userId,
        rating:rating
    })
    return sendSuccess(res,'Review added successfully',newReview,STATUS_CODES.CREATED)
  });


}

const publicController = new PublicController()

export {publicController}