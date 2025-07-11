import { StatusCodes, ReasonPhrases } from "http-status-codes";

export interface ErrorMessage {
  name: string;
  description: string;
}

export type StatusResponse = 'success' | 'failure';
export interface ApiResponse {
  status: StatusResponse;
  code: number;
  data?: unknown | ErrorMessage | ErrorMessage[];
}


export class DatabaseResponse {
  static get NotFound(): ErrorMessage {
    return {
      name: 'Not found',
      description: 'Resource not found'
    }
  }

  static get Failure(): ErrorMessage {
    return {
      name: 'Database Failure',
      description: 'Something failure in the database'
    }
  }

  static Error(message: string = 'Something failure in the database'): ErrorMessage {
    return {
      name: 'Database Failure',
      description: message
    }
  }
}

 export class UseCaseResponse {
  static Success<T>(data?: T): ApiResponse {
    return {
      status: 'success',
      code: StatusCodes.OK,
      data: data
    }
  }

   static Created<T>(data: T): ApiResponse{
     return {
       status: 'success',
       code: StatusCodes.CREATED,
       data: data
     }
   }

   static BadRequest(message: ErrorMessage): ApiResponse{
     return {
       status: 'failure',
       code: StatusCodes.BAD_REQUEST,
       data: message
     }
   }

   static Validation(message: string): ApiResponse{
     return {
       status: 'failure',
       code: StatusCodes.BAD_REQUEST,
       data: <ErrorMessage> {
         name: ReasonPhrases.BAD_REQUEST,
         description: message
       }
     }
   }

   static NotFound(message: string = 'Resource not found'): ApiResponse{
     return {
       status: 'failure',
       code: StatusCodes.NOT_FOUND,
       data: <ErrorMessage> {
         name: ReasonPhrases.NOT_FOUND,
         description: message
       }
     }
   }

   static Failure(message: string = 'Unexpected Error happened'): ApiResponse{
     return {
       status: 'failure',
       code: StatusCodes.INTERNAL_SERVER_ERROR,
       data: <ErrorMessage> {
         name: ReasonPhrases.INTERNAL_SERVER_ERROR,
         description: message
       }
     }
   }

 }