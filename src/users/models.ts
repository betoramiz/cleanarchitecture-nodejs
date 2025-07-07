import { UserInsert } from "../database/Repositories/UserRepository";

export interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

export class Users {
  static create(name: string, email: string, age: number): UserInsert {
    return { name, email, age }
  }
}