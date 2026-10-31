import { Request, Response } from 'express';
import { BlogQueryParams } from '../input/blog-query-params';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';

export async function getBlogListHandler(
  req: Request<{}, {}, {}, BlogQueryParams>,
  res: Response,
) {
  try {
    const queryParams = req.query;

    const blogs = await blogsQueryRepository.findMany(queryParams);

    res.status(HttpStatus.Ok).send(blogs);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
