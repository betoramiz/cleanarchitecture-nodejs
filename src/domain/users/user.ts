import { usersTable } from "./users.schema";

export interface IUser {
  id?: number;
  name: string;
  age: number;
  email: string;
}

export type InsertUser = typeof usersTable.$inferInsert;

export class User {
  private readonly user: IUser;
  constructor(user: InsertUser) {
    this.user = user;
  }

  static create(user: InsertUser): IUser {
    return {
      name: user.name,
      age: user.age,
      email: user.email
    }
  }

  changeName(name: string) {
    this.user.name = name;
  }

  get GetUserInput(): InsertUser {
    return this.user;
  }
}