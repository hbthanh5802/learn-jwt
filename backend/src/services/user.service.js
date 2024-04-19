const UserModel = require('../models/User.model');
const userServices = {};

userServices.createUser = async (payload) => {
  let response = {
    statusCode: 201,
    message: 'Succeed to create an user',
  };
  try {
    const user = await UserModel.create(payload);
    if (user) {
      response.data = user;
    }
    return response;
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to create an user';
    throw error;
  }
};

userServices.fetchOneByCriteria = async (payload) => {
  let response = {
    statusCode: 200,
    message: 'Succeed to get an user',
  };
  try {
    const searchCriteria = payload;
    if (
      (!searchCriteria && typeof searchCriteria !== 'object') ||
      Object.keys(searchCriteria) === 0
    ) {
      response.message = 'Invalid search value';
      response.statusCode = 422;
      return response;
    }
    const user = await UserModel.findOne(searchCriteria);
    if (user) {
      response.data = user;
    } else {
      response.statusCode = 404;
      response.message = 'User not found';
    }
    return response;
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to create an user';
    throw error;
  }
};

userServices.fetchAll = async () => {
  let response = {
    statusCode: 200,
    message: 'Succeed to get all users',
  };
  try {
    const users = await UserModel.find({});
    if (users) {
      response.data = users;
    }
    return response;
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to get all users';
    throw error;
  }
};

userServices.deleteOne = async (payload) => {
  let response = {
    statusCode: 200,
    message: 'Succeed to delete an user',
  };
  try {
    const { userId } = payload;
    // const user = await UserModel.findByIdAndDelete(userId);
    const user = await UserModel.findById(userId);
    if (user) {
      response.data = user;
    } else {
      response.message = 'User not found';
    }
    return response;
  } catch (error) {
    response.statusCode = 500;
    response.message = 'Failed to delete an user';
    throw error;
  }
};

module.exports = userServices;
