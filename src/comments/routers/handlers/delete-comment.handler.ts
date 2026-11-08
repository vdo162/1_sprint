import { Request, Response } from 'express';
import { HttpStatus } from '../../../core/types/http-statuses';
import { commentsService } from '../../application/comments.service';
import { ResultStatus } from '../../../core/result/result';
import { sendErrorResult } from '../../../core/result/send-error-result';

export async function deleteCommentHandler(
  req: Request<{ id: string }>,
  res: Response,
) {
  try {
    const userId = req.userId as string;
    const id = req.params.id;

    const result = await commentsService.delete(id, userId);

    if (result.status !== ResultStatus.Success) {
      sendErrorResult(result, res);
      return;
    }

    res.sendStatus(HttpStatus.NoContent);
  } catch (e: unknown) {
    res.sendStatus(HttpStatus.InternalServerError);
    console.error(e);
  }
}
