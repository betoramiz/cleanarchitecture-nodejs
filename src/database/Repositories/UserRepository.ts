import { IUserRepository } from "../../users/IUserRepository";
import { User } from "../../users/models";
import { usersTable } from "../schema";
import { eq } from "drizzle-orm";
import { db } from "../../db";


export type UserInsert = typeof usersTable.$inferInsert;
export class UserRepository implements IUserRepository {

  constructor() {
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await db.select().from(usersTable);
      console.log('users', users);
      return users.map(user => ({
        name: user.name,
        email: user.email,
        age: user.age,
        id: user.id
      }));
    } catch (error) {
      console.log('errors: ==>', error);
      throw error;
    }
  }

  async getById(id: number): Promise<User | null> {

    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id));

    if(!user) {
      return  null;
    }

    return {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      age: user[0].age
    };
  }

  async create(user: UserInsert): Promise<number> {
    const result = await db
      .insert(usersTable)
      .values(user)
      .returning({ insertedId: usersTable.id });

    return result[0].insertedId;
  }
}