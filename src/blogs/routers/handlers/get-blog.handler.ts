import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { blogsQueryRepository } from '../../repositories/blogs.query.repository';
import { sendErrorResult } from '../../../core/result/send-error-result';
import { notFoundResult } from '../../../core/result/result';

export async function getBlogHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const blog = await blogsQueryRepository.findById(id);

    if (!blog) {
      sendErrorResult(notFoundResult('Blog not exist'), res);
      return;
    }

    res.status(HttpStatus.Ok).send(blog);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
