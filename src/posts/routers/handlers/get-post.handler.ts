import { Request, Response } from 'express';
import { errorsHandler } from '../../../core/exceptions/errors.handler';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { NotFoundException } from '../../../core/exceptions/not-found.exception';

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postsQueryRepository.findById(id);

    if (!post) {
      throw new NotFoundException('Post not exist');
    }

    res.status(HttpStatus.Ok).send(post);
  } catch (e: unknown) {
    errorsHandler(e, res);
  }
}
