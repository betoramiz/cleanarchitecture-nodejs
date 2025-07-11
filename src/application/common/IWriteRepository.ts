import { PgTable } from "drizzle-orm/pg-core";
import { Result } from "ts-results";
import { ErrorMessage } from "@shared/Responses";

export interface IWriteRepository<T extends PgTable, U> {
  create(values: U): Promise<Result<number, ErrorMessage>>;

  update(id: number, data: T): Promise<Result<number, ErrorMessage>>;

  delete(id: number): Promise<Result<boolean, ErrorMessage>>;
}