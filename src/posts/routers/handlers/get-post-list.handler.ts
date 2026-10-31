import { Request, Response } from 'express';
import { PostQueryParams } from '../input/post-query-params';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { mapPostsQueryParams } from '../mappers/map-posts-query-params.util';

export async function getPostListHandler(
  req: Request<{}, {}, {}, PostQueryParams>,
  res: Response,
) {
  try {
    const queryParams = req.query;

    const posts = await postsQueryRepository.findMany(
      mapPostsQueryParams(queryParams),
    );

    res.status(HttpStatus.Ok).send(posts);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
