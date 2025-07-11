import { UseCase } from "@shared/UseCase";
import { ApiResponse, UseCaseResponse } from "@shared/Responses";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { usersTable } from "@domain/users/users.schema";
import { eq } from "drizzle-orm";
import { z } from "zod/v4";


export const updateValidationSchema = z.object({
  name: z.string().max(100).nonempty(),
});

export interface Request {
  id: number;
  data: UpdateData;
}

export interface UpdateData {
  name: string;
}

export interface Response {
  updatedId: number
}

export class UpdateNameUseCase implements UseCase<Request, Response> {

    constructor(
      private readonly db: NodePgDatabase) {
    }

  async execute(request: Request): Promise<ApiResponse<Response>> {
        const [userFound] = await this.db
          .select()
          .from(usersTable)
          .where(eq(usersTable.id, request.id));

        if(!userFound) {
          return UseCaseResponse.NotFound(`User with Id ${request.id} was not found`);
        }

        try {
          await this.db
            .update(usersTable)
            .set({ name: request.data.name })
            .where(eq(usersTable.id, request.id));

          return UseCaseResponse.Success({ updatedId: userFound.id });
        } catch (error: any){
          return UseCaseResponse.Failure('');
        }
    }
}