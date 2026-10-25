import { RequestHandler, Router } from 'express';
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
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { BloggerSortField } from './input/blogger-sort-field';
import { sanitizeQueryParams } from '../../core/middlewares/validation/sanitize-query.middleware';
import { PostSortField } from '../../posts/routers/input/post-sort-field';
import { getBloggerPostListHandler } from './handlers/get-blogger-post-list.handler';
import { bloggerPostInputDtoValidation } from '../../posts/validation/post.input-dto.validation-middlewares';
import { createBloggerPostHandler } from './handlers/create-blogger-post.handler';

export const bloggersRouter = Router({});

bloggersRouter
  .get(
    BLOGGERS_ROUTES.ROOT,
    paginationAndSortingValidation(BloggerSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getBloggerListHandler as unknown as RequestHandler,
  )

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
  )

  .get(
    BLOGGERS_ROUTES.BLOGGER_POSTS,
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getBloggerPostListHandler as unknown as RequestHandler,
  )

  .post(
    BLOGGERS_ROUTES.BLOGGER_POSTS,
    superAdminGuardMiddleware,
    bloggerPostInputDtoValidation,
    inputValidationResultMiddleware,
    createBloggerPostHandler,
  );
