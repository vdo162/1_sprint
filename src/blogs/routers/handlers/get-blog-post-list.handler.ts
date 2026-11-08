import { Request, Response } from 'express';
import { PostQueryParams } from '../../../posts/routers/input/post-query-params';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsQueryRepository } from '../../../posts/repositories/posts.query.repository';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';
import { mapPostsQueryParams } from '../../../posts/routers/mappers/map-posts-query-params.util';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { notFoundResult } from '../../../core/result/result';

export async function getBlogPostListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryParams>,
  res: Response,
) {
  try {
    const blogId = req.params.id;
    const queryParams = req.query;

    const blog = await blogsQueryRepository.findById(blogId);

    if (!blog) {
      sendErrorResult(notFoundResult('Blog not exist'), res);
      return;
    }

    const posts = await postsQueryRepository.findMany(
      mapPostsQueryParams(queryParams),
      blogId,
    );

    res.status(HttpStatus.Ok).send(posts);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
