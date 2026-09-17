import { NextFunction } from "express";
import { ZodType } from "zod/v4";
import { Request, Response } from 'express';
import { ValidationError } from "../errors/validation.error.js";

export function validateCleanQuery(schemas: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.cleanQuery) {
      const result = schemas.safeParse(res.locals.cleanQuery);
      if (!result.success) {
        return next(new ValidationError(result.error));
      }
      res.locals.cleanQuery = result.data;
    }
    next();
  };
}