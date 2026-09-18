import { ErrorDetails } from '../../errors/types/error-details.js';
import { AppError } from './../../errors/app.error.js';

export class ErrorResponse {
  code?: string;
  message?: string;
  details?: ErrorDetails[];
  requestId?: string;

  static create(errorInfo: AppError) : ErrorResponse {
    const instanse = new ErrorResponse();
    instanse.code = errorInfo.code;
    instanse.message = errorInfo.message;
    
    if (errorInfo.details.length > 0) {
      instanse.details = [];
      
      errorInfo.details.map((info) => 
      {
        instanse.details?.push({
          field: info.field,
          message: info.message
        })
      });
    }

    return instanse;
  }

}