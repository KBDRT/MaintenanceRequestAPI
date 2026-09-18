import { NextFunction } from "express";
import { Request, Response, ErrorRequestHandler } from 'express';
import { ErrorResponse } from "../dto/common/error.response.js";

export function endpointNotFound(req: Request, res: Response, next: NextFunction) {
  const body = new ErrorResponse();
  body.code = "ENDPOINT_NOT_FOUND";
  body.message = "Эндпоинт не найден";
  body.requestId = String(req.id);
  body.details = [{field: "url", message: `Несуществующий маршрут! URL: ${req.originalUrl}`}, {field: "method", message: `Используемый метод: ${req.method}`}]

  res.status(404)
     .json(body);
}