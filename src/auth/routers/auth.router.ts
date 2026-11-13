import { Router } from 'express';
import { loginUserHandler } from './handlers/login-user.handler';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { AUTH_ROUTES } from '../constants/auth.paths';
import {
  codeValidation,
  emailValidation,
  loginInputValidation,
} from '../validation/auth.input.validation-middlewares';
import { getMeHandler } from './handlers/get-me.handler';
import { accessTokenGuardMiddleware } from '../middlewares/access-token.guard.middleware';
import { registrationUserHandler } from './handlers/registration-user.handler';
import { userInputValidation } from '../../core/middlewares/validation/user-registration.validation.middlewares';
import { registrationConfirmationHandler } from './handlers/registration-confirmation.handler';
import { registrationEmailResendingHandler } from './handlers/registration-email-resending.handler';

export const authRouter = Router({});

authRouter
  .post(
    AUTH_ROUTES.LOGIN,
    loginInputValidation,
    inputValidationResultMiddleware,
    loginUserHandler,
  )
  .get(AUTH_ROUTES.ME, accessTokenGuardMiddleware, getMeHandler)

  .post(
    AUTH_ROUTES.REGISTRATION,
    userInputValidation,
    inputValidationResultMiddleware,
    registrationUserHandler,
  )

  .post(
    AUTH_ROUTES.REGISTRATION_CONFIRMATION,
    codeValidation,
    inputValidationResultMiddleware,
    registrationConfirmationHandler,
  )

  .post(
    AUTH_ROUTES.REGISTRATION_EMAIL_RESENDING,
    emailValidation,
    inputValidationResultMiddleware,
    registrationEmailResendingHandler,
  );
