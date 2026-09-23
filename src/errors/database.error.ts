import { ValidationError } from "sequelize";
import { AppError } from "./app.error.js";
import { ErrorDetails } from "./types/error-details.js";

export class DatabaseError extends AppError {
  constructor(cause?: unknown) {
    const errorCause = cause as any;
    const code = errorCause?.code ?? errorCause?.original?.code ?? errorCause?.code;
    const error = getError(code);
    const details = getDetails(errorCause);
    super(error.message, { details: details, status: error.status, code: 'DATABASE_ERROR', cause });
  }
}

function getError(code: any) {
  switch (code) {
    case '23505': return { status: 409, message: 'Запись с такими данными уже существует' };
    case '23503': return { status: 422, message: 'Ссылка на несуществующую запись' };
    case '23502': return { status: 400, message: 'Не заполнено обязательное поле' };
    case '23514': return { status: 422, message: 'Значение не удовлетворяет ограничениям' };
    default:      return { status: 500, message: 'Внутренняя ошибка' };
  }
}

function getDetails(error: any) {
  const details: ErrorDetails[] = [];

  if (error instanceof ValidationError) {
    error.errors.map((e) => {
      details.push({
        field: e.path ?? "",
        message: e.message 
      });
    });
  }

  return details.length > 0 ? details : undefined;
}

