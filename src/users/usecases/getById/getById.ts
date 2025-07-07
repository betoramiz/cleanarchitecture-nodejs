import { User } from "../../models";
import type { IUserRepository } from "../../IUserRepository";
import { Err, Ok, Result } from "ts-results";
import { ErrorResponse } from "../../../common/response";
import { UseCase } from "../../../common/UseCase";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../../types/Interfaces";

@injectable()
export default class GetByIdUseCase implements UseCase<number, User> {

  private userRepository: IUserRepository;
  constructor(@inject(INTERFACE_TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(id: number): Promise<Result<User, ErrorResponse>> {
    const user = await this.userRepository.getById(id);
    if(user === null) {
      return Err(ErrorResponse.NotFound())
    }

    return Ok(user)
  }

}
