import { UseCase } from "@shared/UseCase";
import { Err, Ok, Result } from "ts-results";
import { ErrorResponse } from "@shared/response";
import { IUserRepository } from "../repository";


export interface Response {
  id: number;
  name: string;
}

export class ListUseCase implements UseCase<unknown, Response[]> {

  constructor(private readonly repository: IUserRepository) {
  }

  async execute(): Promise<Result<Response[], ErrorResponse>> {
    const usersResult = await this.repository.getAll();

    if (usersResult.err) {
      return Err(ErrorResponse.InternalError(usersResult.val.description));
    }


    const response: Response[] = usersResult.val.map(user => ({
      id: user.id!,
      name: user.name!
    }));

    return Ok(response);
  }


}
