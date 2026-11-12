require('dotenv').config();

const requiredInProduction = ['JWT_SECRET', 'MONGODB_URI'];

const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongodbUri:
    process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'dev_jwt_secret_change_me',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
    from: process.env.EMAIL_FROM || 'AI Learning Companion <noreply@learning.com>',
  },
  openaiApiKey: process.env.OPENAI_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
};

if (env.nodeEnv === 'production') {
  for (const key of requiredInProduction) {
    if (!process.env[key]) {
      console.warn(`Warning: ${key} is not set in production.`);
    }
  }
}

module.exports = env;
