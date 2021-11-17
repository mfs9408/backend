import { Response, NextFunction } from "express";
import tokenService from "../services/tokenService";
import ApiError from "../errors/ApiErrors";

export default function (req: any, res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unAuthorizedError("Unauthorized user"));
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.unAuthorizedError("Unauthorized user"));
  }
}
