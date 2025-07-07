import { ZodError, ZodIssue } from "zod";

// export interface Response {
//   success: boolean;
// }

// export interface SuccessResponse<T> extends Response {
//   data: T;
// }

export interface ErrorMessage {
  name: string;
  description: string;
}

export type BadRequest = 400;
export type Unauthorized = 401;
export type NotFound = 404;
export type InternalError = 500;

export type ErrorCode = BadRequest | Unauthorized | NotFound | InternalError;

export interface ErrorResponse {
  errors: ErrorMessage[];
  code: ErrorCode;
}

export class ErrorResponse {
  static BadRequest(issues: ZodIssue[]): ErrorResponse {
    const errors = issues.map(x => ({
      name: x.code.toString(),
      description: x.message
    }));

    return {
      errors: errors,
      code: 400
    }
  }

  static NotFound(message: string = ''): ErrorResponse {
    const error: ErrorMessage = { name: 'Resource not found', description: message };

    return {
      errors: [error],
      code: 404
    }
  }

  static InternalError(message: string): ErrorResponse {
    const error: ErrorMessage = { name: 'Internal Error', description: message };
    return {
      errors: [error],
      code: 500
    }
  }
}