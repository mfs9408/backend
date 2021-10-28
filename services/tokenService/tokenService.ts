export {};
const jwt = require("jsonwebtoken");
const tokenModel = require("../../models/tokenModel");

class TokenService {
  generateTokens(email: string, nickname: string, role: string) {
    const accessToken = jwt.sign(
      { email, nickname, role },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "12h",
      }
    );
    const refreshToken = jwt.sign(
      { email, nickname, role },
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
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken: string) {
    return await tokenModel.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return await tokenModel.findOne({ refreshToken });
  }

  async validateAccessToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  }
}

module.exports = new TokenService();
