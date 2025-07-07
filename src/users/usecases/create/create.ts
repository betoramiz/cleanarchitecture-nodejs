import { User } from "../../models";
import { Err, Ok, Result } from "ts-results";
import { ErrorResponse } from "../../../common/response";
import { UseCase } from "../../../common/UseCase";
import type { IUserRepository } from "../../IUserRepository";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../../types/Interfaces";
import { UserInsert } from "../../../database/Repositories/UserRepository";


@injectable()
export default class CreateUseCase implements UseCase<UserInsert, number> {
  private repository: IUserRepository;
  constructor(
    @inject(INTERFACE_TYPES.IUserRepository) repository: IUserRepository
  ) {
    this.repository = repository;
  }

  async execute(user?: UserInsert): Promise<Result<number, ErrorResponse>> {
    if(user === undefined) {
      return Err(ErrorResponse.InternalError('Ocurrio un error'));
    }

    const result = await this.repository.create(user);
    return Ok(result);
  }

}