import appConfig from '../config/app.config.js';
import pino from 'pino';
import NODE_ENV_VALUES from '../config/node_env.enum.js';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token'],
  ...(process.env.NODE_ENV != NODE_ENV_VALUES.PRODUCTION && {
    transport: { target: 'pino-pretty', options: {singleLine: true} },
  }),
  
});