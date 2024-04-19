const router = require('express').Router();
const authMiddleware = require('../middlewares/auth.middleware');
const authController = require('../controllers/auth.controller');

// REGISTER
router.post('/register', authController.registerUser);
// LOGIN
router.post('/login', authController.loginUser);
// REFRESH
router.post('/refresh', authController.refreshToken);
// LOGOUT
router.post('/logout', authMiddleware.verifyToken, authController.logoutUser);

module.exports = router;
