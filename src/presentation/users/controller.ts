import { Request, Response } from 'express';
import {
  CreateUseCase,
  Request as CreateRequest,
  Response as CreateResponse
} from "@application/users/usecases/create";
import { Request as GetByIdRequest } from '@application/users/usecases/getById';
import { handleResult, successResult } from "@shared/handleResult";
import { ListUseCase } from "@application/users/usecases/list";
import { GetByIdUseCase } from "@application/users/usecases/getById";

export function UserController(
  { createUseCase, listUseCase, getByIdUseCase }
  : {
    createUseCase: CreateUseCase,
    listUseCase: ListUseCase,
    getByIdUseCase: GetByIdUseCase
  }) {

  const create = async (request: Request<any, any, CreateRequest>, response: Response) => {
    const { name, age, email } = request.body;
    const result = await createUseCase.execute({ name, age, email });

    handleResult<CreateResponse>(result, response);
  }

  const list = async (request: Request, response: Response) => {
    const result = await listUseCase.execute();
    successResult(result, response);
  }

  const getById = async (request: Request<GetByIdRequest>, response: Response) => {
    const { id } = request.params;
    const result = await getByIdUseCase.execute(id);

    handleResult(result, response);
  }


  return {
    create,
    list,
    getById
  }
}