import { NextFunction } from "express";
import { ZodType } from "zod/v4";
import { Request, Response } from 'express';

export function validateCleanQuery(schemas: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.cleanQuery) {
      const result = schemas.safeParse(res.locals.cleanQuery);
      if (!result.success) {
        const messages = [];
        for (const error of result.error.issues)
        {
          messages.push({field: error.path[0] ?? "", message: error.message});
        }
        return res.status(400).json({ message: messages }); // генерировать ошибку через return next(new ValidationError(result.error));
      }
      res.locals.cleanQuery = result.data;
    }
    next();
  };
}