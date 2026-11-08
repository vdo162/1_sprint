import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { commentsQueryRepository } from '../../repositories/comments.query.repository';
import { notFoundResult } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function getCommentHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const id = req.params.id;

    const comment = await commentsQueryRepository.findById(id);

    if (!comment) {
      sendErrorResult(notFoundResult('Comment not exist'), res);
      return;
    }

    res.status(HttpStatus.Ok).send(comment);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
