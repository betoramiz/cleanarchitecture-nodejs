import { Result } from "ts-results";
import { ErrorResponse } from "./response";
import { Response } from "express";

export function handleResult<T>(result: Result<T, ErrorResponse>, response: Response): Result<T, ErrorResponse> {
  if (result.err) {
    response.status(result.val.code).json(result.val.errors);
    return result;
  }
  response.status(200).json(result.val);
  return result;
}

export function successResult<T>(data: T, response: Response) {
  response.status(200).json(data);
}