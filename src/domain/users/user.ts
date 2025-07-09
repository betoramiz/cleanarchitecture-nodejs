import { usersTable } from "./users.schema";

export interface IUser {
  id?: number;
  name: string;
  age: number;
  email: string;
}

export type InputUser = typeof usersTable.$inferInsert;

export class User {
  private readonly user: InputUser;
  constructor(user: InputUser) {
    this.user = user;
  }

  static create(user: InputUser): IUser {
    return {
      name: user.name,
      age: user.age,
      email: user.email
    }
  }

  get GetUserInput(): InputUser {
    return this.user;
  }
}