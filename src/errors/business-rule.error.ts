import { AppError } from "./app.error.js";
import { ErrorDetails } from "./types/error-details.js";

export class BusinessRuleError extends AppError {
  constructor(message: string, details? : ErrorDetails[]) {
    super(message, { status: 422, code: 'BUSINESS_RULE_ERROR', details: details });
  }
}