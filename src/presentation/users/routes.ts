import { Router } from "express";
import { validateData } from "@middlewares/DataValidator";
import { validationRequest as createValidationRequest } from '@application/users/usecases/create';
import { userController } from "@infra/dependencies";
import { updateValidationSchema } from "@application/users/usecases/updateName";

const router = Router();

router
  .get('/', userController.list)
  .get('/:id', userController.getById)
  .post('/', validateData(createValidationRequest), userController.create)
  .put('/:id', validateData(updateValidationSchema), userController.updateName);

export default router;