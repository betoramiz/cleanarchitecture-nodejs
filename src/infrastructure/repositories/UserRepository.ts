import { db } from "../dbConfig";
import { eq } from "drizzle-orm";
import { Err, Ok, Result } from "ts-results";
import { usersTable } from "@domain/users/users.schema";
import { UserInsert, IUser, mapper } from "@domain/users/user";
import { IUserRepository } from "@application/users/repository";
import { DatabaseResponse, ErrorMessage } from "@shared/Responses";
import { WriteRepository } from "@repositories/WriteRepository";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class UserRepository extends WriteRepository<typeof usersTable, UserInsert> implements IUserRepository {

  constructor(database: NodePgDatabase, table: typeof usersTable) {
    super(database, table);
  }

  async getById(id: number): Promise<Result<IUser | null, ErrorMessage>> {
    try {
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, id));

      if (!user) {
        return Ok(user);
      }

      const entity = mapper.toDomain(user);
      return Ok(entity);

    } catch (error: any) {
      return Err(DatabaseResponse.Error(error.cause.detail));
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

    } catch (error: any) {
      return Err(DatabaseResponse.Error(error.cause.detail));
    }
  }
}