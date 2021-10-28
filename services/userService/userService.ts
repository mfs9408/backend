export {};
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const UserModel = require("../../models/userModels");
const MailService = require("../mailService/mailService");
const tokenService = require("../tokenService/tokenService");
const UserDto = require("../../dtos/userDto");
const ApiError = require("../../errors/ApiErrors");

class UserService {
  async userRegistration(email: string, nickname: string, password: string) {
    const newUser = await UserModel.findOne({
      $or: [{ email: email }, { nickname: nickname }],
    });

    if (newUser) {
      throw ApiError.badRequest(
        "User with this email or nickname already exists"
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    const activationLink = uuidv4();
    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      nickname: nickname,
      activationLink: activationLink,
    });

    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activateAccount(activationLink: string) {
    const user = await UserModel.findOne({ activationLink: activationLink });
    if (!user) {
      throw ApiError.badRequest("Incorrect activation link");
    }
    user.isActivated = true;
    await user.save();
  }

  async userAuthorization(email: string, password: string, nickname?: string) {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw ApiError.badRequest("This user doesn't exist");
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.badRequest("Wrong password");
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: new UserDto(user) };
  }

  async userLogout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async refreshToken(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.unAuthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const dbToken = tokenService.findToken(refreshToken);

    if (!userData || !dbToken) {
      throw ApiError.unAuthorizedError();
    }

    const user = await UserModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens(userDto);
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: new UserDto(user) };
  }
}

module.exports = new UserService();
