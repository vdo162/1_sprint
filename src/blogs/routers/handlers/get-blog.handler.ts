import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';
import { NotFoundException } from '../../../core/exceptions/not-found.exception';

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const blog = await blogsQueryRepository.findById(id);

    if (!blog) {
      throw new NotFoundException('Blog not exist');
    }

    res.status(HttpStatus.Ok).send(blog);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
