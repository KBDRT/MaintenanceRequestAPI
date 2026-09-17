import { NextFunction, Request, Response } from "express";
import { randomUUID } from 'node:crypto';

export function setRequestId(req: Request, res: Response, next: NextFunction) {
  req.id = randomUUID();
  next();
}