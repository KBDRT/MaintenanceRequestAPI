import { NextFunction, Request, Response } from "express";

export function logRequest(req: Request, res: Response, next: NextFunction) {
  console.log("ALO");
  // logger.info(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  // console.log(`${req.method} ${req.path} ${res.statusCode || ""} ${req.id || ""}`);
  next();
}