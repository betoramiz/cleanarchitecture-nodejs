import { CreateUseCase } from "../application/users/usecases/create";
import { ListUseCase } from "../application/users/usecases/list";
import UserController from "../presentation/users/controller";
import { UserRepository } from "./repositories/UserRepository";

const userRepository = new UserRepository()
const createUseCase = new CreateUseCase(userRepository);
const listUseCase = new ListUseCase(userRepository);

const userController = UserController({ createUseCase, listUseCase });

export {
  userController
};