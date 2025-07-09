import { Result } from "ts-results";
import { ErrorResponse } from "./response";

export interface UseCase<T, U> {
  execute(inputData?: T): Promise<Result<U, ErrorResponse>>;
}