import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import authConfig from '../config/auth.config.js';
import { AuthenticationError } from '../errors/authentication.error.js';
import appConfig from '../config/app.config.js';
import NODE_ENV_VALUES from '../config/node_env.enum.js';

export function authenticate(req: Request, res: Response, next: NextFunction) {

  if (appConfig.nodeEnv != NODE_ENV_VALUES.PRODUCTION) 
  {
    next();
    return;
  } 

  const token = req.cookies?.token;
  if (!token) {
    throw new AuthenticationError("Не авторизован");
  }

  try {
    const decoded = jwt.verify(token, authConfig.secretKey);
    next();
  }
  catch (error) {
    throw new AuthenticationError("Невалидный токен");
  }
}