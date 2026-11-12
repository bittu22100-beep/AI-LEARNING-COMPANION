const crypto = require('crypto');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const { signAccessToken } = require('./tokenService');
const { sendEmail } = require('./emailService');
const env = require('../config/env');

const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, 'Email is already registered');
  }

  const user = await User.create({ name, email, password });
  const token = signAccessToken(user._id);

  return { user: user.toPublicJSON(), token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  user.lastActiveAt = new Date();
  await user.save();

  const token = signAccessToken(user._id);
  return { user: user.toPublicJSON(), token };
};

const getUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

const updateProfile = async (userId, updates) => {
  const allowed = ['name', 'bio', 'avatar', 'preferredLanguage', 'learningGoals'];
  const sanitized = {};

  for (const key of allowed) {
    if (updates[key] !== undefined) {
      sanitized[key] = updates[key];
    }
  }

  const user = await User.findByIdAndUpdate(userId, sanitized, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  return user.toPublicJSON();
};

const changePassword = async (userId, { currentPassword, newPassword }) => {
  const user = await User.findById(userId).select('+password');
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) {
    throw new ApiError(401, 'Current password is incorrect');
  }

  user.password = newPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    return { message: 'If that email exists, a reset link has been sent' };
  }

  const resetToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${env.clientUrl}/reset-password/${resetToken}`;

  await sendEmail({
    to: user.email,
    subject: 'Reset your AI Learning Companion password',
    html: `<p>Hi ${user.name},</p><p>Click the link below to reset your password (valid for 1 hour):</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
    text: `Reset your password: ${resetUrl}`,
  });

  return {
    message: 'If that email exists, a reset link has been sent',
    ...(env.nodeEnv === 'development' && { resetUrl }),
  };
};

const resetPassword = async (token, newPassword) => {
  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  }).select('+password');

  if (!user) {
    throw new ApiError(400, 'Invalid or expired reset token');
  }

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  const accessToken = signAccessToken(user._id);
  return { user: user.toPublicJSON(), token: accessToken };
};

module.exports = {
  registerUser,
  loginUser,
  getUserById,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
};
