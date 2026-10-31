import { Router } from 'express';

import { loginUserHandler } from './handlers/login-user.handler';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { AUTH_ROUTES } from '../constants/auth.paths';
import { authInputValidation } from '../validation/auth.input.validation-middlewares';

export const authRouter = Router({});

authRouter.post(
  AUTH_ROUTES.LOGIN,
  authInputValidation,
  inputValidationResultMiddleware,
  loginUserHandler,
);
