import { ApiResponse, UseCaseResponse } from "@shared/Responses";
import { UseCase } from "@shared/UseCase";
import { User } from "@domain/users/user";
import { IUserRepository } from "../repository";
import { z } from "zod/v4";

export const validationRequest = z.object({
  name: z.string().max(100).nonempty(),
  age: z.number().nonoptional(),
  email: z.email().nonempty()
});

type RequestType = z.infer<typeof validationRequest>;

export interface Request extends RequestType {
}

export interface Response {
  createdId: number;
}

export class CreateUseCase implements UseCase<Request, Response> {

  constructor(private readonly userRepository: IUserRepository) {
  }

  async execute(request: Request): Promise<ApiResponse> {

    const user = new User({
      name: request.name,
      age: request.age,
      email: request.email
    });

    const created = await this.userRepository.create(user.GetUserInput);
    if (created.err) {
      return UseCaseResponse.Failure(created.val.description);
    }

    return UseCaseResponse.Created({
      createdId: created.val
    });
  }
}