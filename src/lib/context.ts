import { AsyncLocalStorage } from 'node:async_hooks';
import { NextFunction, Request, Response } from "express";
import { logger } from './pino.js';

export const store = new AsyncLocalStorage();

export const contextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  store.run({ reqId: req.id, log: req.log }, next);
};

export const getLog = () => store.getStore() ?? logger