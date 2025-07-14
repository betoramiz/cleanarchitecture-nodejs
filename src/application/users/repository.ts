import { Result } from "ts-results";
import { ErrorMessage } from "@shared/Responses";
import { UserInsert, IUser } from "@domain/users/user";
import { IWriteRepository } from "@application/common/IWriteRepository";
import { usersTable } from "@domain/users/users.schema";

export interface IUserRepository extends IWriteRepository<typeof usersTable, UserInsert> {
  // create(user: InsertUser): Promise<Result<number, ErrorMessage>>;
  getById(id: number): Promise<Result<IUser|null, ErrorMessage>>;
  getAll(): Promise<Result<IUser[], ErrorMessage>>;
}