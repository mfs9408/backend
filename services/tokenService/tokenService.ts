import jwt from "jsonwebtoken";
import tokenModel from "../../models/tokenModel";
import { ModelInterface } from "../../types";

class TokenService {
  generateTokens({ email, nickname, role }: ModelInterface) {
    const rolesForToken = () => role.reduce((acc, role) => acc + role);

    const accessToken = jwt.sign(
      { email, nickname, rolesForToken },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "12h",
      }
    );

    const refreshToken = jwt.sign(
      { email, nickname, rolesForToken },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "30d",
      }
    );
    return { accessToken, refreshToken };
  }

  async saveToken(userId: string, refreshToken: string) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    return await tokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    return tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return tokenModel.findOne({ refreshToken });
  }

  async validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (e) {
      return null;
    }
  }
}

export default new TokenService();
