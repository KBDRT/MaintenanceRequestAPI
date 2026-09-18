import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors/not-found.error.js';

export function endpointNotFound(req: Request, res: Response, next: NextFunction) {
  const details = [{field: "url", message: `Несуществующий маршрут! URL: ${req.originalUrl}`}, 
                   {field: "method", message: `Используемый метод: ${req.method}`}]

  next(new NotFoundError("Эндпоинт не найден", details))
}