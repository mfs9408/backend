import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import ApiError from "../../errors/ApiErrors";
import userService from "../../services/userService/userService";

class UserController {
  async userRegistration(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.badRequest("Validation mistake"));
      }

      const { email, nickname, password } = req.body.payload;

      const userData = await userService.userRegistration(
        email,
        nickname,
        password
      );
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      next(e);
    }
  }

  async userAuthorization(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.userAuthorization(email, password);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // path: "/",
      });
      return res.json({ payload: userData });
    } catch (e) {
      next(e);
    }
  }

  async activateAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activateAccount(activationLink);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }

  async userLogout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.userLogout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refreshToken(refreshToken);
      res.cookie("refreshToken", userData.tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // path: "/refresh",
      });
      return res.json({ payload: userData });
    } catch (e) {
      next(e);
    }
  }

  // async userOptions(req: Request, res: Response, next: NextFunction) {}
}

export default new UserController();
