import { NextFunction } from "express";
import { ZodType } from "zod/v4";
import { Request, Response } from 'express';

export interface RequestValidatorSchemas {
  body?: ZodType ,
  query?: ZodType ,
  params?: ZodType 
}

export function validate(schemas: RequestValidatorSchemas) {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const part of ['body', 'query', 'params'] as const) {
      const schema = schemas[part];
      if (!schema) continue;

      const result = schema.safeParse(req[part]);
      if (!result.success) {
        const messages = [];
        for (const error of result.error.issues)
        {
          messages.push({field: error.path[0] ?? "", message: error.message});
        }
        return res.status(400).json({ message: messages }); // генерировать ошибку через return next(new ValidationError(result.error));
      }
      req[part] = result.data;
    }
    next();
  };
}