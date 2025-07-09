import { Router } from "express";
import { validateData } from "../../infrastructure/middlewares/DataValidator";
import { validationRequest as createValidationRequest } from '../../application/users/usecases/create';
import { userController } from '../../infrastructure/dependencies';

const router = Router();

router
  .get('/', userController.list)
  .post('/', validateData(createValidationRequest), userController.create);

export default router;