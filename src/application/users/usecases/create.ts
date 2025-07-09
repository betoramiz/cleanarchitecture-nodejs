import { Err, Ok, Result } from "ts-results";
import { ErrorResponse } from "../../../shared/response";
import { UseCase } from "../../../shared/UseCase";
import { InputUser, User } from "../../../domain/users/user";
import { IUserRepository } from "../repository";
import { z } from "zod";

export const validationRequest = z.object({
  name: z.string(),
  age: z.number(),
});

export interface Request extends InputUser {
}

export interface Response {
  createdId: number;
}

export class CreateUseCase implements UseCase<Request, Response> {

  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input?: Request): Promise<Result<Response, ErrorResponse>> {
    if (input === undefined) {
      return Promise.reject(Err(ErrorResponse.InternalError('')));
    }

    const user = new User({
      name: input.name,
      age: input.age,
      email: input.email
    });

    const created = await this.userRepository.create(user.GetUserInput);
    if (created.err) {
      return Err(ErrorResponse.InternalError(created.val.description))
    }

    return Ok({
      createdId: created.val
    });
  }
}