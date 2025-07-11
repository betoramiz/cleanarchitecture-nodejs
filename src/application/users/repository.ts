import { InsertUser } from "@domain/users/user";
import { Result } from "ts-results";
import { ErrorMessage } from "@shared/response";
import { IUser } from "@domain/users/user";

export interface IUserRepository {
  create(user: InsertUser): Promise<Result<number, ErrorMessage>>;
  getById(id: number): Promise<Result<IUser|null, ErrorMessage>>;
  getAll(): Promise<Result<IUser[], ErrorMessage>>;
}