import { UseCase } from "../../../common/UseCase";
import { Ok, Result } from "ts-results";
import { ErrorResponse } from "../../../common/response";
import { User } from "../../models";
import type { IUserRepository } from "../../IUserRepository";
import { inject, injectable } from "inversify";
import { INTERFACE_TYPES } from "../../types/Interfaces";

@injectable()
export default class GetAllUseCase implements UseCase<any, User[]> {

  private userRepository: IUserRepository;
  constructor(@inject(INTERFACE_TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(data?: any): Promise<Result<any, ErrorResponse>> {
    const users = await this.userRepository.getAll();
    return Ok(users);
  }

}