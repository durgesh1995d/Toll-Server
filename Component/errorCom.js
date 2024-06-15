const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  // defaultMeta: { service: 'user-service' },
  transports: [
    new winston.transports.File({
      filename: 'errors/error.json',
      level: 'error',
    }),
    new winston.transports.File({ filename: 'errors/combined.json' }),
  ],
});

module.exports = {
  logger,
};
