const jwt = require('jsonwebtoken');
const env = require('../config/env');

const signAccessToken = (userId) =>
  jwt.sign({ id: userId }, env.jwtSecret, { expiresIn: env.jwtExpire });

const verifyToken = (token) => jwt.verify(token, env.jwtSecret);

module.exports = { signAccessToken, verifyToken };
