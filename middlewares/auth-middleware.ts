import { Response, NextFunction } from "express";
import tokenService from "../services/tokenService";
import ApiError from "../errors/ApiErrors";

export default async function (req: any, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization.split(" ")[1];
    if (!authorizationHeader) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    if (!authorizationHeader) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    const userData = await tokenService.validateAccessToken(
      authorizationHeader
    );
    if (!userData) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unAuthorizedError("Unauthorized user"));
  }
}
