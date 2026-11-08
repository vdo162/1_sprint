import { RequestHandler, Router } from 'express';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { getCommentHandler } from './handlers/get-comment.handler';
import { COMMENTS_ROUTES } from '../constants/comments.paths';
import { updateCommentHandler } from './handlers/update-comment.handler';
import { deleteCommentHandler } from './handlers/delete-comment.handler';
import { commentInputValidation } from '../validation/comment.input.validation-middlewares';
import { accessTokenGuardMiddleware } from '../../auth/middlewares/access-token.guard.middleware';

export const commentsRouter = Router({});

commentsRouter
  .get(
    COMMENTS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getCommentHandler,
  )

  .put(
    COMMENTS_ROUTES.BY_ID,
    accessTokenGuardMiddleware,
    idValidation,
    commentInputValidation,
    inputValidationResultMiddleware,
    updateCommentHandler,
  )

  .delete(
    COMMENTS_ROUTES.BY_ID,
    accessTokenGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteCommentHandler,
  );
