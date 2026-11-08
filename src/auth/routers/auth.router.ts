import { Router } from 'express';

import { loginUserHandler } from './handlers/login-user.handler';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { AUTH_ROUTES } from '../constants/auth.paths';
import { authInputValidation } from '../validation/auth.input.validation-middlewares';
import { getMeHandler } from './handlers/get-me.handler';
import { accessTokenGuardMiddleware } from '../middlewares/access-token.guard.middleware';

export const authRouter = Router({});

authRouter
  .post(
    AUTH_ROUTES.LOGIN,
    authInputValidation,
    inputValidationResultMiddleware,
    loginUserHandler,
  )
  .get(AUTH_ROUTES.ME, accessTokenGuardMiddleware, getMeHandler);
