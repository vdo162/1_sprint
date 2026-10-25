import { RequestHandler, Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { postInputDtoValidation } from '../validation/post.input-dto.validation-middlewares';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { POSTS_ROUTES } from '../constants/posts.paths';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { sanitizeQueryParams } from '../../core/middlewares/validation/sanitize-query.middleware';
import { PostSortField } from './input/post-sort-field';

export const postsRouter = Router({});

postsRouter
  .get(
    POSTS_ROUTES.ROOT,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getPostListHandler as unknown as RequestHandler,
  )

  .get(
    POSTS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getPostHandler,
  )

  .post(
    POSTS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )

  .put(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    postInputDtoValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  );
