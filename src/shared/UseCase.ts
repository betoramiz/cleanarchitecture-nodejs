import { Result } from "ts-results";
import { ErrorResponse } from "./response";

export interface UseCase<T, U> {
  execute(request?: T): Promise<Result<U, ErrorResponse>> | Promise<U> | Promise<void> | U | void;
}