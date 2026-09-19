import { AsyncLocalStorage } from 'node:async_hooks';
import { NextFunction, Request, Response } from "express";
import { logger } from './pino.js';
import { ReqId } from 'pino-http';
import { BaseLogger } from 'pino';

interface StoreInfo{
  reqId: ReqId;
  log: BaseLogger
}

export const store = new AsyncLocalStorage<StoreInfo>();

export const contextMiddleware = (req: Request, res: Response, next: NextFunction) => {
  store.run({ reqId: req.id, log: req.log }, next);
};

export const getLog = () => store.getStore()?.log ?? logger