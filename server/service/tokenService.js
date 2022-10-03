const jwt = require('jsonwebtoken');
const tokenModel = require('../models/tokenModel');

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET_KEY, { expiresIn: '30m' });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, { expiresIn: '30d' });

    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY);
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await tokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await tokenModel.create({ user: userId, refreshToken });
    return token;
  }

  async removeToken(refreshToken) {
    const token = await tokenModel.deleteOne({ refreshToken });
    return token;
  }

  async findToken(refreshToken) {
    const token = await tokenModel.findOne({ refreshToken });
    return token;
  }
}

module.exports = new TokenService();
