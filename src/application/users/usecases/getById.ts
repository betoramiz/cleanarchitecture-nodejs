import { UseCase } from "@shared/UseCase";
import { Err, Ok, Result } from "ts-results";
import { ErrorResponse } from "@shared/response";
import { IUserRepository } from "../repository";


export interface Request {
  id: number;
}

export interface Response {
  id: number;
  name: string;
}

export class GetByIdUseCase implements UseCase<number, Response> {

  constructor(private readonly repository: IUserRepository) {
  }

  async execute(id?: number): Promise<Result<Response, ErrorResponse>> {
    if(id === undefined) {
      return Err(ErrorResponse.InternalError('id is not defined'));
    }

    const user = await this.repository.getById(id);
    if (user.err) {
      return Err(ErrorResponse.InternalError(user.val.description));
    }

    if (!user.val) {
      return Err(ErrorResponse.NotFound());
    }

    return Ok({
      id: user.val?.id!,
      name: user.val?.name!
    });
  }

}