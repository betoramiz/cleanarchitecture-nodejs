import { Request, Response } from 'express';
import { CreateUseCase, Request as CreateRequest, Response as CreateResponse } from '../../application/users/usecases/create';
import { handleResult, successResult } from "../../shared/handleResult";
import { ListUseCase } from "../../application/users/usecases/list";

export default function UserController(
  {createUseCase, listUseCase}
  : {
    createUseCase: CreateUseCase,
    listUseCase: ListUseCase,
  }) {

  const create = async (request: Request<any, any, CreateRequest>, response: Response) => {
    const { name, age, email } = request.body;
    const result = await createUseCase.execute({ name, age, email });

    handleResult<CreateResponse>(result, response);
  }

  const list = async (request: Request<any, any>, response: Response) => {
    const result = listUseCase.execute();
    successResult(result, response);
  }


  return{
    create,
    list
  }
}