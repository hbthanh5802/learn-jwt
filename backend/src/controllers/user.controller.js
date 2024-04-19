const userServices = require('../services/user.service');
const userControllers = {};

userControllers.fetchAllUser = async (req, res, next) => {
  let response;
  try {
    response = await userServices.fetchAll();
    return res.status(200).json(response);
  } catch (error) {
    console.log('Failed to get all users', error);
    res.status(500).json(error);
  }
};

userControllers.deleteAnUser = async (req, res, nest) => {
  let response = {};
  const { userId } = req.params;
  try {
    if (!userId) {
      response.message = 'Invalid userId';
      response.statusCode = 400;
      return res.status(400).json(response);
    }
    const payload = { userId };
    response = await userServices.deleteOne(payload);
    return res.status(200).json(response);
  } catch (error) {
    console.log('Failed to delete user', error);
    res.status(500).json(error);
  }
};

module.exports = userControllers;
