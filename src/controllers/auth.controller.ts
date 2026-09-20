import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import authConfig from '../config/auth.config.js';
import NODE_ENV_VALUES from '../config/node_env.enum.js';
import { AuthenticationError } from '../errors/authentication.error.js';
import appConfig from '../config/app.config.js';

export const login = async (req: Request, res: Response): Promise<void> => {
  const token = jwt.sign(
    {}, 
    authConfig.secretKey, 
    {expiresIn: 60 * 60 * 1000}
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION,
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
    path: "/",
  })

  res.status(200).json({});
};

export const logout = async (req: Request, res: Response): Promise<void> => {
   try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION,
      sameSite: "strict",
      path: "/",
    });
    res.status(200).json({});
  } catch (error) {
    throw new AuthenticationError("Ошибка выхода");
  }
};