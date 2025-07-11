import { PgTable } from "drizzle-orm/pg-core";
import { InferInsertModel, sql } from "drizzle-orm";
import { IWriteRepository } from "@application/common/IWriteRepository";
import { Err, Ok, Result } from "ts-results";
import { DatabaseResponse, ErrorMessage } from "@shared/Responses";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

export class WriteRepository<T extends PgTable, U extends InferInsertModel<T>> implements IWriteRepository<T, U> {

  private table:T;
  protected readonly database: NodePgDatabase
  constructor(database: NodePgDatabase, table: T) {
    this.table = table;
    this.database = database;
  }

  async update(id: number, data: T): Promise<Result<number, ErrorMessage>> {
    try {
      const result = await this.database
        .update(this.table)
        .set(data)
        .where(sql`id = ${id}`);

      return Ok(result.oid);

    } catch (error: any) {
      return Err(DatabaseResponse.Error(error.cause.detail));
    }
  }

  async create(values: U): Promise<Result<number, ErrorMessage>> {
    try {
      const result = await this.database.insert(this.table).values(values);
      return Ok(result.oid);
    } catch (error: any) {
      return Err(DatabaseResponse.Error(error.cause.detail));
    }
  }

  async delete(id: number): Promise<Result<boolean, ErrorMessage>> {
    try {
      await this.database.delete(this.table).where(sql`id = ${id}`);
      return Ok(true);
    } catch (error: any) {
      return Err(DatabaseResponse.Error(error.cause.detail));
    }
  }

}