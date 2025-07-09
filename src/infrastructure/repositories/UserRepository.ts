import { IUserRepository } from "../../application/users/repository";
import { InputUser, IUser } from "../../domain/users/user";
import { db } from '../dbConfig';
import { usersTable } from "../../domain/users/users.schema";
import { eq } from "drizzle-orm";
import { Err, Ok, Result } from "ts-results";
import { ErrorMessage } from "../../shared/response";

export class UserRepository implements IUserRepository {
  private errorMessage: ErrorMessage = { name: 'Database Error', description: 'Something failure in the database'};
  async getById(id: number): Promise<Result<IUser|null, ErrorMessage>> {
    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

      if(!user) {
        return  Ok(null);
      }

      return Ok({
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age
      });

    } catch (error) {
      return Err(this.errorMessage);
    }
  }

  async getAll(): Promise<Result<IUser[], ErrorMessage>> {
    try {
      const users = await db.select().from(usersTable);
      const result = users.map(user => ({
        name: user.name,
        email: user.email,
        age: user.age,
        id: user.id
      }));

      return Ok(result);

    } catch (error) {
      return Err(this.errorMessage);
    }
  }

  async create(user: InputUser): Promise<Result<number, ErrorMessage>> {
    try {
      const result = await db
        .insert(usersTable)
        .values(user);

      return Ok(result.oid);
    } catch (error) {
      return Err(this.errorMessage);
    }
  }

}