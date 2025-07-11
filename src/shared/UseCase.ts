import { ApiResponse } from "./Responses";

export interface UseCase<T, U> {
  execute(request?: T): Promise<ApiResponse<U>> | ApiResponse<U>
}