import { NextFunction, Request, Response } from "express";
import { randomUUID } from 'node:crypto';
import { logger } from "../lib/pino.js";
import { pinoHttp } from "pino-http";

export const httpLogger = pinoHttp({
  logger,
   serializers: {
    req: (req) => ({
      method: req.method,
      path: req.url,
      requestId: req.id,
    }),
    res: (res) => ({
      statusCode: res.statusCode,
    }),
  },
  genReqId(req: Request, res: Response) {
    const existing = req.id ?? req.headers['x-request-id'];
    if (existing) return existing;
    const id = randomUUID();
    res.setHeader('X-Request-Id', id);
    return id;
  },
  customLogLevel(req: Request, res: Response, err: unknown) {
    if (err || res.statusCode >= 500) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  },
  autoLogging: {
    ignore: (req: Request) => req.url === '/health',
  },
});
