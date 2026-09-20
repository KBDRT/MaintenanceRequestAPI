import pino from 'pino';
import NODE_ENV_VALUES from '../config/node_env.enum';
import appConfig from '../config/app.config';

export const logger = pino({
  level: appConfig.logLevel ?? 'info',
  redact: ['req.headers.authorization', 'req.headers.cookie', '*.password', '*.token'],
  ...(appConfig.nodeEnv != NODE_ENV_VALUES.PRODUCTION && {
    transport: { target: 'pino-pretty', options: {singleLine: true} },
  }),
  
});