import { RequestHandler, Router } from 'express';
import { getBlogListHandler } from './handlers/get-blog-list.handler';
import { getBlogHandler } from './handlers/get-blog.handler';
import { createBlogHandler } from './handlers/create-blog.handler';
import { updateBlogHandler } from './handlers/update-blog.handler';
import { deleteBlogHandler } from './handlers/delete-blog.handler';
import { idValidation } from '../../core/middlewares/validation/params-id.validation.middleware';
import { inputValidationResultMiddleware } from '../../core/middlewares/validation/input-validation-result.middleware';
import { superAdminGuardMiddleware } from '../../auth/middlewares/super-admin.guard.middleware';
import { BLOGS_ROUTES } from '../constants/blogs.paths';
import { paginationAndSortingValidation } from '../../core/middlewares/validation/query-pagination-sorting.validation.middleware';
import { BlogSortField } from './input/blog-sort-field';
import { sanitizeQueryParams } from '../../core/middlewares/validation/sanitize-query.middleware';
import { PostSortField } from '../../posts/routers/input/post-sort-field';
import { getBlogPostListHandler } from './handlers/get-blog-post-list.handler';
import { createBlogPostHandler } from './handlers/create-blog-post.handler';
import { blogInputValidation } from '../validation/blog.input.validation-middlewares';
import { blogPostInputValidation } from '../../posts/validation/post.input.validation-middlewares';

export const blogsRouter = Router({});

blogsRouter
  .get(
    BLOGS_ROUTES.ROOT,
    paginationAndSortingValidation(BlogSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getBlogListHandler as unknown as RequestHandler,
  )

  .get(
    BLOGS_ROUTES.BY_ID,
    idValidation,
    inputValidationResultMiddleware,
    getBlogHandler,
  )

  .post(
    BLOGS_ROUTES.ROOT,
    superAdminGuardMiddleware,
    blogInputValidation,
    inputValidationResultMiddleware,
    createBlogHandler,
  )

  .put(
    BLOGS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    blogInputValidation,
    inputValidationResultMiddleware,
    updateBlogHandler,
  )

  .delete(
    BLOGS_ROUTES.BY_ID,
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deleteBlogHandler,
  )

  .get(
    BLOGS_ROUTES.BLOG_POSTS,
    idValidation,
    paginationAndSortingValidation(PostSortField),
    inputValidationResultMiddleware,
    sanitizeQueryParams,
    getBlogPostListHandler as unknown as RequestHandler,
  )

  .post(
    BLOGS_ROUTES.BLOG_POSTS,
    superAdminGuardMiddleware,
    blogPostInputValidation,
    inputValidationResultMiddleware,
    createBlogPostHandler,
  );
