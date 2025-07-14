﻿import { usersTable } from "./users.schema";

export type UserInsert = typeof usersTable.$inferInsert;
type UserSelect = typeof usersTable.$inferSelect;

export interface IUser extends  UserSelect {

}

export class User {
  private readonly user: IUser;
  constructor(user: IUser) {
    this.user = user;
  }

  static create(user: IUser): Omit<IUser, 'id'> {
    return {
      name: user.name,
      age: user.age,
      email: user.email
    }
  }

  changeName(name: string) {
    this.user.name = name;
  }

  get GetUserInput(): UserInsert {
    return this.user;
  }
}

export const mapper = {
  toDomain: (schema: UserSelect): IUser =>  {
    return {
      id: schema.id,
      age: schema.age,
      email: schema.email,
      name: schema.name
    }
  }
}