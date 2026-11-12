const express = require('express');
const authController = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const {
  registerRules,
  loginRules,
  forgotPasswordRules,
  resetPasswordRules,
  updateProfileRules,
  changePasswordRules,
} = require('../validators/authValidator');

const router = express.Router();

router.post('/register', registerRules, validate, authController.register);
router.post('/login', loginRules, validate, authController.login);
router.post('/forgot-password', forgotPasswordRules, validate, authController.forgotPassword);
router.put('/reset-password/:token', resetPasswordRules, validate, authController.resetPassword);

router.get('/me', protect, authController.getMe);
router.put('/profile', protect, updateProfileRules, validate, authController.updateProfile);
router.put('/change-password', protect, changePasswordRules, validate, authController.changePassword);

module.exports = router;
