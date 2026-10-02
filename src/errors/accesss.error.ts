import { AppError } from "./app.error.js";
import { ErrorDetails } from "./types/error-details.js";

export class AccessError extends AppError {
  constructor(message: string, details? : ErrorDetails[]) {
    super(message, { status: 403, code: 'ACCESS_ERROR', details: details });
  }
}