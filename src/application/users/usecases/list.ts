import { UseCase } from "@shared/UseCase";
import { ApiResponse, UseCaseResponse } from "@shared/Responses";
import { IUserRepository } from "../repository";


export interface Response {
  id: number;
  name: string;
  email: string;
}

export class ListUseCase implements UseCase<void> {

  constructor(private readonly repository: IUserRepository) {
  }

  async execute(): Promise<ApiResponse> {
    const usersResult = await this.repository.getAll();

    if (usersResult.err) {
      return UseCaseResponse.BadRequest(usersResult.val);
    }

    const response: Response[] = usersResult.val.map(user => ({
      id: user.id!,
      name: user.name!,
      email: user.email!,
    }));

    return UseCaseResponse.Success(response)
  }


}
