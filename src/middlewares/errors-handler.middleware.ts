import { NextFunction, Request, Response, ErrorRequestHandler } from 'express';
import { AppError } from "../errors/app.error.js";
import { ErrorResponse } from "../dto/common/error.response.js";
import { logger } from "../lib/pino.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  const log = req.log ?? logger;

  if (err instanceof AppError) {
    const errorResponse = ErrorResponse.create(err);

    log[err.status >= 500 ? 'error' : 'warn']({status: err.status, error: err}, 'request failed');

    res.status(err.status)
       .type('application/problem+json')
       .json({error: errorResponse});
  } 
  else if (err instanceof Error) {

    const body = {
      error: {
        message: err.message,
        requestId: req.id,
      }
    }
    
    res.status(500)
      .type('application/problem+json')
      .json(body);
  }
  else {

    res.status(500)
      .type('application/problem+json')
      .json({error: "Неизвестная ошибка"});
      
  }
}