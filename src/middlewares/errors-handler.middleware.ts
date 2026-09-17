import { NextFunction } from "express";
import { Request, Response, ErrorRequestHandler } from 'express';
import { AppError } from "../errors/app.error.js";
import { ErrorResponse } from "../dto/common/error.response.js";

export function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (res.headersSent) return next(err);

  if (err instanceof AppError) {
    const errorResponse = ErrorResponse.create(err);

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

  // const isOperational = err.isOperational === true || status < 500;

  // // const log = req.log ?? logger;
  // // log[status >= 500 ? 'error' : 'warn']({ err, status }, 'request failed');

  // const body = {
  //   type: `https://example.com/problems/${err.code ?? 'internal-error'}`,
  //   title: isOperational ? err.message : 'Внутренняя ошибка сервера',
  //   status,
  //   instance: req.originalUrl,
  //   details: err.details
  //   // requestId: req.id,
  // };

  // // if (err.details) body.errors = err.details;
}