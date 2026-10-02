import { Request, Response } from 'express';
import jwt from "jsonwebtoken";
import authConfig from '../config/auth.config.js';
import NODE_ENV_VALUES from '../config/node_env.enum.js';
import { AuthenticationError } from '../errors/authentication.error.js';
import appConfig from '../config/app.config.js';
import { loginUser, refreshToken, registerUser } from '../services/auth.service.js';
import { TokenPayload } from '../dto/types/tokens-payload.type.js';


export const register = async (req: Request, res: Response): Promise<void> => { 

  const result = await registerUser(req.body);

  res.status(201).json({result});
}


export const login = async (req: Request, res: Response): Promise<void> => {
  
  const result = await loginUser(req.body);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({ token: result.accessToken });
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const tokenFromCookie = req.cookies.refreshToken;
  if (!tokenFromCookie) res.status(401).send("Нет Refresh Token");

  const result = await refreshToken(tokenFromCookie);

  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({ token: result.accessToken });
}

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: appConfig.nodeEnv == NODE_ENV_VALUES.PRODUCTION,
      sameSite: "strict",
    });
    res.status(200).send();
  } catch (error) {
    throw new AuthenticationError("Ошибка выхода");
  }
};

export const me = async (req: Request, res: Response): Promise<void> => {
  const info: TokenPayload = res.locals.user;

  res.status(200).json({login: info.login, role: info.role, user: info.userId})
}