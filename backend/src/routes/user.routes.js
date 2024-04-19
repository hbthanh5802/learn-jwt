const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const userControllers = require('../controllers/user.controller');

// GET ALL USERS
router.get('/', authMiddleware.verifyToken, userControllers.fetchAllUser);
// DELETE AN USER
router.delete(
  '/:userId',
  authMiddleware.verifyAndAdmin,
  userControllers.deleteAnUser
);

module.exports = router;
