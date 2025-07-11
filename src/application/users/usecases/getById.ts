import { UseCase } from "@shared/UseCase";
import { ApiResponse, UseCaseResponse } from "@shared/Responses";
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

  async execute(request: number): Promise<ApiResponse<Response>> {

    if(!request) {
      return UseCaseResponse.Validation('Id is not defined or different equals to 0');
    }

    const user = await this.repository.getById(request);
    if (user.err) {
      return UseCaseResponse.Failure();
    }

    if (!user.val) {
      return UseCaseResponse.NotFound();
    }

    return UseCaseResponse.Success({
      id: user.val?.id!,
      name: user.val?.name!
    });
  }

}