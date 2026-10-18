import { Router } from 'express';
import { getBloggerListHandler } from './handlers/get-blogger-list.handler';
import { getBloggerHandler } from './handlers/get-blogger.handler';
import { createBloggerHandler } from './handlers/create-blogger.handler';
import { updateBloggerHandler } from './handlers/update-blogger.handler';
import { deleteBloggerHandler } from './handlers/delete-blogger.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { bloggerInputDtoValidation } from '../validation/blogger.input-dto.validation-middlewares';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { BLOGGERS_ROUTES } from '../constants/bloggers.paths';

export const bloggersRouter = Router({});

bloggersRouter
  .get(BLOGGERS_ROUTES.ROOT, getBloggerListHandler)

  .get(
    BLOGGERS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getBloggerHandler,
  )

  .post(
    BLOGGERS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    bloggerInputDtoValidation,
    inputValidationResultMiddleware,
    createBloggerHandler,
  )

  .put(
    BLOGGERS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    bloggerInputDtoValidation,
    inputValidationResultMiddleware,
    updateBloggerHandler,
  )

  .delete(
    BLOGGERS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBloggerHandler,
  );
