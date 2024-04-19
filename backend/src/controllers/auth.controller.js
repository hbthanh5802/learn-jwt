const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userServices = require('../services/user.service');
const tokenHelper = require('../utils/token.helper');
const authController = {};

let dummyRefreshTokenDatabase = [];

authController.registerUser = async (req, res, next) => {
  let response = {};
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.sendStatus(409);
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    //
    const payload = { username, email, password: hashedPassword };
    response = await userServices.createUser(payload);
    if (response.data) {
      response.message = 'Succeed to register';
    }
    return res.status(response.statusCode).json(response);
  } catch (error) {
    response.message = 'Failed to register';
    response.statusCode = 409;
    console.log(response.message, error);
    return res.status(500).json(response);
  }
};

authController.loginUser = async (req, res, next) => {
  let response = {};
  try {
    const { email, password, username } = req.body;
    response = await userServices.fetchOneByCriteria({ username });
    if (!response.data) {
      return res.status(response.statusCode).json(response);
    }
    const currentUser = response.data;
    const matchedPassword = await bcrypt.compare(
      password,
      currentUser.password
    );
    if (!matchedPassword) {
      delete response.data;
      response.message = 'Wrong username or password';
      response.statusCode = 401;
      return res.status(401).json(response);
    }
    if (currentUser && matchedPassword) {
      const { password, ...payload } = currentUser._doc;
      const accessToken = tokenHelper.getAccessToken(payload);
      const refreshToken = tokenHelper.getRefreshToken(payload);

      dummyRefreshTokenDatabase.push(refreshToken);

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      response.meta = { accessToken };
      response.message = 'Succeed to login';
      response.statusCode = 200;
      return res.status(200).json(response);
    }
  } catch (error) {
    console.log('Failed to login', error);
    res.status(500).json(error);
  }
};

authController.refreshToken = async (req, res, next) => {
  let response = {
    statusCode: 200,
    message: 'Succeed to refresh access token',
  };
  // Take refresh token form cookie
  const refreshToken = req.cookies.refreshToken;
  if (!dummyRefreshTokenDatabase.includes(refreshToken)) {
    response.statusCode = 401;
    response.message = 'You are not authenticated';
    return res.status(401).json(response);
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET_KEY,
    (error, tokenData) => {
      if (error) {
        response.statusCode = 401;
        response.message = 'You are not authenticated';
        return res.status(401).json(response);
      }
      // Delete old refreshToken
      dummyRefreshTokenDatabase = dummyRefreshTokenDatabase.filter(
        (token) => token !== refreshToken
      );
      const { iat, exp, ...payload } = tokenData;
      // Get a new accessToken
      const newAccessToken = tokenHelper.getAccessToken(payload);
      const newRefreshToken = tokenHelper.getRefreshToken(payload);

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        path: '/',
        sameSite: 'strict',
        secure: false,
      });
      response.meta = { accessToken: newAccessToken };
      return res.status(200).json(response);
    }
  );
};

authController.logoutUser = async (req, res, next) => {
  res.clearCookie('refreshToken');
  let response = {
    statusCode: 200,
    message: 'Succeed to refresh access token',
  };
  // Take refresh token form cookie
  const refreshToken = req.cookies.refreshToken;
  dummyRefreshTokenDatabase = dummyRefreshTokenDatabase.filter(
    (token) => token !== refreshToken
  );
  return res.status(200).json(response);
};

module.exports = authController;
