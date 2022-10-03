const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('./mailService');
const tokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exceptions/apiError');

class UserService {
  async registration(email, password) {
    const candidate = await userModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
    }
    const activationLink = uuid.v4();
    const hashPassword = await bcrypt.hash(password, 3);

    const newUser = await userModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationLink(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`,
    );
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await userModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest('Can not find this user');
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest(`Wrong email please make sure you write correct one`);
    }
    // if (!user.isActivated) {
    //   throw ApiError.BadRequest(`Please activate your email sended on this email= ${email}`);
    // }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      throw ApiError.BadRequest(`Wrong password please make sure you write correct one`);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const user = await userModel.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await userModel.find();
    return users;
  }
}
module.exports = new UserService();
