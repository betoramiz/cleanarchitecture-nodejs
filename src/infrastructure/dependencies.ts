import { CreateUseCase } from "@application/users/usecases/create";
import { GetByIdUseCase } from "@application/users/usecases/getById";
import { ListUseCase } from "@application/users/usecases/list";
import { UserController } from "@presentation/users/controller";
import { UserRepository } from "@repositories/UserRepository";
import { usersTable } from "@domain/users/users.schema";
import { db } from "@infra/dbConfig";
import { UpdateNameUseCase } from "@application/users/usecases/updateName";

const userRepository = new UserRepository(db, usersTable);
const createUseCase = new CreateUseCase(userRepository);
const listUseCase = new ListUseCase(userRepository);
const getByIdUseCase = new GetByIdUseCase(userRepository);
const updateNameUseCase = new UpdateNameUseCase(db);

const userController = UserController({ createUseCase, listUseCase, getByIdUseCase, updateNameUseCase });

export {
  userController
};