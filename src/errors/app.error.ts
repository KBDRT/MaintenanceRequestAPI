import { AppErrorOptions } from "./types/app-error-options.js";
import { ErrorDetails } from "./types/error-details.js";

export class AppError extends Error {
  public readonly status: number;
  public readonly code: string;
  public readonly details: ErrorDetails[];
  public readonly isOperational: boolean;

  constructor(message: string, { status = 500, code = 'ERROR', details = [], cause} : AppErrorOptions) {
    super(message, {cause});
    this.name = new.target.name;
    this.status = status;
    this.code = code;
    this.details = details;
    this.isOperational = true;
  }
}