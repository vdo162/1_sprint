import { RequestHandler, Router } from 'express';
import { getUserListHandler } from './handlers/get-user-list.handler';
import { createUserHandler } from './handlers/create-user.handler';
import { deleteUserHandler } from './handlers/delete-user.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { UserSortField } from './input/user-sort-field';
import { sanitizeQueryParams } from '../../core/middlewares/validation/sanitize-query.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { USERS_ROUTES } from '../constants/users.paths';
import { userInputValidation } from '../validation/user.input.validation-middlewares';

export const usersRouter = Router({});

usersRouter
  .get(
    USERS_ROUTES.ROOT,
    paginationAndSortingValidation(UserSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getUserListHandler as unknown as RequestHandler,
  )

  .post(
    USERS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    userInputValidation,
    inputValidationResultMiddleware,
    createUserHandler,
  )

  .delete(
    USERS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteUserHandler,
  );
