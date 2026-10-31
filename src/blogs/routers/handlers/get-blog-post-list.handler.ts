import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { PostQueryParams } from '../../../posts/routers/input/post-query-params';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsQueryRepository } from '../../../posts/repositories/posts.query.repository';
import { NotFoundException } from '../../../core/exceptions/not-found.exception';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';
import { mapPostsQueryParams } from '../../../posts/routers/mappers/map-posts-query-params.util';

export async function getBlogPostListHandler(
  req: Request<{ id: string }, {}, {}, PostQueryParams>,
  res: Response,
) {
  try {
    const blogId = req.params.id;
    const queryParams = req.query;

    const blog = await blogsQueryRepository.findById(blogId);

    if (!blog) {
      throw new NotFoundException('Blog not exist');
    }

    const posts = await postsQueryRepository.findMany(
      mapPostsQueryParams(queryParams),
      blogId,
    );

    res.status(HttpStatus.Ok).send(posts);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
