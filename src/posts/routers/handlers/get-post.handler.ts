import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { postsQueryRepository } from '../../repositories/posts.query.repository';
import { notFoundResult } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function getPostHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const post = await postsQueryRepository.findById(id);

    if (!post) {
      sendErrorResult(notFoundResult('Post not exist'), res);
      return;
    }

    res.status(HttpStatus.Ok).send(post);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
