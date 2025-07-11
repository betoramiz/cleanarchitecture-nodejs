import { Request, Response } from 'express';
import {
  CreateUseCase,
  Request as CreateRequest,
} from "@application/users/usecases/create";
import { Request as GetByIdRequest } from '@application/users/usecases/getById';
import { ListUseCase } from "@application/users/usecases/list";
import { GetByIdUseCase } from "@application/users/usecases/getById";
import { UpdateNameUseCase, Request as UpdateRequest } from "@application/users/usecases/updateName";

export function UserController(
  { createUseCase, listUseCase, getByIdUseCase, updateNameUseCase }
  : {
    createUseCase: CreateUseCase,
    listUseCase: ListUseCase,
    getByIdUseCase: GetByIdUseCase,
    updateNameUseCase: UpdateNameUseCase,
  }) {

  const create = async (request: Request<any, any, CreateRequest>, response: Response) => {
    const { name, age, email } = request.body;
    const { code, data } = await createUseCase.execute({ name, age, email });
    response.status(code).json(data);
  }

  const list = async (request: Request, response: Response) => {
    const { code, data } = await listUseCase.execute();
    response.status(code).json(data);
  }

  const getById = async (request: Request<GetByIdRequest>, response: Response) => {
    const { id } = request.params;
    const { code, data } = await getByIdUseCase.execute(id);
    response.status(code).json(data);
  }

  const updateName = async (request: Request, response: Response) => {
    const { id } = request.params;
    const req: UpdateRequest = { id: Number(id), data: request.body };
    const { code, data } = await updateNameUseCase.execute(req);
    response.status(code).json(data);
  }


  return {
    create,
    list,
    getById,
    updateName
  }
}