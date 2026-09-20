import appConfig from "./app.config.js";
import NODE_ENV_VALUES from "./node_env.enum.js";

export const corsSettings = {
  origin: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION ? appConfig.origin : '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
  ],
  exposedHeaders: ['X-Total-Count', 'X-Request-Id'],
  maxAge: 86400,
  optionsSuccessStatus: 204,
};