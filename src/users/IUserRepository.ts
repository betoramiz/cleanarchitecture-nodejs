import { User } from "./models";
import { UserInsert } from "../database/Repositories/UserRepository";

export interface IUserRepository {
  getById(id: number): Promise<User|null>;
  getAll(): Promise<User[]>;
  create(user: UserInsert): Promise<number>;
}