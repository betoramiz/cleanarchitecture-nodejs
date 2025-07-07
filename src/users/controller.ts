import { Request, Response } from "express";
import { GetById } from "./types/queryPamars";
import { User, Users } from "./models";
import { handleResult, successResult } from "../common/handleResult";

import CreateUseCase from "./usecases/create/create";
import GetAllUseCase from './usecases/getAll/getAll'
import GetByIdUseCase from "./usecases/getById/getById";

export function UsersController(
  {
    getByIdUseCase,
    createUseCase,
    getAllUseCase
  }:
  {
    getByIdUseCase: GetByIdUseCase,
    createUseCase: CreateUseCase,
    getAllUseCase: GetAllUseCase,
  }) {

  const getUsers = async (request: Request, response: Response): Promise<void> => {
    const users = await getAllUseCase.execute();
    successResult<User[]>(users.val, response);
  };

  const createOne = async (request: Request, response: Response): Promise<void> =>  {
    const {name, email, age} = request.body;
    const newUser = Users.create(name, email, age);

    const result = await createUseCase.execute(newUser);

    handleResult<number>(result, response);
  }

  const getByName = async (request: Request<GetById>, response: Response): Promise<void> => {
    const { id } = request.params;
    const result = await getByIdUseCase.execute(id);

    handleResult(result, response);
  };

  return {
    getUsers,
    getByName,
    createOne
  }
}