import { UserModel } from "../model/user.model";
import { asyncHandler } from "../utils/async.hanlder";
import { Request, Response, NextFunction } from "express";
import { sendSuccess } from "../utils/response.formatter";
import STATUS_CODES from "../utils/status.codes";

class AdminCOntroller {
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    const users = await UserModel.aggregate([
       {$match:{"email":{$ne:req.user.email},"role":{$eq:"seller"}}}, 
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          __v: 0,
          password: 0,
        },
      },
    ]);
    return sendSuccess(res, "All users", users, STATUS_CODES.ACCEPTED);
  });
}

const adminController = new AdminCOntroller();
export { adminController };
