// import { IUserRepository } from "../users/IUserRepository";
// import { INTERFACE_TYPES } from "../users/types/Interfaces";
// import { UserInsert, UserRepository } from "../database/Repositories/UserRepository";
// import CreateUseCase from "../users/usecases/create/create";
// import { UseCase } from "./UseCase";
// import { User } from "../users/models";
// import GetAllUseCase from "../users/usecases/getAll/getAll";
// import { Container } from "inversify";
// import GetByIdUseCase from "../users/usecases/getById/getById";
//
// const container = new Container();
// container.bind<IUserRepository>(INTERFACE_TYPES.IUserRepository).to(UserRepository);
//
// container.bind<UseCase<number, User>>(INTERFACE_TYPES.GetByIdUseCase).to(GetByIdUseCase);
// container.bind<UseCase<UserInsert, number>>(INTERFACE_TYPES.CreateUseCase).to(CreateUseCase);
// container.bind<UseCase<any, User[]>>(INTERFACE_TYPES.GetAllUseCase).to(GetAllUseCase);
//
// const getByNameUseCase = container.get<GetByIdUseCase>(INTERFACE_TYPES.GetByIdUseCase);
// const createUseCase = container.get<CreateUseCase>(INTERFACE_TYPES.CreateUseCase);
// const getAllUseCase = container.get<GetAllUseCase>(INTERFACE_TYPES.GetAllUseCase);
//
// export {
//   getByNameUseCase,
//   createUseCase,
//   getAllUseCase
// }