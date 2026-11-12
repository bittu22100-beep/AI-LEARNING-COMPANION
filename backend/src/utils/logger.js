const env = require('../config/env');

const format = (level, message) => {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}`;
};

const logger = {
  info: (message) => console.log(format('info', message)),
  warn: (message) => console.warn(format('warn', message)),
  error: (message) => console.error(format('error', message)),
  debug: (message) => {
    if (env.nodeEnv === 'development') {
      console.debug(format('debug', message));
    }
  },
};

module.exports = logger;
