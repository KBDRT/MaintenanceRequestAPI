import { ErrorDetails } from "./error-details.js";

export interface AppErrorOptions {
  status?: number;
  code?: string;
  details?: ErrorDetails[];
  cause?: unknown;
}