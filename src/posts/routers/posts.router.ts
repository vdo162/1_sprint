import { RequestHandler, Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { createPostHandler } from './handlers/create-post.handler';
import { getPostListHandler } from './handlers/get-post-list.handler';
import { getPostHandler } from './handlers/get-post.handler';
import { POSTS_ROUTES } from '../constants/posts.paths';
import { updatePostHandler } from './handlers/update-post.handler';
import { deletePostHandler } from './handlers/delete-post.handler';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { sanitizeQueryParams } from '../../core/middlewares/validation/sanitize-query.middleware';
import { PostSortField } from './input/post-sort-field';
import { postInputValidation } from '../validation/post.input.validation-middlewares';
import { CommentSortField } from '../../comments/routers/input/comment-sort-field';
import { getPostCommentListHandler } from './handlers/get-post-comment-list.handler';
import { accessTokenGuardMiddleware } from '../../auth/middlewares/access-token.guard.middleware';
import { commentInputValidation } from '../../comments/validation/comment.input.validation-middlewares';
import { createPostCommentHandler } from './handlers/create-post-comment.handler';

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
    postInputValidation,
    inputValidationResultMiddleware,
    createPostHandler,
  )

  .put(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    postInputValidation,
    inputValidationResultMiddleware,
    updatePostHandler,
  )

  .delete(
    POSTS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler,
  )

  .get(
    POSTS_ROUTES.POST_COMMENTS,
    idValidation,
    paginationAndSortingValidation(CommentSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getPostCommentListHandler as unknown as RequestHandler,
  )

  .post(
    POSTS_ROUTES.POST_COMMENTS,
    accessTokenGuardMiddleware,
    commentInputValidation,
    inputValidationResultMiddleware,
    createPostCommentHandler,
  );
