import { Router } from "express";
import { UsersController } from './controller'
import { validateData } from '../middlewares/DataValidator'
import userRequestSchema from './usecases/create/userRequest'
import { getAllUseCase, getByNameUseCase, createUseCase } from '../common/container';

const usersController = UsersController({
  getByIdUseCase: getByNameUseCase,
  createUseCase,
  getAllUseCase
});

const router= Router();

router
  .get('/', usersController.getUsers)
  .get('/:id', usersController.getByName)
  .post('/',  validateData(userRequestSchema), usersController.createOne);

export default router;