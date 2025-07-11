import { UseCase } from "@shared/UseCase";
import { ApiResponse, UseCaseResponse } from "@shared/Responses";
import { IUserRepository } from "../repository";


export interface Response {
  id: number;
  name: string;
}

export class ListUseCase implements UseCase<void, Response[]> {

  constructor(private readonly repository: IUserRepository) {
  }

  async execute(): Promise<ApiResponse> {
    const usersResult = await this.repository.getAll();

    if (usersResult.err) {
      return UseCaseResponse.BadRequest(usersResult.val);
    }

    const response: Response[] = usersResult.val.map(user => ({
      id: user.id!,
      name: user.name!
    }));

    return UseCaseResponse.Success(response)
  }


}
